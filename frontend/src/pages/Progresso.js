import React from 'react';
import Sidebar from '../components/Sidebar';
import styles from './styles/Progresso.module.css';
import EditableProgress from '../components/EditableProgress';
// import { IconButton } from '@mui/material';
// import { Add } from '@mui/icons-material';


class Disciplinas extends React.Component {
    render() {
        return (
            <div class={styles.progressContainer}>
                <Sidebar selectedButton="progresso"/>
                <div class={styles.contentContainer}>
                    <div class={styles.headerContainer}>
                        <h1>
                            Meu Progresso
                        </h1>
                    </div>
                    <div class={styles.buttonsContainer}>
                        <button>Atividades Complementares</button>
                        <button>Atividades de Extensão</button>
                        <button>Estágio Supervisionado</button>
                    </div>
                    <div class={styles.progress}>
                        <EditableProgress/>
                        <EditableProgress/>
                        <EditableProgress/>
                        <EditableProgress/>
                        <EditableProgress/>
                        <EditableProgress/>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Disciplinas;