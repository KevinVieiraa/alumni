import React, { useState } from 'react';
import { TextField, Button } from '@mui/material/';
import { API_BASE_URL } from '../config';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './styles/LoginCard.module.css'

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#6D597A"
        }
    }
});

const LoginCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    let wrongCredentials = false;
    let userLoggedIn = false;
    
    const onClickLogin = async () => {
        const base_url = API_BASE_URL;

        if (email && password) {
            const parameters = "/aluno/?email=" + email + "&senha=" + password;
            let response = await fetch(base_url + parameters);

            if (response.status === 204) {
                console.log("Usuário não encontrado");
                wrongCredentials = true;
                return;
            }

            let result = await response.json();
            window.sessionStorage.setItem("loggedUser", JSON.stringify(result));
            navigate("/home", {replace: true});
            // this.navigate('/home');
        }
    }

    const checkLoggedUser = () => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");

        if(!loggedUser)
            return;
        
        const parsedUser = JSON.parse(loggedUser);
        userLoggedIn = parsedUser && parsedUser.email && parsedUser.nome;
    }

    checkLoggedUser();
    if(userLoggedIn) {
        return (
            <Navigate to="/home"/>
        )
    }

    return (
        <ThemeProvider theme={customTheme}>
            <div class={styles.loginCard}>
                <div class={styles.loginFormContainer}>
                    <div class={styles.loginForm}>
                        <img class={styles.logo} src={process.env.PUBLIC_URL + '/logo.svg'} alt="" />
                        <h1 class={styles.loginTitle}>Entrar</h1>
                        <TextField
                            required
                            variant="standard"
                            label="Email"
                            type="email"
                            error={wrongCredentials}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            variant="standard"
                            label="Senha"
                            type="password"
                            error={wrongCredentials}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 5 }}
                        />
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ pt: 1.5, pb: 1.5, mb: 2, fontWeight: 600 }}
                            onClick={() => onClickLogin()}
                        >
                            ENTRAR
                        </Button>
                        <h2 class={styles.registerText}>
                            Não tem uma conta? <Link to="/cadastro"><button class={styles.registerButton}>Cadastre-se</button></Link>
                        </h2>
                    </div>
                    <img class={styles.loginDrawing} src={process.env.PUBLIC_URL + '/pic_01.svg'} alt="" />
                </div>
                <div class={styles.welcomeMessageContainer}>
                    <img class={styles.loginDrawingCard} src={process.env.PUBLIC_URL + '/pic_02.svg'} alt="" />
                    <h1 class={styles.welcomeMessageTitle}>Alumni</h1>
                    <h2 class={styles.welcomeMessageSubtitle}>Lorem ipsum dolor sit amet. Curabitur accumsan</h2>
                </div>
            </div>
        </ThemeProvider>
    )
    
}

export default LoginCard;