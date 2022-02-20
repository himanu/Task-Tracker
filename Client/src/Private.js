import { useSelector } from "react-redux";
import { getAuthState } from "./Store/Selectors/Auth";
import { Navigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
const Private = ({ children }) => {
    const currentPath = window.location.pathname;
    const {isAuthed, status} = useSelector(getAuthState);
    
    console.log("tokenId ", status);
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
    } else {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress style={{width: '20%', height: '20%', color: 'rgba(61,61,61,0.5)'}}/>
            </div>
        );
    }
}
export default Private;