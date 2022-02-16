import {GoogleLogin} from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import {validateTokenId} from '../../../Store/Slices/Auth';
import { useSearchParams, useNavigate } from 'react-router-dom';
import WelcomeImg from '../../../images/Welcome.jpg';
import { getAuthState } from "../../../Store/Selectors/Auth";

const Login = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentPath = window.location.pathname;
    const {isAuthed} = useSelector(getAuthState);

    if(isAuthed) {
        navigate(searchParams.get('onSuccess'));
    }
    
    // const {isAuthed} = useSelector(getAuthState);
    const handleSuccess = async(authObj) => {
        console.log('Hii');
        const {tokenId} = authObj;
        dispatch(validateTokenId(tokenId)).then((res)=>{
            console.log("res ",res);
            navigate(searchParams.get('onSuccess'));
        }).catch((err) => {
            console.log("Offo ", err);
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
        </div>
    )
}
export default Login;