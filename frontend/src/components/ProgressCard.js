import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LinearProgress } from '@mui/material/';

import styles from './styles/ProgressCard.module.css'


const ProgressCard = (props) => {

    let cardIcon = props.cardIcon;
    let backgroundIcon = props.backgroundIcon;
    let backgroundColor = props.backgroundColor;
    let darkerColor = props.darkerColor;
    let barColor = props.barColor;
    const customTheme = createTheme({
        palette: {
            primary: {
                main: barColor
            }
        }
    });

    return (
        <ThemeProvider theme={customTheme}>
            <div class={styles.cardContainer} style={{ 'background-color': backgroundColor }}>
                <div class={styles.cardIcon} style={{ 'background-color': darkerColor }} >
                    { cardIcon }
                </div>
                <div class={styles.backgroundIcon}>
                    { backgroundIcon }
                </div>
                <h1>
                    Disciplinas Obrigatórias
                </h1>
                <div class={styles.progressContainer}>
                    <div class={styles.progressTextContainer}>
                        <h2>
                            100%
                        </h2>
                        <h2>
                            200h/200h
                        </h2>
                    </div>
                    <div class={styles.progressBarContainer}>
                        <LinearProgress 
                            variant="determinate" 
                            value={50}
                            sx={{ 
                                height: 6, 
                                borderRadius: 8
                            }}
                        />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default ProgressCard;