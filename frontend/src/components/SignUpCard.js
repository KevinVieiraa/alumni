import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select } from '@mui/material/';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './styles/SignUpCard.module.css'

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#6D597A"
        }
    }
});

const SignUpCard = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [degree, setDegree] = useState("");

    const [wrongEmailFormat, setWrongEmailFormat] = useState("");
    const [emailNotAvailable, setEmailNotAvailable] = useState("");
    const [wrongRepeatPassword, setWrongRepeatPassword] = useState("");

    const navigate = useNavigate();

    let degrees = [{
        value: "1",
        label: "Ciência da Computação"
    }];

    let userLoggedIn = false;

    const checkLoggedUser = () => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");

        if(!loggedUser)
            return;
        
        const parsedUser = JSON.parse(loggedUser);
        userLoggedIn = parsedUser && parsedUser.email && parsedUser.nome;
        if(userLoggedIn) {
            navigate("/home", {replace: true});
        }
    }

    const validateEmail = (email) => {
        // eslint-disable-next-line
        const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        return format.test(email);
    }

    // eslint-disable-next-line
    const getDegrees = async () => {
        const base_url = API_BASE_URL;
        const parameters = "/curso/";

        let response = await fetch(base_url + parameters);

        if (!response.ok) {
            console.log(response.status);
            return;
        }

        let result = await response.json();
        result.cursos.forEach(curso => {
            degrees.push({
                value: curso.id_curso,
                label: curso.nome_curso
            });
        });

    }
    
    const onClickSignUp = async () => {
        if(name && email && password && repeatPassword && degree) {
            if(!validateEmail(email)) {
                setWrongEmailFormat(true);
                return;
            }
            else {
                setWrongEmailFormat(false);
            }

            if(password !== repeatPassword) {
                setWrongRepeatPassword(true);
                return;
            }
            else {
                setWrongRepeatPassword(false);
            }

            const base_url = API_BASE_URL;
            const parameters = "/aluno/criarAluno?nome=" + name + "&email=" + email + "&senha=" + password + "&id_curso=" + degree;
            let response = await fetch(base_url + parameters, {
                method: "POST"
            });

            let result = await response.json();
            if(response.status === 201) {
                //Criou o aluno, redireciona para o cadastro das disciplinas
                window.sessionStorage.setItem("loggedUser", JSON.stringify(result));
                navigate("/cadastro/preenchimento", {replace: true});
            }
            else if(response.status === 422) {
                setEmailNotAvailable(true);
            }
        }
    }

    checkLoggedUser();
    // getDegrees();
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx = {{ mb:2 }}
                        />
                        <TextField
                            required
                            variant="standard"
                            label="Email"
                            type="email"
                            value={email}
                            error={wrongEmailFormat || emailNotAvailable}
                            helperText={ (wrongEmailFormat ? "Formato do email inválido" : "") || (emailNotAvailable ? "Este email já está em uso" : "") }
                            onChange={(e) => setEmail(e.target.value)}
                            sx = {{ mb:2 }}
                        />
                        <TextField
                            required
                            variant="standard"
                            label="Senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx = {{ mb:2 }}
                        />
                        <TextField
                            required
                            variant="standard"
                            label="Confirmação de Senha"
                            value={repeatPassword}
                            error={wrongRepeatPassword}
                            helperText={wrongRepeatPassword ? "A confirmação de senha deve ser igual à senha" : ""}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            type="password"
                            sx = {{ mb:5 }}
                        />
                        <Select
                            select
                            required
                            label="Curso"
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                            variant="standard"
                            sx = {{ mb:10 }}
                        >
                            {degrees.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button 
                            variant="contained" 
                            size="large" 
                            sx={{ pt:1.5, pb:1.5, mb:2, fontWeight: 600 }}
                            onClick={() => onClickSignUp()}
                        >
                            CADASTRAR-SE
                        </Button>
                        <h2 class={styles.registerText}>
                            Já possui uma conta? <Link to="/login"><button class={styles.registerButton}>Entre</button></Link>
                        </h2>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default SignUpCard;