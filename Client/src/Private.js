import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useEffect } from "react";
import { signIn } from "./Store/Slices/Auth";
import Login from "./Components/Auth/Login";
import { CircularProgress } from "@mui/material";
const Private = ({ children }) => {
    const dispatch = useDispatch();
    const {tokenId, status, isAuthed} =  useSelector((state)=> state.auth, shallowEqual);
    
    useEffect(() => {
        if(tokenId) {
            dispatch(signIn(tokenId));
        }
    },[]);
    if(isAuthed) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center'}}>
                {children}
            </div>
        )
    } else if(status === 'failed' || (status === 'idle' && !tokenId)){
        return (
            <Login />
        )
    } else if(status === 'loading' || (status === 'idle' && tokenId)) {
        return (
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                <CircularProgress />
            </div>
        )
    }
}
export default Private;