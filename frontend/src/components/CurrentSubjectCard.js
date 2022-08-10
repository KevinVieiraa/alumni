import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './styles/CurrentSubjectCard.module.css';
import { Chip } from '@mui/material';

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#6D597A"
        }
    }
});

const ProgressCard = () => {

    return (
        <ThemeProvider theme={customTheme}>
            <div class={styles.cardContainer}>
                <div class={styles.subjectInfoContainer}>
                    <h2 class={styles.period}>
                        6º
                    </h2>
                    <div class={styles.subjectInfo}>
                        <h1>
                            Análise e Projeto de Algoritmos
                        </h1>
                        <h2>
                            INF6666
                        </h2>
                    </div>
                </div>
                <div class={styles.creditsInfoContainer}>
                    <h3>
                        60h
                    </h3>
                    <h3>
                        4 Créditos
                    </h3>
                </div>
                <div class={styles.statusContainer}>
                    <Chip label="Cursando" sx={{color: 'white', backgroundColor: '#93e39b'}}/>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default ProgressCard;