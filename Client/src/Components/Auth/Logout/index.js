import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Store/Slices/Auth';

const Logout = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        window.localStorage.removeItem('tokenId');
        dispatch(logout());
    }
    return (
        <button onClick = {handleLogout}>
            Log out
        </button>
    )
}
export default Logout;
