import React from 'react';
import { Switch } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './styles/SelectableSubject.module.css'

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#6D597A"
        }
    }
});

class SelectableSubject extends React.Component {
    render() {
        return (
            <ThemeProvider theme={customTheme}>
                <div class={styles.selectableSubjectContainer}>
                    <div class={styles.subjectInfo}>
                        <div class={styles.period}>
                            1º
                        </div>
                        <div>
                            <h1>
                                Introdução à Ciência da Computação
                            </h1>
                            <h2>
                                INF16151
                            </h2>
                        </div>
                    </div>
                    <div class={styles.subjectCredits}>
                        <h1>
                            60h
                        </h1>
                        <h2>
                            3 Créditos
                        </h2>
                    </div>
                    <div class={styles.prerequisites}>
                        <h1>
                            Pré-requisitos
                        </h1>
                        <h2>
                            Nenhum
                        </h2>
                    </div>
                    <div class={styles.selectContainer}>
                        <h1>Aprovado?</h1>
                        <Switch sx={{mx:4}}/>
                    </div>
                </div>
            </ThemeProvider>
        )
    };
}

export default SelectableSubject;