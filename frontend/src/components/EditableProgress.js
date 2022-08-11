import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Delete } from '@mui/icons-material/';
import { IconButton } from '@mui/material/';
import styles from './styles/EditableProgress.module.css'

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#6D597A"
        }
    }
});

const EditableProgress = (props) => {
    let id = props.activityId;
    let name = props.name;
    let description = props.description;
    let hours = props.hours;

    let startDateFormat = props.startDate.split("T")[0].split("-");
    let startDate = startDateFormat[2] + "/" + startDateFormat[1] + "/" + startDateFormat[0];

    let endDateFormat = props.endDate.split("T")[0].split("-");
    let endDate = endDateFormat[2] + "/" + endDateFormat[1] + "/" + endDateFormat[0];;

    return (
        <ThemeProvider theme={customTheme}>
            <div className={styles.selectableSubjectContainer}>
                <div className={styles.progressName}>
                    <h1>
                        { name }
                    </h1>
                    <h2>
                        { description }
                    </h2>
                </div>
                <div className={styles.progressInfo}>
                    <h1>
                        Horas
                    </h1>
                    <h2>
                        { hours + "h" }
                    </h2>
                </div>
                <div className={styles.progressInfo}>
                    <h1>
                        Data de Início
                    </h1>
                    <h2>
                        { startDate }
                    </h2>
                </div>
                <div className={styles.progressInfo}>
                    <h1>
                        Data de Fim
                    </h1>
                    <h2>
                        { endDate }
                    </h2>
                </div>
                <div className={styles.deleteContainer}>
                    <IconButton
                        onClick={() => {props.onClickDelete(id)}}
                    >
                        <Delete sx={{ color: '#777777' }} />
                    </IconButton>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default EditableProgress;