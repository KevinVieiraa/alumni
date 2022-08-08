import React from 'react';
import { Switch, Select, MenuItem } from '@mui/material/';
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
        let check;
        if(this.props.checkType === 'status') {
            check = <div class={styles.selectContainer}>
                        <Select
                            value={"Matriculado"}
                            label="Status"
                            sx={{
                                height:1/1
                            }}
                        >
                            <MenuItem value={"Não Realizado"}>Não Realizado</MenuItem>
                            <MenuItem value={"Matriculado"}>Matriculado</MenuItem>
                            <MenuItem value={"Concluído"}>Concluído</MenuItem>
                        </Select>
                    </div>
        }
        else if(this.props.checkType === 'check') {
            check = <div class={styles.selectContainer}>
                        <h1>Aprovado?</h1>
                        <Switch sx={{mx:4}}/>
                    </div>
        }

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
                    {check}
                </div>
            </ThemeProvider>
        )
    };
}

export default SelectableSubject;