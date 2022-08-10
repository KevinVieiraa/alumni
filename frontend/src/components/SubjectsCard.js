import React from 'react';
import { Button, Select } from '@mui/material/';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './styles/SubjectsCard.module.css'
import SelectableSubject from './SelectableSubject';

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#6D597A"
        }
    }
});

const SubjectsCard = () => {

    return (
        <ThemeProvider theme={customTheme}>
            <div class={styles.subjectsCard}>
                <div class={styles.headerContainer}>
                    <div class={styles.titleContainer}>
                        <h1 class={styles.headerTitle}>
                            Só mais uma etapa...
                        </h1>
                        <h2 class={styles.headerSubTitle}>
                            Preencha sua integralização curricular
                        </h2>
                    </div>
                    <div>
                        <Button variant="contained" size="large" sx={{ height:1/1, fontWeight: 600 }}>PROSSEGUIR</Button>
                    </div>
                </div>
                <div class={styles.selectionsContainer}>
                    <div>
                        <Select
                            inputProps={{ 'aria-label': 'Without label' }}
                            value="1º Período"
                            sx={{ height:1/1, fontWeight: 600, fontColor:'#4A4A4A' }}
                        >
                            <MenuItem value="1º Período">1º Período</MenuItem>
                            <MenuItem value="2º Período">2º Período</MenuItem>
                            <MenuItem value="3º Período">3º Período</MenuItem>
                            <MenuItem value="4º Período">4º Período</MenuItem>
                            <MenuItem value="5º Período">5º Período</MenuItem>
                            <MenuItem value="6º Período">6º Período</MenuItem>
                            <MenuItem value="7º Período">7º Período</MenuItem>
                            <MenuItem value="8º Período">8º Período</MenuItem>
                        </Select>
                    </div>
                    <div>
                        <Button variant="outlined" size="large" sx={{ height: 1/1, mr: 2, fontWeight: 600 }}>DESMARCAR TUDO</Button>
                        <Button variant="outlined" size="large" sx={{ height: 1/1, fontWeight: 600 }}>MARCAR TUDO</Button>
                    </div>
                </div>
                <div class={styles.subjectsContainer}>
                    <SelectableSubject checkType="check"/>
                    <SelectableSubject checkType="check"/>
                    <SelectableSubject checkType="check"/>
                    <SelectableSubject checkType="check"/>
                    <SelectableSubject checkType="check"/>
                    <SelectableSubject checkType="check"/>
                    <SelectableSubject checkType="check"/>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default SubjectsCard;