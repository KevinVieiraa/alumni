import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LinearProgress } from '@mui/material/';

import styles from './styles/ProgressCard.module.css'

const ProgressCard = (props) => {
    let cardTitle = props.cardTitle;
    let cardCurrentValue = props.currentValue;
    let cardMaxValue = props.maxValue
    let cardIcon = props.cardIcon;
    let backgroundIcon = props.backgroundIcon;
    let backgroundColor = props.backgroundColor;
    let darkerColor = props.darkerColor;
    let barColor = props.barColor;

    //let horaComplementar = undefined;
    //let valorFinal = horaComplementar || 0; //retorna 0 ou a hora complementar se tiver
    const customTheme = createTheme({
        palette: {
            primary: {
                main: barColor
            }
        }
    });
    
    return (
        <ThemeProvider theme={customTheme}>
            <div className={styles.cardContainer} style={{ 'backgroundColor': backgroundColor }}>
                <div className={styles.cardIcon} style={{ 'backgroundColor': darkerColor }} >
                    { cardIcon }
                </div>
                <div className={styles.backgroundIcon}>
                    { backgroundIcon }
                </div>
                <h1>
                    { cardTitle }
                </h1>
                <div className={styles.progressContainer}>
                    <div className={styles.progressTextContainer}>
                        <h2>
                            {(cardMaxValue === 0 ? 0 : parseInt( (cardCurrentValue/cardMaxValue) * 100 )) + "%"}
                        </h2>
                        <h2>
                            {cardCurrentValue + "h/" + cardMaxValue + "h"}
                        </h2>
                    </div>
                    <div className={styles.progressBarContainer}>
                        <LinearProgress 
                            variant="determinate" 
                            value={(cardMaxValue === 0 ? 0 : ((cardCurrentValue/cardMaxValue) * 100))}
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