import React from 'react';
import { TextField, Button } from '@mui/material/'
import styles from './styles/LoginCard.module.css'


class LoginCard extends React.Component {
    render() {
        return (
            <div class={styles.loginCard}>
                <div class={styles.loginFormContainer}>
                    <div class={styles.loginForm}>
                        <img class={styles.logo} src={process.env.PUBLIC_URL + '/logo.svg'} alt="" />
                        <h1 class={styles.loginTitle}>Entrar</h1>
                        <TextField
                            required
                            variant="outlined"
                            label="Email"
                            type="email"
                        />
                        <TextField
                            required
                            variant="outlined"
                            label="Senha"
                            type="password"
                        />
                        <Button variant="contained" size="large" color="primary">ENTRAR</Button>
                        <h2>
                            Não tem uma conta? <button>cadastre-se</button>
                        </h2>
                    </div>
                </div>
                <div class={styles.welcomeMessageContainer}>
                    b
                </div>
            </div>
        )
    };
}

export default LoginCard;