import styles from './style.module.css';
import { useNavigate } from "react-router-dom";
import HomeImg from '../../images/Home.jpg';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div style={{flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <img src={HomeImg} width={'200px'} height={'200px'} style={{borderRadius: '50%'}} alt="images" />
            <div className="mainContent" style={{padding: '1rem 0rem'}}>
                <h1 className="heading" style={{color: '#151b26', fontWeight: '400', marginBottom: '2rem', marginTop: 0, textAlign: 'center'}}>
                    Manage your day with one tool
                </h1>
                <div className="details" style={{width: '60%', margin: 'auto', textAlign: 'center', fontSize: '1rem'}}>
                    You don’t have to shuffle between spreadsheets, email, and other tools to keep your day on course. Track and manage everything—from day one to the deadline—with <strong>Todoist</strong>.
                </div>
            </div>
            <div className={styles.button} onClick={() => navigate('/todo')}>
                Get Started
            </div>
        </div>
    )
}
export default Home;