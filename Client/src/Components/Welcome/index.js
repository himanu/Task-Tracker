import styles from './style.module.css';
import { useNavigate } from "react-router-dom";
import HomeImg from '../../images/Home.jpg';

const Welcome = () => {
    const navigate = useNavigate();
    return (
        <div style={{flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <img src={HomeImg} width='200px' height='200px' style={{borderRadius: '50%'}} alt="images" />
            <div style={{padding: '1rem 0rem'}}>
                <h1 style={{color: '#151b26', fontWeight: '400', marginBottom: '2rem', marginTop: 0, textAlign: 'center'}}>
                    Organize your project with Todoist
                </h1>
                <div style={{width: '50%', margin: 'auto', textAlign: 'center', fontSize: '1rem'}}>
                    Track and manage everything from day one to the completion with <strong>Todoist</strong>.
                </div>
            </div>
            <div className={styles.button} onClick={() => navigate('/dashboard/app')}>
                Get Started
            </div>
        </div>
    )
}
export default Welcome;