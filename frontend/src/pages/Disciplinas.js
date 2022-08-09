import React from 'react';
import Sidebar from '../components/Sidebar';
import styles from './styles/Disciplinas.module.css';
import SelectableSubject from '../components/SelectableSubject';

class Disciplinas extends React.Component {
    render() {
        return (
            <div class={styles.subjectsContainer}>
                <Sidebar selectedButton="disciplinas"/>
                <div class={styles.contentContainer}>
                    <div class={styles.headerContainer}>
                        <h1>
                            Minhas Disciplinas
                        </h1>
                    </div>
                    <div class={styles.buttonsContainer}>
                        <button>Todas</button>
                        <button>Matriculadas</button>
                        <button>Aprovadas</button>
                        <button>Não realizadas</button>
                        <button>Optativas</button>
                    </div>
                    <div class={styles.subjects}>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                        <SelectableSubject checkType="status"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Disciplinas;