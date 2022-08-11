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
    const [wrongPassword, setWrongPassword] = useState(false);
    const [wrongEmail, setWrongEmail] = useState(false);
    const navigate = useNavigate();
    let userLoggedIn = false;
    
    const onClickLogin = async () => {
        const base_url = API_BASE_URL;

        if (email && password) {
            const parameters = "/aluno/?email=" + email + "&senha=" + password;
            let response = await fetch(base_url + parameters);
            
            let result = await response.json();
            //Caso retorne 422 o usuario ou senha estão incorretos
            if(response.status === 422) {
                if(result.message === "Usuário não encontrado") {
                    setEmail('');
                    setPassword('');
                    setWrongEmail(true);
                    setWrongPassword(false);
                }
                if(result.message === "Senha incorreta") {
                    setPassword('');
                    setWrongPassword(true);
                    setWrongEmail(false);
                }

                return;
            }
            else {
                setWrongPassword(false);
                setWrongEmail(false);
            }

            window.sessionStorage.setItem("loggedUser", JSON.stringify(result));
            navigate("/home", {replace: true});
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
            <div className={styles.loginCard}>
                <div className={styles.loginFormContainer}>
                    <div className={styles.loginForm}>
                        <img className={styles.logo} src={process.env.PUBLIC_URL + '/logo.svg'} alt="" />
                        <h1 className={styles.loginTitle}>Entrar</h1>
                        <TextField
                            required
                            variant="standard"
                            label="Email"
                            type="email"
                            error={wrongEmail}
                            value={email}
                            helperText={wrongEmail ? "Email incorreto" : ""}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            variant="standard"
                            label="Senha"
                            type="password"
                            error={wrongPassword}
                            value={password}
                            helperText={wrongPassword ? "Senha incorreta" : ""}
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
                        <h2 className={styles.registerText}>
                            Não tem uma conta? <Link to="/cadastro"><button className={styles.registerButton}>Cadastre-se</button></Link>
                        </h2>
                    </div>
                    <img className={styles.loginDrawing} src={process.env.PUBLIC_URL + '/pic_01.svg'} alt="" />
                </div>
                <div className={styles.welcomeMessageContainer}>
                    <img className={styles.loginDrawingCard} src={process.env.PUBLIC_URL + '/pic_02.svg'} alt="" />
                    <h1 className={styles.welcomeMessageTitle}>Alumni</h1>
                    <h2 className={styles.welcomeMessageSubtitle}>A plataforma que você precisa para avançar no curso que você escolheu.</h2>
                </div>
            </div>
        </ThemeProvider>
    )
    
}

export default LoginCard;