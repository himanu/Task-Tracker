import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import {signIn} from './Store/Slices/Auth';
import { Routes, Route} from 'react-router-dom';
import Welcome from './Components/Welcome';
import Login from './Components/Auth/Login';
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Private from './Private';
function App() {
    const dispatch = useDispatch();
    useEffect(()=>{
        const tokenId = JSON.parse(window.localStorage.getItem('tokenId'));
        if(tokenId) {
            const ret = dispatch(signIn(tokenId));
        }
    },[]);

    return (
        <div className="rootComponent" style={{display: 'flex', background: '#f6f8f9',minHeight: '100vh', flexDirection: 'column'}}>
            <Routes>
                <Route 
                    path = '/login' 
                    element = {
                        <Private>
                            <Login />
                        </Private>
                    }  
                />
                <Route path="" element={<Navbar />}>
                    
                    <Route path="/" element={<Welcome/>} />
                    <Route 
                        path='/dashboard' 
                        element={
                            <Private>
                                <Dashboard />
                            </Private>
                        } 
                    />
                    <Route 
                        path='/about' 
                        element={
                            <Private>
                                <About />
                            </Private>
                        }     
                    />
                </Route>
            </Routes>
        </div>

    )
}
export default App;