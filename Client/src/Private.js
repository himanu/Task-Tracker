import { useSelector } from "react-redux";
import { getAuthState } from "./Store/Selectors/Auth";
import { Navigate } from 'react-router-dom';
const Private = ({ children }) => {
    const currentPath = window.location.pathname;
    const {isAuthed} = useSelector(getAuthState);
    console.log("tokenId ", isAuthed);
    if(isAuthed) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {children}
            </div>
        )
    } else {
        return (
            <Navigate to={`/login?onSuccess=${currentPath}`}/>
        )
    }
}
export default Private;