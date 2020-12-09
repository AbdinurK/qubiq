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
    Grid,
    Hidden,
    Menu,
    MenuItem,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
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
        fontSize: '0.8rem',
        flex: 1.2
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

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel',
];


const Header = props => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const ITEM_HEIGHT = 48;
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.header}>
                <Container maxWidth="xl">
                    <Grid container>
                        <Toolbar className={classes.innerHeader}>
                            <IconButton disableFocusRipple edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <img src={logo} className={classes.logo} alt="logo"/>
                            </IconButton>
                            <Hidden only={["md", "sm", "xs"]}>
                                <Box className={classes.menuItems} xs={{ fontSize: 12 }}>
                                    <Link to="/dashboard/171">
                                        <Typography className={classes.menuItem}>
                                            Моя страница
                                        </Typography>
                                    </Link>
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
                            </Hidden>
                            <Hidden mdUp>
                                <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu" onClick={handleClick}>
                                    <MenuIcon />
                                </IconButton>
                            </Hidden>
                            <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: ITEM_HEIGHT * 4.5,
                                        width: '20ch',
                                    },
                                }}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Toolbar>
                    </Grid>
                </Container>

            </AppBar>
        </div>
    )
};

export default Header;
