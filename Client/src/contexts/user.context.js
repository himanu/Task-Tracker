import { createContext, useEffect, useState } from "react";
import api from "../api";


/** variables */
const jwtTokenString = "jwtToken";
const defaultUserState = "";

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(defaultUserState);

    /** get user info using jwt token stored in local storage */
    const loadUser = async () => {
        try {
            const jwtToken = localStorage.getItem(jwtTokenString);
            if (!jwtToken)
                return;

            const { data } = await api.loadUser(jwtToken);
            setUser(data?.user);
        } catch(err) {
            console.error("Error while loading user ", err);
        }
    };

    /** sign in user using access token recieved from google oauth api */
    const signInUser = async (accessToken) => {
        try {
            const { data } = await api.signIn(accessToken);
            /** store jwt token in local storage */
            if (data?.token)
                localStorage.setItem(jwtTokenString, data?.token)
            setUser(data?.user);
        } catch (err) {
            console.error("Error while signing in user ", err);
            throw err.message
        }
    }

    /** logout user */
    const logoutUser = () => {
        localStorage.removeItem(jwtTokenString);
        setUser(defaultUserState);
    }

    useEffect(() => {
        /** load user after the first render */
        loadUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                loadUser,
                signInUser,
                logoutUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider;