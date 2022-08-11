import React, { useState } from 'react';
import { Button, Select } from '@mui/material/';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { useEffectOnce } from './UseEffectOnce';
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
    const [selectedPeriod, setSelectedPeriod] = useState(1);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [subjects, setSubjects] = useState({});
    const [periodNumbers, setPeriodNumbers] = useState(1);

    const navigate = useNavigate();

    const checkLoggedUser = () => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");

        if(!loggedUser)
        {
            navigate("/login", {replace: true});
            return;
        }
        
        const parsedUser = JSON.parse(loggedUser);
        const userLoggedIn = parsedUser && parsedUser.email && parsedUser.nome;
        if(!userLoggedIn) {
            navigate("/login", {replace: true});
        }
    }

    const getSubjects = async () => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");
        const base_url = API_BASE_URL;
        const parameters = "/DisciplinaAluno/listaDisciplinasAluno?id_aluno=" + JSON.parse(loggedUser).id_aluno;

        let response = await fetch(base_url + parameters);
        let result = await response.json();

        result.disciplinas.forEach(disciplina => {
            if(subjects[disciplina.periodo]) {
                subjects[disciplina.periodo].push(disciplina);
            }
            else {
                subjects[disciplina.periodo] = [disciplina];
            }

            setSubjects(subjects);

            if(disciplina.periodo > periodNumbers) {
                setPeriodNumbers(disciplina.periodo);
            }
            setSelectedSubjects(subjects["1"]);
        });
    };

    const onChangePeriod = (newValue) => {
        setSelectedPeriod(newValue);

        const periodKey = newValue.replace("º Período", "");
        setSelectedSubjects(subjects[periodKey]);
    }

    const onChangeChildStatus = (subjectCode, period, approved) => {
        let index = subjects[period].findIndex(subject => subject.codigo === subjectCode)

        let status = approved ? "Pendente" : "Concluído";
        subjects[period][index].status = status;

        setSubjects(subjects);
        setSelectedSubjects(subjects[period]);

        console.log(subjects[period]);
    }

    const onClickProceed = async () => {
        // Pendente
        // Matriculado
        // Concluído
        const loggedUser = window.sessionStorage.getItem("loggedUser");
        const loggedUserId = JSON.parse(loggedUser).id_aluno;
        console.log(loggedUserId);
        const base_url = API_BASE_URL;
        
        let subjects_ids = [];
        let subjects_status = [];

        Object.keys(subjects).forEach(key => {
            subjects[key].map(disciplina => disciplina.id_disciplina).forEach(id => {
                subjects_ids.push(id);
            });

            subjects[key].map(disciplina => disciplina.status).forEach(id => {
                subjects_status.push(id);
            });
        });

        const parameters = "/disciplinaAluno/listStatusDisciplinaAluno?id_disciplina=" + subjects_ids + "&status= " + subjects_status + "&id_aluno=" + loggedUserId;

        let response = await fetch(base_url + parameters, {
            method: "PATCH"
        });
        let result = await response.json();

        if(response.status === 200) {
            console.log(result);
            navigate("/home", {replace: true});
        }
        else {
            console.log(result);
        }

    }

    useEffectOnce(()=> {
        checkLoggedUser();
        getSubjects();
    });


    return (
        <ThemeProvider theme={customTheme}>
            <div className={styles.subjectsCard}>
                <div className={styles.headerContainer}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.headerTitle}>
                            Só mais uma etapa...
                        </h1>
                        <h2 className={styles.headerSubTitle}>
                            Preencha sua integralização curricular
                        </h2>
                    </div>
                    <div>
                        <Button 
                            variant="contained"     
                            size="large" 
                            sx={{ height:1/1, fontWeight: 600 }}
                            onClick={() => onClickProceed()}
                        >
                        PROSSEGUIR
                        </Button>
                    </div>
                </div>
                <div className={styles.selectionsContainer}>
                    <div>
                        <Select
                            inputProps={{ 'aria-label': 'Without label' }}
                            value={selectedPeriod}
                            onChange={(e) => onChangePeriod(e.target.value)}
                            sx={{ height:1/1, fontWeight: 600, fontColor:'#4A4A4A' }}
                        >
                            {
                                Object.keys(subjects).map((period) => (
                                    <MenuItem key={period} value={period}>
                                        {period + "º Período"}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </div>
                    {/* <div>
                        <Button variant="outlined" size="large" sx={{ height: 1/1, mr: 2, fontWeight: 600 }}>DESMARCAR TUDO</Button>
                        <Button variant="outlined" size="large" sx={{ height: 1/1, fontWeight: 600 }}>MARCAR TUDO</Button>
                    </div> */}
                </div>
                <div className={styles.subjectsContainer}>
                    {
                        selectedSubjects.map((subject) => (
                            <SelectableSubject 
                                checkType="check"
                                key={subject.codigo}
                                period={subject.periodo}
                                name={subject.nome_disciplina}
                                code={subject.codigo}
                                hours={subject.carga_horaria}
                                credits={subject.creditos}
                                preRequisites={subject.pre_requisitos}
                                approved={subject.status === "Concluído"}
                                onChangeStatus={onChangeChildStatus}
                            />
                        ))
                    }
                </div>
            </div>
        </ThemeProvider>
    )
}

export default SubjectsCard;