import {GoogleLogin} from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import {signIn} from '../../../Store/Slices/Auth';
import WelcomeImg from '../../../images/Welcome.jpg';
import { useState } from 'react';
import { red } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const handleSuccess = async(authObj) => {
        const {tokenId} = authObj;
        return dispatch(signIn(tokenId)).then((res)=>{
            if(res.error) {
                console.log('res ', res);
                throw new Error(res.payload)
            }
            console.log('token id validation successful ', res);
            const onSuccess = (new URLSearchParams(window.location.search)).get('onSuccess');
            if(onSuccess) {
                navigate(onSuccess);
            }
        }).catch((err) => {
            setError(err.message);
        });
    }
    return (
        <div style={{margin: 'auto', background: '#fff', padding: '1rem', borderRadius: '0.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '80vh', border: '1px solid #ccc'}}>
            <img src={WelcomeImg} style={{height: '80px', width: '80px', borderRadius: '50%'}} alt="Website icon"/>
            <h3>Welcome to the Todoist</h3>
            <p>Please sign in to continue</p>
            <div style={{position: 'absolute', top: '50%'}}>
                <GoogleLogin 
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    onSuccess={handleSuccess}
                    onFailure={(obj)=> console.log("Failure ", obj)}
                />
            </div>
            <div style={{color: red[400]}}>
                {error}
            </div>
        </div>
    )
}
export default Login;