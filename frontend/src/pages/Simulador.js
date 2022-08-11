import React, { useState } from 'react';
import { Button } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Add } from '@mui/icons-material/';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import SelectableSubject from '../components/SelectableSubject';

import styles from './styles/Simulador.module.css';

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#6D597A",
        }
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    }
});

const Simulador = () => {
    let buttonStyle = {
        height: 35, 
        width: 120, 
        my: 0, 
        mx: 0, 
        fontSize: 14, 
        fontWeight: 'bold',
        justifyContent: "center",
        borderRadius: 0,
        border: '0px',
        'border-top': '2px solid #6D597A',
        'border-right': '2px solid #6D597A',
        '&:hover': {
            border: '0px',
            'border-top': '2px solid #6D597A',
            'border-right': '2px solid #6D597A',
        },
        overflow: "hidden",
    };

    let addButtonStyle = {
        height: 35, 
        width: 35, 
        my: 0, 
        mx: 0, 
        fontSize: 14, 
        fontWeight: 'bold',
        justifyContent: "center",
        'border-radius': 0,
        'border-top-right-radius': 20,
        border: '0px',
        'border-top': '2px solid #6D597A',
        'border-right': '2px solid #6D597A',
        '&:hover': {
            border: '0px',
            'border-top': '2px solid #6D597A',
            'border-right': '2px solid #6D597A',
        }
    };

    let newSubjectButtonStyle = {
        height: '100%', 
        width: '100%', 
        margin: 0, 
        padding: 0, 
        fontSize: 14, 
        fontWeight: 'bold',
        justifyContent: "center",
        'border-radius': 100
    };

    // eslint-disable-next-line
    const [abasAluno, setAbasAluno] = useState([]);
    const navigate = useNavigate();

    // eslint-disable-next-line
    const checkLoggedUser = () => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");

        if (!loggedUser) {
            navigate("/login", { replace: true });
            return;
        }

        const parsedUser = JSON.parse(loggedUser);
        const userLoggedIn = parsedUser && parsedUser.email && parsedUser.nome;
        if (!userLoggedIn) {
            navigate("/login", { replace: true });
        }
    }

    // eslint-disable-next-line
    const getAbasAluno = async () => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");
        const base_url = API_BASE_URL;
        const parameters = "/abaSimulacao/?id_aluno=" + JSON.parse(loggedUser).id_aluno;

        // eslint-disable-next-line
        let response = await fetch(base_url + parameters);
        
        setAbasAluno('2023');
        //setSelectedSubjects(result.disciplinas.sort((a, b) => a.periodo - b.periodo));
    };

    return (
        <ThemeProvider theme={customTheme}>
            <div class={styles.simulationContainer}>
                <Sidebar selectedButton="simulador"/>
                <div class={styles.contentContainer}>
                    <div class={styles.headerContainer}>
                        <h1>
                            Simulador de Horário
                        </h1>
                    </div>
                    <div class={styles.simulationWindowContainer}>
                        <div class={styles.subjectsContainer}>
                            <SelectableSubject/>
                            <SelectableSubject/>
                            <SelectableSubject/>
                            <SelectableSubject/>
                            <SelectableSubject/>

                            <div class={styles.newSubjectButtonContainer}>
                                <Button 
                                    variant="contained"
                                    sx= { newSubjectButtonStyle }
                                >
                                    <Add sx={{margin:0, padding: 0, transform: 'scale(1.5)'}}/>
                                </Button>
                            </div>
                        </div>
                        <div class={styles.buttonsContainer}>
                            
                            <Button 
                                variant="outlined"
                                sx= { buttonStyle }
                            >
                               2050
                            </Button>
                            <Button 
                                variant="outlined"
                                sx= { buttonStyle }
                            >
                                2022/1
                            </Button>
                            <Button 
                                variant="outlined"
                                sx= { buttonStyle }
                            >
                                2022/1
                            </Button>
                            <Button 
                                variant="outlined"
                                sx= { addButtonStyle }
                            >
                                <Add/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Simulador;