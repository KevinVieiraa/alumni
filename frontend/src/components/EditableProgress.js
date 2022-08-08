import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Delete } from '@mui/icons-material/';
import styles from './styles/EditableProgress.module.css'

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#6D597A"
        }
    }
});

class EditableProgress extends React.Component {
    render() {
        return (
            <ThemeProvider theme={customTheme}>
                <div class={styles.selectableSubjectContainer}>
                    <div class={styles.progressName}>
                        <h1>
                            Lorem ipsum
                        </h1>
                        <h2>
                            Nulla at magna et tortor imperdiet placerat
                        </h2>
                    </div>
                    <div class={styles.progressInfo}>
                        <h1>
                            Horas
                        </h1>
                        <h2>
                            120h
                        </h2>
                    </div>
                    <div class={styles.progressInfo}>
                        <h1>
                            Data de Início
                        </h1>
                        <h2>
                            00/00/0000
                        </h2>
                    </div>
                    <div class={styles.progressInfo}>
                        <h1>
                            Data de Fim
                        </h1>
                        <h2>
                            00/00/0000
                        </h2>
                    </div>
                    <div class={styles.deleteContainer}>
                        <Delete sx={{color: '#777777'}}/>
                    </div>
                </div>
            </ThemeProvider>
        )
    };
}

export default EditableProgress;