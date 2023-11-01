import { useContext } from "react";
import Login from "./Components/Auth/Login";
import { UserContext } from "./contexts/user.context";

const Private = ({ children }) => {
    const { user } = useContext(UserContext);
    return user ? (
        <>
            {children}
        </>
    ) : <Login />
}
export default Private;