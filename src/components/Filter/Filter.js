import React from "react";
import 'date-fns';
import {
    AppBar,
    Toolbar,
    InputBase,
    Typography,
    Button,
    Select,
    MenuItem,
    Grid,
    Fade,
    Box,
    FormGroup
} from "@material-ui/core"
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import SearchIcon from '@material-ui/icons/Search';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { fade, makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        position: 'relative'
    },
    appBar: {
        backgroundColor: '#028946',
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden'
    },
    title: {
        color: '#fff',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        marginRight: theme.spacing(2)
    },
    nativeInput: {
        marginLeft: theme.spacing(1),
        color: 'inherit',
        borderColor: 'white',
        background: 'none',
        width: '100px'
    },
    search: {
        marginRight: theme.spacing(2),
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '60%',
    },
    btn: {
        flexGrow: 1,
        maxWidth: '150px',
        marginLeft: theme.spacing(2),
        backgroundColor: '#2A4C37',
        color: 'white',
        '&:hover': {
            backgroundColor: '#fff',
            color: 'black'
        },
        fontSize: '0.6rem'
    },
    extend: {
        flexGrow: 1,
        maxWidth: '200px',
        marginLeft: theme.spacing(2),
        backgroundColor: '#2A4C37',
        color: 'white',
        '&:hover': {
            backgroundColor: '#fff',
            color: 'black'
        },
        fontSize: '0.6rem'
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolbar: {
        paddingBottom: theme.spacing(1),
        position: 'relative'
    },
    input: {
        '& .MuiInput-input': {
            color: 'white',
        },
        marginRight: theme.spacing(1),
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        flexGrow: 1,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const defaultMaterialTheme = createMuiTheme({
    color: 'white'
});


const Filter = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleChange = (event) => {
        props.onSearch(event)
    };
    const handleDepDateChange = (date) => {
        props.onDepDateChange(date)
    };

    const handleExpDateChange = (date) => {
        props.onExpDateChange(date)
    };

    const handleDealDateChange = (date) => {
        props.onDealDateChange(date)
    };

    const handleClick = () => {
        setOpen(!open);
    };

    const handleApply = () => {
        props.onApply();
        props.onUsed(true)
    };

    const onReset = () => {
        props.onReset();
        props.onUsed(false)
    };


    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Поиск:
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <FormGroup>
                            <InputBase
                                name="name"
                                autoFocus={false}
                                value={props.state.name}
                                onChange={handleChange}
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'поиск' }}
                            />
                        </FormGroup>
                    </div>
                    <Button color="default" disabled={props.apply} className={classes.btn} onClick={handleApply}>
                        <Typography variant="caption">
                            Применить
                        </Typography>
                    </Button>
                    <Button color="default" variant="outlined" className={classes.btn} onClick={onReset}>
                        <Typography variant="caption">
                            Сбросить
                        </Typography>
                    </Button>
                    <Button color="default" variant="outlined" className={classes.extend} onClick={handleClick}>
                        <Typography variant="srOnly">
                            Расширенный поиск
                        </Typography>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </Button>
                </Toolbar>
                {
                    open ? <Fade in={open}>
                        <Toolbar className={classes.toolbar}>

                            <Grid direction={"row"} container>
                                <Grid item direction={"row"} alignItems={"center"} justify={"space-between"} wrap={"wrap"} container>
                                    <Box>
                                        <Typography aria-label="transaction" className={classes.title} variant="body1" noWrap>
                                            Оплата:
                                        </Typography>
                                        <FormGroup>
                                            <Select
                                                className={classes.nativeInput}
                                                labelId="transaction"
                                                id="payment"
                                                name="payment"
                                                value={props.state.payment}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="Наличные">Наличные</MenuItem>
                                                <MenuItem value="Ипотека">Ипотека</MenuItem>
                                            </Select>
                                        </FormGroup>
                                    </Box>

                                    <Box>
                                        <Typography aria-label="status" className={classes.title} variant="body2" noWrap>
                                            Статус:
                                        </Typography>
                                        <FormGroup>
                                            <Select
                                                className={classes.nativeInput}
                                                labelId="status"
                                                id="status"
                                                name="status"
                                                value={props.state.status}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value="Заявка">Заявка</MenuItem>
                                                <MenuItem value="Задаток">Задаток</MenuItem>
                                                <MenuItem value="Сделка">Сделка</MenuItem>
                                                <MenuItem value="Срыв 1">Срыв 1</MenuItem>
                                                <MenuItem value="Срыв 2">Срыв 2</MenuItem>
                                                <MenuItem value="Срыв 3">Срыв 3</MenuItem>
                                                <MenuItem value="Ожидает">Не оплачено</MenuItem>
                                            </Select>
                                        </FormGroup>
                                    </Box>

                                    <Box>
                                        <Typography className={classes.title} variant="body1" noWrap>
                                            Дата задатка от:
                                        </Typography>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <ThemeProvider theme={defaultMaterialTheme}>
                                                <FormGroup>
                                                    <KeyboardDatePicker
                                                        variant="inline"
                                                        format="dd.MM.yyyy"
                                                        margin="normal"
                                                        name="dep_date"
                                                        id="dep_date"
                                                        value={props.state.dep_date}
                                                        onChange={handleDepDateChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                    />
                                                </FormGroup>
                                            </ThemeProvider>
                                        </MuiPickersUtilsProvider>
                                    </Box>

                                    <Box>
                                        <Typography className={classes.title} variant="body1" noWrap>
                                            до:
                                        </Typography>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <FormGroup>
                                                <KeyboardDatePicker
                                                    variant="inline"
                                                    format="dd.MM.yyyy"
                                                    margin="normal"
                                                    name="advances2"
                                                    id="advances-b"
                                                    value={props.state.exp_date}
                                                    onChange={handleExpDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </FormGroup>
                                        </MuiPickersUtilsProvider>
                                    </Box>

                                    <Box>
                                        <Typography className={classes.title} variant="body1" noWrap>
                                            Дата сделки:
                                        </Typography>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <FormGroup>
                                                <KeyboardDatePicker
                                                    variant="inline"
                                                    format="dd.MM.yyyy"
                                                    margin="normal"
                                                    id="transaction"
                                                    value={props.state.transaction}
                                                    onChange={handleDealDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </FormGroup>
                                        </MuiPickersUtilsProvider>
                                    </Box>
                                    <Box>
                                        <Button onClick={props.handleExport} className={classes.btn} variant="contained" color="primary">
                                            Экспорт
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>

                        </Toolbar>
                    </Fade>: null
                }
            </AppBar>
        </div>
    )
};


export default Filter
