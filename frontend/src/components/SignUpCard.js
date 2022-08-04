import React from 'react';
import { TextField, Button } from '@mui/material/'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './styles/SignUpCard.module.css'

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#6D597A"
        }
    }
});

class SignUpCard extends React.Component {
    render() {
        return (
            <ThemeProvider theme={customTheme}>
                <div class={styles.signUpCard}>
                    <div class={styles.loginFormContainer}>
                        <div class={styles.loginForm}>
                            <img class={styles.logo} src={process.env.PUBLIC_URL + '/logo.svg'} alt="" />
                            <h1 class={styles.loginTitle}>Criar uma conta</h1>
                            <TextField
                                required
                                variant="standard"
                                label="Nome"
                                sx = {{ mb:2 }}
                            />
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
                                sx = {{ mb:2 }}
                            />
                            <TextField
                                required
                                variant="standard"
                                label="Confirmação de Senha"
                                type="password"
                                sx = {{ mb:5 }}
                            />
                            <TextField
                                select
                                required
                                label="Curso"
                                value={"tstes"}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="standard"
                                sx = {{ mb:10 }}
                            />
                            <Button variant="contained" size="large" sx={{ pt:1.5, pb:1.5, mb:2, fontWeight: 600 }}>CADASTRAR-SE</Button>
                            <h2 class={styles.registerText}>
                                Já possui uma conta? <button class={styles.registerButton}>Entre</button>
                            </h2>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        )
    };
}

export default SignUpCard;