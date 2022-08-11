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

const CurrentSubjectCard = (props) => {
    let period = props.period;
    let name = props.name;
    let code = props.code;
    let hours = props.hours;
    let credits = props.credits;


    return (
        <ThemeProvider theme={customTheme}>
            <div className={styles.cardContainer}>
                <div className={styles.subjectInfoContainer}>
                    <h2 className={styles.period}>
                        {period + "º"}
                    </h2>
                    <div className={styles.subjectInfo}>
                        <h1>
                            {name}
                        </h1>
                        <h2>
                            {code}
                        </h2>
                    </div>
                </div>
                <div className={styles.creditsInfoContainer}>
                    <h3>
                        {hours + "h"}
                    </h3>
                    <h3>
                        {credits +  " Créditos"}
                    </h3>
                </div>
                <div className={styles.statusContainer}>
                    <Chip label="Cursando" sx={{color: 'white', backgroundColor: '#93e39b'}}/>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default CurrentSubjectCard;