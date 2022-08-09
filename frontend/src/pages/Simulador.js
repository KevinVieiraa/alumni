import React from 'react';
import { Button } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Add } from '@mui/icons-material/';

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

class Login extends React.Component {
    render() {
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
                                    2022/1asdasdasdasdsa
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
}

export default Login;