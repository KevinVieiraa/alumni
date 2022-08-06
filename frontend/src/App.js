import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';

import './App.css';

// import LoginCard from './components/LoginCard';
// import SignUpCard from './components/SignUpCard';
// import Sidebar from './components/Sidebar';
// import SubjectsCard from './components/SubjectsCard';


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element = { <Navigate to="login"/> } />
				<Route path="/login" element = { <Login/> } />
				<Route path="/signup" element = { <SignUp/> } />
			</Routes>
		</BrowserRouter>
	);
}

export default App;