import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { ModeEdit } from '@mui/icons-material/';
import { Star, Circle, Work } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from '../components/UseEffectOnce';
import { API_BASE_URL } from '../config';
import ProgressCard from '../components/ProgressCard';
import CurrentSubjectCard from '../components/CurrentSubjectCard';

import styles from './styles/Home.module.css';

const Login = () =>{
    const navigate = useNavigate();
    const [horasObrigatorias, setHorasObrigatorias] = useState(0);
    const [horasObrigatoriasFeitas, setHorasObrigatoriasFeitas] = useState(0);
    const [horasOptativasFeitas, setHorasOptativasFeitas] = useState(0);
    const [horasComplementaresFeitas, setHorasComplementaresFeitas] = useState(0);
    const [disciplinasCursando, setDisciplinasCursando] = useState([]);
    const [updateAnnotationFunction, setUpdateAnnotationFunction] = useState(undefined);
    const [annotationContent, setAnnotationContent] = useState("");
    const [nomeAluno, setNomeAluno] = useState("");
    

    //let nome_aluno = "";

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
        setNomeAluno(parsedUser.nome);
        //const nome_aluno = parsedUser.nome;
    }


    const loadSubjectsCardsInfo = async () => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");
        const base_url = API_BASE_URL;
        const parameters = "/DisciplinaAluno/listaDisciplinasAluno?id_aluno=" + JSON.parse(loggedUser).id_aluno;
        
        let response = await fetch(base_url + parameters);

        let optativasConcluidas = 0;
        let obrigatoriasConcluidas = 0;
        let obrigatoriasTotais = 0;

        let result = await response.json();
        result.disciplinas.forEach(disciplina => { 
            if(disciplina.obrigatoria) {
                obrigatoriasTotais += disciplina.carga_horaria;
                if(disciplina.status === "Concluído") {
                    obrigatoriasConcluidas += disciplina.carga_horaria;
                }
            }
            else {
                if(disciplina.status === "Concluído") {
                    optativasConcluidas += disciplina.carga_horaria;
                }
            }
        });

        setHorasObrigatorias(obrigatoriasTotais);
        setHorasObrigatoriasFeitas(obrigatoriasConcluidas);
        setHorasOptativasFeitas(optativasConcluidas);
    }

    const loadProgressCardsInfo = async () => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");
        const base_url = API_BASE_URL;
        const parameters = "/atividade/?id_aluno=" + JSON.parse(loggedUser).id_aluno + "&categoria=c";
        
        let response = await fetch(base_url + parameters);

        let horasComplementaresConcluidas = 0;

        let result = await response.json();
        result.forEach(atividade => { 
            horasComplementaresConcluidas += atividade.carga_horaria;
        });

        setHorasComplementaresFeitas(horasComplementaresConcluidas);
    }

    const loadCurrentSubjects = async () => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");
        const base_url = API_BASE_URL;
        const parameters = "/DisciplinaAluno/listaDisciplinasAluno?id_aluno=" + JSON.parse(loggedUser).id_aluno;
        
        let response = await fetch(base_url + parameters);

        let result = await response.json();

        let disciplinas = [];

        result.disciplinas.forEach(disciplina => { 
            if(disciplina.status === "Matriculado") {
                disciplinas.push(disciplina);
            }
        });

        setDisciplinasCursando(disciplinas);
    }

    const onChangeAnnotation = async (content) => {
        if(updateAnnotationFunction) {
            clearTimeout(updateAnnotationFunction);
            setUpdateAnnotationFunction(undefined);
        }

        setUpdateAnnotationFunction(setTimeout(async () => {
            let text = content.substring(0, 1024);
            setAnnotationContent(text);
            const loggedUser = window.sessionStorage.getItem("loggedUser");

            const base_url = API_BASE_URL;
            const parameters = "/anotacao/editarAnotacao?id_aluno=" + JSON.parse(loggedUser).id_aluno + "&conteudo=" + text;
            
            // eslint-disable-next-line
            let response = await fetch(base_url + parameters, {
                method: "PATCH"
            });

            setUpdateAnnotationFunction(undefined);
        }, 2000));
    }

    const loadAnnotationContent = async () => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");

        const base_url = API_BASE_URL;
        const parameters = "/anotacao/?id_aluno=" + JSON.parse(loggedUser).id_aluno;
        
        let response = await fetch(base_url + parameters);

        let result = await response.json();
        setAnnotationContent(result.texto_anotacao);
    }


    useEffectOnce(()=> {
        checkLoggedUser();
        loadSubjectsCardsInfo();
        loadProgressCardsInfo();
        loadCurrentSubjects();
        loadAnnotationContent();
        
    });

    
    return (
        <div class={styles.homeContainer}>
            <Sidebar selectedButton="home"/>
            <div class={styles.contentContainer}>
                <div class={styles.mainContentContainer}>
                    <div class={styles.headerContainer}>
                        <h1>
                            {"Olá, " + nomeAluno} 
                        </h1>
                        <h1>
                            {new Date().getFullYear()}
                        </h1>
                    </div>
                    <div class={styles.cardsContainer}>
                        <span>
                            <ProgressCard 
                                cardIcon={<Star sx={{margin:'auto', color:'#404040'}}/>}
                                backgroundIcon={<Star sx={{margin:'auto', color:'#D0D0FB'}}/>}
                                backgroundColor='#E4E4FC'
                                darkerColor='#D0D0FB'
                                barColor='#7E67DA'
                                cardTitle="Disciplinas Obrigatórias"
                                currentValue={ horasObrigatoriasFeitas }
                                maxValue={ horasObrigatorias }
                            />
                        </span>
                        <span>
                            <ProgressCard 
                                cardIcon={<Circle sx={{margin:'auto', color:'#404040'}}/>}
                                backgroundIcon={<Circle sx={{margin:'auto', color:'#CBDFF2'}}/>}
                                backgroundColor = '#E9F5FE'
                                darkerColor = '#CBDFF2'
                                barColor = '#7EAACB'
                                cardTitle = "Disciplinas Optativas"
                                currentValue={ horasOptativasFeitas }
                                maxValue={ 540 }
                            />
                        </span>
                        <span>
                            <ProgressCard 
                                cardIcon={<Work sx={{margin:'auto', color:'#404040'}}/>}
                                backgroundIcon={<Work sx={{margin:'auto', color:'#F2D4CB'}}/>}
                                backgroundColor = '#FEF1E9'
                                darkerColor = '#F2D4CB'
                                barColor = '#CB9A7E'
                                cardTitle = "Horas Complementares"
                                currentValue={ horasComplementaresFeitas }
                                maxValue={ 200 }
                            />
                        </span>
                    </div>
                    <div class={styles.subjectsContainer}>
                        <h1>
                            Disciplinas Matriculadas
                        </h1>
                        <div class={styles.subjectsCards}>
                            {
                                disciplinasCursando.map((disciplina) => (
                                    <div class={styles.subjectCardContainer}>
                                        <CurrentSubjectCard
                                            period={disciplina.periodo}
                                            name={disciplina.nome_disciplina}
                                            code={disciplina.codigo}
                                            hours={disciplina.carga_horaria}
                                            credits={disciplina.creditos}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div class={styles.notesContainer}>
                    <h1>
                        Anotações <ModeEdit/>
                    </h1>
                    <h2 
                        contentEditable="true"
                        onInput={(e) => onChangeAnnotation(e.target.textContent)}
                    >
                        {annotationContent}
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default Login;