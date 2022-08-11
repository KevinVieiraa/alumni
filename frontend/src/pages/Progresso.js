import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import styles from './styles/Progresso.module.css';
import EditableProgress from '../components/EditableProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextField, MenuItem, Select, Button } from '@mui/material/';
import { Add, Close } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom';
import { useEffectOnce } from '../components/UseEffectOnce';
import { API_BASE_URL } from '../config';

const customTheme = createTheme({
    palette: {
        primary: {
            main: "#6D597A",
        }
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    }
});

let newSubjectButtonStyle = {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
    fontSize: 14,
    fontWeight: 'bold',
    justifyContent: "center",
    'border-radius': 100
};

const Progresso = () => {
    const [selectedActivityType, setSelectedActivityType] = useState("Atividades Complementares");
    const [selectedActivities, setSelectedActivities] = useState([]);

    const [newActivityTitle, setNewActivityTitle] = useState("");
    const [newActivityPlace, setNewActivityPlace] = useState("");
    const [newActivityHours, setNewActivityHours] = useState("");
    const [newActivityType, setNewActivityType] = useState("Atividade Complementar");
    const [newActivityStartDate, setNewActivityStartDate] = useState("");
    const [newActivityEndDate, setNewActivityEndDate] = useState("");
    const [windowOpen, setWindowOpen] = useState(false);

    const navigate = useNavigate();

    const checkLoggedUser = () => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");

        if (!loggedUser) {
            navigate("/login", { replace: true });
            return;
        }

        const parsedUser = JSON.parse(loggedUser);
        const userLoggedIn = parsedUser && parsedUser.email && parsedUser.nome;
        if (!userLoggedIn) {
            navigate("/login", { replace: true });
        }
    }

    const getActivies = async (category) => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");
        const base_url = API_BASE_URL;
        const parameters = "/atividade/?id_aluno=" + JSON.parse(loggedUser).id_aluno + "&categoria=" + category;

        let response = await fetch(base_url + parameters);
        let result = await response.json();

        setSelectedActivities(result);
        // setSelectedActivities(result.disciplinas.sort((a, b) => a.periodo - b.periodo));
    };

    const onChildClickDelete = async (id) => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");
        const base_url = API_BASE_URL;
        const parameters = "/atividade/deleteAtividade?id_aluno=" + JSON.parse(loggedUser).id_aluno + "&id_atividade=" + id;

        // eslint-disable-next-line
        let response = await fetch(base_url + parameters, {
            method: "DELETE"
        });
        

        let mapCategories = {
            "Atividades Complementares": "c",
            "Estágio Supervisionado": "s",
            "Atividades de Extensão": "e"
        }
        getActivies(mapCategories[selectedActivityType]);
    }

    const onClickNewActivity = () => {
        setWindowOpen(true);
    }

    const onClickCloseActivity = () => {
        setWindowOpen(false);
    }

    const onChangeActivityFilter = (value) => {
        let mapCategories = {
            "Atividades Complementares": "c",
            "Estágio Supervisionado": "s",
            "Atividades de Extensão": "e"
        }
        setSelectedActivityType(value);
        getActivies(mapCategories[value]);
    }

    const onClickCreateActivity = async () => {
        const loggedUser = window.sessionStorage.getItem("loggedUser");
        const base_url = API_BASE_URL;

        let mapCategories = {
            "Atividades Complementares": "c",
            "Estágio Supervisionado": "s",
            "Atividades de Extensão": "e"
        }

        const parameters = "/atividade/criarAtividade?id_aluno=" + JSON.parse(loggedUser).id_aluno + "&titulo=" + newActivityTitle + "&categoria=" + mapCategories[newActivityType]+ "&local=" + newActivityPlace + "&carga_horaria=" + newActivityHours+ "&data_inicio=" + newActivityStartDate+ "&data_fim=" + newActivityEndDate;

        // eslint-disable-next-line
        let response = await fetch(base_url + parameters, {
            method: "POST"
        });

        setNewActivityTitle("");
        setNewActivityPlace("");
        setNewActivityHours("");
        setNewActivityType("Atividade Complementar");
        setNewActivityStartDate("");
        setNewActivityEndDate("");
        onClickCloseActivity();
        getActivies(mapCategories[selectedActivityType]);
    }

    useEffectOnce(() => {
        checkLoggedUser();
        getActivies("c");
    });

    let windowComponent = <div className={styles.newActivityContainer}>
        <div className={styles.activityFormsContainer}>
            <div className={styles.closeButtonContainer}>
                <Button
                    sx={newSubjectButtonStyle}
                    onClick={() => onClickCloseActivity()}
                >
                    <Close sx={{ margin: 0, padding: 0, transform: 'scale(1.1)' }} />
                </Button>
            </div>
            <h1>Nova Atividade</h1>
            <TextField
                required
                variant="standard"
                label="Titulo"
                type="text"
                value={newActivityTitle}
                onChange={(e) => setNewActivityTitle(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                required
                variant="standard"
                label="Local"
                type="text"
                value={newActivityPlace}
                onChange={(e) => setNewActivityPlace(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                required
                variant="standard"
                label="Carga Horária"
                type="text"
                value={newActivityHours}
                onChange={(e) => setNewActivityHours(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Select
                select
                required
                label="Categoria"
                value={newActivityType}
                onChange={(e) => setNewActivityType(e.target.value)}
                variant="standard"
                sx={{ mb: 2 }}
            >
                <MenuItem key={"Atividades Complementares"} value={"Atividades Complementares"}>
                    {"Atividades Complementares"}
                </MenuItem>
                <MenuItem key={"Estágio Supervisionado"} value={"Estágio Supervisionado"}>
                    {"Estágio Supervisionado"}
                </MenuItem>
                <MenuItem key={"Atividades de Extensão"} value={"Atividades de Extensão"}>
                    {"Atividades de Extensão"}
                </MenuItem>
            </Select>
            <div className={styles.datesContainer}>
                <TextField
                    required
                    variant="standard"
                    label="Data de Início"
                    type="date"
                    value={newActivityStartDate}
                    onChange={(e) => setNewActivityStartDate(e.target.value)}
                    sx={{ mb: 2, width: '45%' }}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    required
                    variant="standard"
                    label="Data de Fim"
                    type="date"
                    value={newActivityEndDate}
                    onChange={(e) => setNewActivityEndDate(e.target.value)}
                    sx={{ mb: 2, width: '45%' }}
                    InputLabelProps={{ shrink: true }}
                />
            </div>
            <Button
                variant="contained"
                size="large"
                sx={{ pt: 1.5, pb: 1.5, mt: 2, fontWeight: 600 }}
                onClick={() => onClickCreateActivity()}
            >
                CRIAR
            </Button>
        </div>
    </div>

    return (
        <ThemeProvider theme={customTheme}>
            <div className={styles.progressContainer}>
                <Sidebar selectedButton="progresso" />
                <div className={styles.contentContainer}>
                    <div className={styles.headerContainer}>
                        <h1>
                            Meu Progresso
                        </h1>
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button style={selectedActivityType === "Atividades Complementares" ? {'color': '#404040'} : {}} value={"Atividades Complementares"} onClick={(e) => {onChangeActivityFilter("Atividades Complementares")}}>Atividades Complementares</button>
                        <button style={selectedActivityType === "Atividades de Extensão" ? {'color': '#404040'} : {}} value={"Atividades de Extensão"} onClick={(e) => {onChangeActivityFilter("Atividades de Extensão")}}>Atividades de Extensão</button>
                        <button style={selectedActivityType === "Estágio Supervisionado" ? {'color': '#404040'} : {}} value={"Estágio Supervisionado"} onClick={(e) => {onChangeActivityFilter("Estágio Supervisionado")}}>Estágio Supervisionado</button>
                    </div>
                    <div className={styles.progress}>
                        {
                            selectedActivities.map((activity) => (
                                <EditableProgress 
                                    activityId={activity.id_atividade}
                                    name={activity.titulo}
                                    description={activity.local}
                                    hours={activity.carga_horaria}
                                    startDate={activity.data_inicio}
                                    endDate={activity.data_fim}
                                    onClickDelete={onChildClickDelete}
                                />
                            ))
                        }
                    </div>
                    <div className={styles.newActivityButtonContainer}>
                        <Button
                            variant="contained"
                            sx={newSubjectButtonStyle}
                            onClick={() => onClickNewActivity()}
                        >
                            <Add sx={{ margin: 0, padding: 0, transform: 'scale(1.5)' }} />
                        </Button>
                    </div>
                </div>
                {windowOpen ? windowComponent : <></>}
            </div>
        </ThemeProvider>
    )
}

export default Progresso;