import React from 'react';
import Sidebar from '../components/Sidebar';
import styles from './styles/Home.module.css';
import { ModeEdit } from '@mui/icons-material/';
import ProgressCard from '../components/ProgressCard';
import CurrentSubjectCard from '../components/CurrentSubjectCard';

class Login extends React.Component {
    render() {
        return (
            <div class={styles.homeContainer}>
                <Sidebar/>
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
                                <ProgressCard/>
                            </span>
                            <span>
                                <ProgressCard/>
                            </span>
                            <span>
                                <ProgressCard/>
                            </span>
                        </div>
                        <div class={styles.subjectsContainer}>
                            <h1>
                                Matriculadas
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
}

export default Login;