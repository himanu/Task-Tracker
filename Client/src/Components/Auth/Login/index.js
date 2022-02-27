import {GoogleLogin} from 'react-google-login';
import { useDispatch } from 'react-redux';
import {validateTokenId} from '../../../Store/Slices/Auth';
import { useSearchParams, useNavigate } from 'react-router-dom';
import WelcomeImg from '../../../images/Welcome.jpg';
import { useState } from 'react';
import { red } from '@mui/material/colors';

const Login = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    
    const handleSuccess = async(authObj) => {
        const {tokenId} = authObj;
        return dispatch(validateTokenId(tokenId)).then((res)=>{
            if(res.error) {
                console.log('res ', res);
                throw new Error(res.payload)
            }
            console.log('token id validation successful ', res);
            navigate(searchParams.get('onSuccess'));
        }).catch((err) => {
            setError(err.message);
        });
    }
    return (
        <div style={{margin: 'auto', background: '#fff', padding: '1rem', borderRadius: '0.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '80vh', border: '1px solid #ccc'}}>
            <img src={WelcomeImg} style={{height: '80px', width: '80px', borderRadius: '50%'}} alt="Website icon"/>
            <h3>Welcome to the Todoist</h3>
            <p>Choose one of the below method to join</p>
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