import React from 'react';
import { Button, Avatar } from '@mui/material/'
import { Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home, Assessment, AutoGraph, Logout } from '@mui/icons-material/';
import styles from './styles/Sidebar.module.css'

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

const Sidebar = (props) => {
    const navigate = useNavigate();
    const loggedUser = window.sessionStorage.getItem("loggedUser");
    const nome_aluno = JSON.parse(loggedUser).nome;
    let buttonStyle = {
        height: 45, 
        mb: 1, 
        mx:'auto', 
        width: 8/10, 
        fontSize: 14, 
        fontWeight: 'bold',
        justifyContent: "flex-start",
        borderRadius: 2.5,
        border: '0px solid #6D597A',
        '&:hover': {
            border: '0px solid #6D597A'
        }
    };

    let selectedButton = props.selectedButton;

    const onClickExit = () => {
        window.sessionStorage.setItem("loggedUser", "");
        navigate("/login", {replace: true});
    }

    return (
        <ThemeProvider theme={customTheme}>
            <div className={styles.sidebarContainer}>
                <div className={styles.upperContainer}>
                    <div className={styles.avatarContainer}>
                        <Avatar 
                            alt="" 
                            src={process.env.PUBLIC_URL + '/profile_pic_default.svg'}
                            sx={{ width: 120, height: 120, mx:'auto', border: '4px solid #6D597A' }}
                        />
                        <h1 className={styles.userName}>{nome_aluno}</h1>
                    </div>
                    
                    <div className={styles.buttonsGroup}>
                        <Button 
                            component={ Link }
                            to="/home"
                            variant={(selectedButton === 'home' ? "contained" : "outlined")}
                            startIcon={<Home/>}
                            sx= { buttonStyle }
                        >
                            Início
                        </Button>

                        <Button 
                            component={ Link }
                            to="/disciplinas"
                            variant={(selectedButton === 'disciplinas' ? "contained" : "outlined")}
                            startIcon={<Assessment sx={{ fontSize: 75 }}/>}
                            sx= { buttonStyle }
                        >
                            Minhas Disciplinas
                        </Button>

                        <Button 
                            component={ Link }
                            to="/progresso"
                            variant={(selectedButton === 'progresso' ? "contained" : "outlined")}
                            startIcon={<AutoGraph/>}
                            sx= { buttonStyle }
                        >
                            Meu Progresso
                        </Button>

                        {/* <Button 
                            component={ Link }
                            to="/simulador"
                            variant={(selectedButton === 'simulador' ? "contained" : "outlined")}
                            startIcon={<DateRange/>}
                            sx= { buttonStyle }
                        >
                            Simulador de Horário
                        </Button> */}
                    </div>

                </div>
                
                <div className={styles.exitButtonContainer}>
                    <Button 
                        component={ Link }
                        to="/login"
                        variant="outlined" 
                        startIcon={<Logout/>}
                        sx= { buttonStyle }
                        onClick={() => onClickExit()}
                    >
                            Sair
                    </Button>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default Sidebar;