import React from 'react';
import Sidebar from '../components/Sidebar';
import { ModeEdit } from '@mui/icons-material/';
import { Star, Circle, Work } from '@mui/icons-material/';
import { Navigate } from 'react-router-dom';
import ProgressCard from '../components/ProgressCard';
import CurrentSubjectCard from '../components/CurrentSubjectCard';

import styles from './styles/Home.module.css';

const Login = () =>{
    let userLoggedIn = false;

    const checkLoggedUser = () => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");

        if(!loggedUser)
            return;
        
        const parsedUser = JSON.parse(loggedUser);
        userLoggedIn = parsedUser && parsedUser.email && parsedUser.nome;
    }

    checkLoggedUser();
    if(!userLoggedIn) {
        return (
            <Navigate to="/login"/>
        )
    }

    return (
        <div class={styles.homeContainer}>
            <Sidebar selectedButton="home"/>
            <div class={styles.contentContainer}>
                <div class={styles.mainContentContainer}>
                    <div class={styles.headerContainer}>
                        <h1>
                            Olá, Aluno
                        </h1>
                        <h1>
                            2022
                        </h1>
                    </div>
                    <div class={styles.cardsContainer}>
                        <span>
                            <ProgressCard 
                                cardIcon={<Star sx={{margin:'auto', color:'#404040'}}/>}
                                backgroundIcon={<Star sx={{margin:'auto', color:'#D0D0FB'}}/>}
                                backgroundColor = '#E4E4FC'
                                darkerColor = '#D0D0FB'
                                barColor = '#7E67DA'
                            />
                        </span>
                        <span>
                            <ProgressCard 
                                cardIcon={<Circle sx={{margin:'auto', color:'#404040'}}/>}
                                backgroundIcon={<Circle sx={{margin:'auto', color:'#CBDFF2'}}/>}
                                backgroundColor = '#E9F5FE'
                                darkerColor = '#CBDFF2'
                                barColor = '#7EAACB'
                            />
                        </span>
                        <span>
                            <ProgressCard 
                                cardIcon={<Work sx={{margin:'auto', color:'#404040'}}/>}
                                backgroundIcon={<Work sx={{margin:'auto', color:'#F2D4CB'}}/>}
                                backgroundColor = '#FEF1E9'
                                darkerColor = '#F2D4CB'
                                barColor = '#CB9A7E'
                            />
                        </span>
                    </div>
                    <div class={styles.subjectsContainer}>
                        <h1>
                            Disciplinas Matriculadas
                        </h1>
                        <div class={styles.subjectsCards}>
                            <div class={styles.subjectCardContainer}>
                                <CurrentSubjectCard/>
                            </div>
                            <div class={styles.subjectCardContainer}>
                                <CurrentSubjectCard/>
                            </div>
                            <div class={styles.subjectCardContainer}>
                                <CurrentSubjectCard/>
                            </div>
                            <div class={styles.subjectCardContainer}>
                                <CurrentSubjectCard/>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class={styles.notesContainer}>
                    <h1>
                        Anotações <ModeEdit/>
                    </h1>
                    <h2 contentEditable="true">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at magna et tortor imperdiet placerat. Pellentesque massa diam, faucibus id lectus ut, dignissim tristique felis.
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default Login;