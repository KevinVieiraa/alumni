import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import PreenchimentoCadastro from './pages/PreenchimentoCadastro';
import Home from './pages/Home';
import Disciplinas from './pages/Disciplinas';
import Progresso from './pages/Progresso';
import Simulador from './pages/Simulador';

import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element = { <Navigate to="login"/> } />
				<Route path="/login" element = { <Login/> } />
				<Route path="/cadastro" element = { <Cadastro/> } />
				<Route path="/cadastro/preenchimento" element = { <PreenchimentoCadastro/> } />
				<Route path="/home" element = { <Home/> } />
				<Route path="/disciplinas" element = { <Disciplinas/> } />
				<Route path="/progresso" element = { <Progresso/> } />
				<Route path="/simulador" element = { <Simulador/> } />
			</Routes>
		</BrowserRouter>
	);
}

export default App;