import React from 'react';
import { Button, Avatar } from '@mui/material/'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Home, Assessment, AutoGraph, DateRange, AccountTree, Logout } from '@mui/icons-material/';
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
        return (
            <ThemeProvider theme={customTheme}>
                <div class={styles.sidebarContainer}>
                    <div class={styles.avatarContainer}>
                        <Avatar 
                            alt="" 
                            src=""
                            sx={{ width: 120, height: 120, mx:'auto', border: '4px solid #6D597A' }}
                        />
                        <h1 class={styles.userName}>Lorem Ipsum</h1>
                    </div>

                    <div class={styles.buttonsGroup}>
                        <Button 
                            variant="outlined" 
                            startIcon={<Home/>}
                            sx= {{
                                    height: 45, 
                                    mb: 1, 
                                    mx:'auto', 
                                    width: 8/10, 
                                    fontSize: 14, 
                                    fontWeight: 'bold',
                                    justifyContent: "flex-start",
                                    borderRadius: 2.5,
                                    border: '1.8px solid #6D597A',
                                    '&:hover': {
                                        border: '1.8px solid #6D597A'
                                    }
                                }}
                        >
                            Início
                        </Button>

                        <Button 
                            variant="outlined" 
                            startIcon={<Assessment sx={{ fontSize: 75 }}/>}
                            sx= {{
                                    height: 45, 
                                    mb: 1, 
                                    mx:'auto', 
                                    width: 8/10, 
                                    fontSize: 14, 
                                    fontWeight: 'bold',
                                    justifyContent: "flex-start",
                                    borderRadius: 2.5,
                                    border: '1.8px solid #6D597A',
                                    '&:hover': {
                                        border: '1.8px solid #6D597A'
                                    }
                                }}
                        >
                            Minhas Disciplinas
                        </Button>

                        <Button 
                            variant="outlined" 
                            startIcon={<AutoGraph/>}
                            sx= {{
                                    height: 45, 
                                    mb: 1, 
                                    mx:'auto', 
                                    width: 8/10, 
                                    fontSize: 14, 
                                    fontWeight: 'bold',
                                    justifyContent: "flex-start",
                                    borderRadius: 2.5,
                                    border: '1.8px solid #6D597A',
                                    '&:hover': {
                                        border: '1.8px solid #6D597A'
                                    }
                                }}
                        >
                            Meu Progresso
                        </Button>

                        <Button 
                            variant="outlined" 
                            startIcon={<DateRange/>}
                            sx= {{
                                    height: 45, 
                                    mb: 1, 
                                    mx:'auto', 
                                    width: 8/10, 
                                    fontSize: 14, 
                                    fontWeight: 'bold',
                                    justifyContent: "flex-start",
                                    borderRadius: 2.5,
                                    border: '1.8px solid #6D597A',
                                    '&:hover': {
                                        border: '1.8px solid #6D597A'
                                    }
                                }}
                        >
                            Gerador de Horário
                        </Button>

                        <Button 
                            variant="outlined" 
                            startIcon={<AccountTree/>}
                            sx= {{
                                    height: 45,
                                    mx:'auto', 
                                    width: 8/10, 
                                    fontSize: 14, 
                                    fontWeight: 'bold',
                                    justifyContent: "flex-start",
                                    borderRadius: 2.5,
                                    border: '1.8px solid #6D597A',
                                    '&:hover': {
                                        border: '1.8px solid #6D597A'
                                    }
                                }}
                        >
                            Simulador de Horário
                        </Button>
                    </div>
                    
                    <div class={styles.exitButtonContainer}>
                        <Button 
                            variant="outlined" 
                            startIcon={<Logout/>}
                            sx= {{
                                    height: 45, 
                                    mb: 1, 
                                    mx:'auto', 
                                    width: 8/10, 
                                    fontSize: 14, 
                                    fontWeight: 'bold',
                                    justifyContent: "flex-start",
                                    borderRadius: 2.5,
                                    border: '1.8px solid #6D597A',
                                    '&:hover': {
                                        border: '1.8px solid #6D597A'
                                    }
                                }}
                        >
                                Sair
                        </Button>
                    </div>

                    {/* <Button variant="contained" size="large" sx={{ pt:1.5, pb:1.5, mb:2, fontWeight: 600 }}>CADASTRAR-SE</Button> */}
                </div>
            </ThemeProvider>
        )
    };
}

export default Sidebar;