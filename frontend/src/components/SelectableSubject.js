import React, { useState } from 'react';
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



const SelectableSubject = (props) => {
    let check;
    let period = props.period;
    let name = props.name;
    let code = props.code;
    let hours = props.hours;
    let credits = props.credits;
    let preRequisites = props.preRequisites;
    let approved = props.approved;
    let status;

    if(props.status) {
        status = props.status;
    }

    const [switchChecked, setSwitchChecked] = useState(approved);
    const [markedStatus, setMarkedStatus] = useState(status);

    if(props.checkType === 'status') {
        check = <div className={styles.selectContainer}>
                    <Select
                        value={markedStatus}
                        label="Status"
                        sx={{
                            height:1/1
                        }}
                        onChange={(e) => {
                            setMarkedStatus(e.target.value);
                            props.onChangeStatus(code, period, e.target.value);
                        }}
                    >
                        <MenuItem key={"Pendente"} value={"Pendente"}>Pendente</MenuItem>

                        <MenuItem key={"Matriculado"} value={"Matriculado"}>Matriculado</MenuItem>

                        <MenuItem key={"Concluído"}value={"Concluído"}>Concluído</MenuItem>
                    </Select>
                </div>
    }
    else if(props.checkType === 'check') {
        check = <div className={styles.selectContainer}>
                    <h1>Aprovado?</h1>
                    <Switch 
                        sx={{mx:4}} 
                        value={switchChecked} 
                        checked={switchChecked}
                        onClick={() => {
                            setSwitchChecked(!switchChecked);
                            props.onChangeStatus(code, period, switchChecked);
                        }}
                    />
                </div>
    }
    else {
        check = <></>
    }

    return (
        <ThemeProvider theme={customTheme}>
            <div className={styles.selectableSubjectContainer}>
                <div className={styles.subjectInfo}>
                    <div className={styles.period}>
                        {period + "º"}
                    </div>
                    <div>
                        <h1>
                            {name}
                        </h1>
                        <h2>
                            {code}
                        </h2>
                    </div>
                </div>
                <div className={styles.subjectCredits}>
                    <h1>
                        {hours + "h"}
                    </h1>
                    <h2>
                        {credits + " Créditos"}
                    </h2>
                </div>
                <div className={styles.prerequisites}>
                    <h1>
                        Pré-requisitos
                    </h1>
                    <div className={styles.prerequisitesSubjects}>
                        {
                            (preRequisites || []).map((preRequisite) => (
                                <h2>
                                    {preRequisite}
                                </h2>
                            ))
                        }
                    </div>
                </div>
                {check}
            </div>
        </ThemeProvider>
    )

}

export default SelectableSubject;