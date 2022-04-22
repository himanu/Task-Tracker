import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {signIn} from './Store/Slices/Auth';
import { Routes, Route} from 'react-router-dom';
import Welcome from './Components/Welcome';
import Login from './Components/Auth/Login';
import DashboardSidebar from './Components/Dashboard/Sidebar';
import Project from './Components/Dashboard/Project';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Private from './Private';
import DashboardApp from './Components/Dashboard/App';
function App() {
    const dispatch = useDispatch();
    useEffect(()=>{
        const tokenId = JSON.parse(window.localStorage.getItem('tokenId'));
        if(tokenId) {
            dispatch(signIn(tokenId));
        }
    },[]);

    return (
        <div className="rootComponent" style={{display: 'flex', background: '#f6f8f9',minHeight: '100vh', flexDirection: 'column'}}>
            
            <Navbar />
            <Routes>
                <Route 
                    path = '/login' 
                    element = {
                        // <Private>
                        <Login />
                        // </Private>
                    }  
                />
                    
                <Route path="/" element={<Welcome/>} />

                <Route 
                    path='dashboard' 
                    element={
                        <Private>
                            <DashboardSidebar />
                        </Private>
                    } 
                >
                    <Route path='app' element={<DashboardApp />}/>
                    <Route path='project/:projectId' element={<Project />} />
                </Route>

                <Route 
                    path='/about' 
                    element={
                        <Private>
                            <About />
                        </Private>
                    }     
                />
            </Routes>
        </div>

    )
}
export default App;