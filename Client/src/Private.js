import { useContext } from "react";
import Login from "./Components/Auth/Login";
import { Outlet } from "react-router-dom";
import { UserContext } from "./contexts/user.context";

const Private = ({ children }) => {
    const { user } = useContext(UserContext);
    return user ? (
        <div style={{ display: 'flex', flex: '1' }}>
            {children}
            <Outlet />
        </div>
    ) : <Login />
}
export default Private;