import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Box from "@material-ui/core/Box";
import logo from './logo.png'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    header: {
        backgroundColor: '#F8F9FA'
    },
    innerHeader: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      padding: '5px',
      flex: 0.1
    },
      logo: {
          width: '140px'
      },
    menuItems: {
        color: '#000000',
        display: 'flex',
        justifyContent: 'space-between',
        flex: 1.5
    },
    menuItem: {
        fontSize: '14px'
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
                <Toolbar className={classes.innerHeader}>
                    <IconButton disableFocusRipple edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <img src={logo} className={classes.logo} alt="logo"/>
                    </IconButton>
                    <Box className={classes.menuItems}>
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
                        <Typography className={classes.menuItem}>
                            Сделки
                        </Typography>
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
            </AppBar>
        </div>
    )
}

export default Header;
