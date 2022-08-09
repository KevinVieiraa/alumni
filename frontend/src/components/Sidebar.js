import React from 'react';
import { Button, Avatar } from '@mui/material/'
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home, Assessment, AutoGraph, DateRange, Logout } from '@mui/icons-material/';
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

class Sidebar extends React.Component {
    render() {
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

        let selectedButton = this.props.selectedButton;

        return (
            <ThemeProvider theme={customTheme}>
                <div class={styles.sidebarContainer}>
                    <div class={styles.upperContainer}>
                        <div class={styles.avatarContainer}>
                            <Avatar 
                                alt="" 
                                src={process.env.PUBLIC_URL + '/profile_pic_default.svg'}
                                sx={{ width: 120, height: 120, mx:'auto', border: '4px solid #6D597A' }}
                            />
                            <h1 class={styles.userName}>Lorem Ipsum</h1>
                        </div>
                        
                        <div class={styles.buttonsGroup}>
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

                            <Button 
                                component={ Link }
                                to="/simulador"
                                variant={(selectedButton === 'simulador' ? "contained" : "outlined")}
                                startIcon={<DateRange/>}
                                sx= { buttonStyle }
                            >
                                Simulador de Horário
                            </Button>
                        </div>

                    </div>
                    
                    <div class={styles.exitButtonContainer}>
                        <Button 
                            component={ Link }
                            to="/login"
                            variant="outlined" 
                            startIcon={<Logout/>}
                            sx= { buttonStyle }
                        >
                                Sair
                        </Button>
                    </div>
                </div>
            </ThemeProvider>
        )
    };
}

export default Sidebar;