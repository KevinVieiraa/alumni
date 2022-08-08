import React from 'react';
import { TextField, Button } from '@mui/material/';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './styles/LoginCard.module.css'

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#6D597A"
        }
    }
});

class LoginCard extends React.Component {
    render() {
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
                                sx = {{ mb:2 }}
                            />
                            <TextField
                                required
                                variant="standard"
                                label="Senha"
                                type="password"
                                sx = {{ mb:5 }}
                            />
                            <Button variant="contained" size="large" sx={{ pt:1.5, pb:1.5, mb:2, fontWeight: 600 }}>ENTRAR</Button>
                            <h2 class={styles.registerText}>
                                Não tem uma conta? <Link to="/signup"><button class={styles.registerButton}>Cadastre-se</button></Link>
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
    };
}

export default LoginCard;