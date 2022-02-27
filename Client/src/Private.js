import { useSelector } from "react-redux";
import { getAuthState } from "./Store/Selectors/Auth";
import { Navigate } from 'react-router-dom';
const Private = ({ children }) => {
    const currentPath = window.location.pathname;
    const {isAuthed, status} = useSelector(getAuthState);
    
    if(isAuthed) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center'}}>
                {children}
            </div>
        )
    } else if(status === 'failed' || status === 'idle'){
        return (
            <Navigate to={`/login?onSuccess=${currentPath}`}/>
        )
    }
}
export default Private;