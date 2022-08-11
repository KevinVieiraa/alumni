import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import styles from './styles/Disciplinas.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from '../components/UseEffectOnce';
import { API_BASE_URL } from '../config';
import SelectableSubject from '../components/SelectableSubject';

const Disciplinas = () => {
    const [selectedSubjectType, setSelectedSubjectType] = useState("Todas");
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [subjects, setSubjects] = useState([]);
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
        
        setSubjects(result.disciplinas);
        setSelectedSubjects(result.disciplinas.sort((a, b) => a.periodo - b.periodo));
    };

    const onChangeSubjectFilter = (value) => {
        setSelectedSubjectType(value);
        updateSelectedSubjects(value);
    }

    const updateSelectedSubjects = (value) => {
        let filteredSubjects = subjects;

        if(value === "Todas") {
            filteredSubjects = subjects;
        }
        else if(value === "Matriculadas") {
            filteredSubjects = subjects.filter(subject => subject.status === "Matriculado");
        }
        else if(value === "Aprovadas"){
            filteredSubjects = subjects.filter(subject => subject.status === "Concluído");
        }
        else if(value === "Pendentes"){
            filteredSubjects = subjects.filter(subject => subject.status === "Pendente");
        }
        else if(value === "Optativas"){
            filteredSubjects = subjects.filter(subject => subject.obrigatoria === false);
        }

        filteredSubjects.sort((a, b) => a.periodo - b.periodo);
        setSelectedSubjects(filteredSubjects);
    }

    const onChangeChildStatus = async (subjectCode, period, status) => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");
        const base_url = API_BASE_URL;

        let subjectIndex = subjects.findIndex(subject => subject.codigo === subjectCode);
        const subject_id = subjects[subjectIndex].id_disciplina;

        const parameters = "/disciplinaAluno/statusDisciplinaAluno?id_aluno=" + JSON.parse(loggedUser).id_aluno + "&id_disciplina=" + subject_id + "&status=" + status;

        // eslint-disable-next-line
        let response = await fetch(base_url + parameters, {
            method: "PATCH"
        });

        subjects[subjectIndex].status = status;
        setSubjects(subjects);
        updateSelectedSubjects(selectedSubjectType);
    }

    

    useEffectOnce(()=> {
        checkLoggedUser();
        getSubjects();
    });

    return (
        <div className={styles.subjectsContainer}>
            <Sidebar selectedButton="disciplinas"/>
            <div className={styles.contentContainer}>
                <div className={styles.headerContainer}>
                    <h1>
                        Minhas Disciplinas
                    </h1>
                </div>
                <div className={styles.buttonsContainer}>
                    <button style={selectedSubjectType === "Todas" ? {'color': '#404040'} : {}} value={"Todas"} onClick={(e) => {onChangeSubjectFilter("Todas")}}>Todas</button>
                    <button style={selectedSubjectType === "Matriculadas" ? {'color': '#404040'} : {}} value={"Matriculadas"} onClick={(e) => {onChangeSubjectFilter("Matriculadas")}}>Matriculadas</button>
                    <button style={selectedSubjectType === "Aprovadas" ? {'color': '#404040'} : {}} value={"Aprovadas"} onClick={(e) => {onChangeSubjectFilter("Aprovadas")}}>Aprovadas</button>
                    <button style={selectedSubjectType === "Pendentes" ? {'color': '#404040'} : {}} value={"Pendentes"} onClick={(e) => {onChangeSubjectFilter("Pendentes")}}>Pendentes</button>
                    <button style={selectedSubjectType === "Optativas" ? {'color': '#404040'} : {}} value={"Optativas"} onClick={(e) => {onChangeSubjectFilter("Optativas")}}>Optativas</button>
                </div>
                <div className={styles.subjects}>
                    {
                        selectedSubjects.map((subject) => (
                            <SelectableSubject
                                checkType="status"
                                key={subject.codigo}
                                period={subject.periodo}
                                name={subject.nome_disciplina}
                                code={subject.codigo}
                                hours={subject.carga_horaria}
                                credits={subject.creditos}
                                preRequisites={subject.pre_requisitos}
                                approved={subject.status === "Concluído"}
                                status={subject.status}
                                onChangeStatus={onChangeChildStatus}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Disciplinas;