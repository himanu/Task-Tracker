import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getAuthState } from './Store/Selectors/Auth';
import {validateTokenId} from './Store/Slices/Auth';
import { Routes, Route} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Auth/Login';
import Todo from './Components/Todo'
import Navbar from './Components/Navbar';
import About from './Components/About';
import Private from './Private';

function App() {
    const {user, tokenId} = useSelector(getAuthState);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(tokenId) {
            const ret = dispatch(validateTokenId(tokenId));
            console.log('return value of dispatch function ', ret);
        }
    },[]);

    return (
        <div className="rootComponent" style={{display: 'flex', background: '#f6f8f9',minHeight: '100vh', flexDirection: 'column'}}>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path="" element={<Navbar />}>
                    
                    <Route path="/" element={<Home/>} />
                    <Route 
                        path='/todo' 
                        element={
                            <Private>
                                <Todo />
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