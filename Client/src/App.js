import { Routes, Route } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Login from './Components/Auth/Login';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Private from './Private';
import Dashboard from './Components/Dashboard/index';

function App() {
    return (
        <div style={{ display: 'flex', background: '#f6f8f9', height: '100vh', flexDirection: 'column' }}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route
                    path='/login'
                    element={
                        <Login />
                    }
                />
                <Route
                    path='dashboard'
                    element={
                        <Private>
                            <Dashboard />
                        </Private>
                    }
                >
                </Route>

                <Route
                    path='/about'
                    element={
                        <About />
                    }
                />
            </Routes>
        </div>

    )
}
export default App;