import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Disciplinas from './pages/Disciplinas';
import Progresso from './pages/Progresso';

import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element = { <Navigate to="login"/> } />
				<Route path="/login" element = { <Login/> } />
				<Route path="/signup" element = { <SignUp/> } />
				<Route path="/home" element = { <Home/> } />
				<Route path="/disciplinas" element = { <Disciplinas/> } />
				<Route path="/progresso" element = { <Progresso/> } />
			</Routes>
		</BrowserRouter>
	);
}

export default App;