import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/UserLogin';
import SignUp from './components/UserSignUp';
import Home from './components/Home';
import ChatBox from './components/ChatBox';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/chat/:userId" element={<ChatBox />} />
            </Routes>
        </Router>
    );
}

export default App;
