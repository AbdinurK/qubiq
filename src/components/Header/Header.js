import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Container,
    Grid
} from '@material-ui/core'
import logo from './logo.png'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
        flexGrow: 1,
        maxHeight: 70,
    },
    header: {
        backgroundColor: '#F8F9FA'
    },
    innerHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 0,
        width: '100%'
    },
    menuButton: {
      padding: '5px',
      flex: 0.1
    },
      logo: {
          width: '120px'
      },
    menuItems: {
        color: '#000000',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.8rem'
    },
    menuItem: {
        fontSize: '0.8rem',
        textAlign: 'center'
    },
    title: {
      flexGrow: 1,
    },
    btn: {
        color: '#000000',
        flex: 0.1
    }
  }),
);



const Header = props => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.header}>
                <Container maxWidth="xl">
                    <Grid container>
                        <Toolbar className={classes.innerHeader}>
                            <IconButton disableFocusRipple edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <img src={logo} className={classes.logo} alt="logo"/>
                            </IconButton>
                            <Box className={classes.menuItems} xs={{ fontSize: 12 }}>
                                <Typography className={classes.menuItem}>
                                    Моя страница
                                </Typography>
                                <Typography className={classes.menuItem}>
                                    Директория HR
                                </Typography>
                                <Typography className={classes.menuItem}>
                                    База знаний
                                </Typography>
                                <Typography className={classes.menuItem}>
                                    Просмотры
                                </Typography>
                                <Typography className={classes.menuItem}>
                                    Объекты
                                </Typography>
                                <Typography className={classes.menuItem}>
                                    Покупатели
                                </Typography>
                                <Typography className={classes.menuItem}>
                                    Заявки на задаток
                                </Typography>
                                <Link to="/deals">
                                    <Typography className={classes.menuItem}>
                                        Сделки
                                    </Typography>
                                </Link>
                                <Typography className={classes.menuItem}>
                                    Показы
                                </Typography>
                                <Typography className={classes.menuItem}>
                                    Отправка в черновики
                                </Typography>
                                <Typography className={classes.menuItem}>
                                    Модерация
                                </Typography>
                                <Typography className={classes.menuItem}>
                                    Контакты
                                </Typography>
                                <Typography className={classes.menuItem}>
                                    Заявки
                                </Typography>
                            </Box>
                            <Button color="inherit" className={classes.btn}>
                                <Typography className={classes.menuItem}>
                                    Выход
                                </Typography>
                            </Button>
                        </Toolbar>
                    </Grid>
                </Container>

            </AppBar>
        </div>
    )
};

export default Header;
