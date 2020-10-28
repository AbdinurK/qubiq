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
    TextField,
    Grid,
    Fade,
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
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#028946',
        borderRadius: theme.shape.borderRadius,
    },
    title: {
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
        width: '50%',
        // [theme.breakpoints.up('sm')]: {
        //     marginLeft: theme.spacing(1),
        //     width: 'auto',
        // },
    },
    btn: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
        backgroundColor: '#2A4C37',
        color: 'white',
        '&:hover': {
            backgroundColor: '#fff',
            color: 'black'
        },
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

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (event) => {
        props.onSearch(event)
    };
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleClick = () => {
        setOpen(!open);
    };

    const handleApply = () => {
        props.onApply()
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
                    <Typography className={classes.title} variant="h6" noWrap>
                        Статус:
                    </Typography>
                    <FormGroup>
                        <Select
                            className={classes.nativeInput}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="status"
                            value={props.state.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="Заявка">Заявка</MenuItem>
                            <MenuItem value="Задаток">Задаток</MenuItem>
                            <MenuItem value="Сделка">Сделка</MenuItem>
                            <MenuItem value="Срыв">Срыв</MenuItem>
                            <MenuItem value="Ожидает">Ожидает</MenuItem>
                        </Select>
                    </FormGroup>
                    <Button color="default" className={classes.btn} onClick={handleApply}>
                        Применить
                    </Button>
                    <Button color="default" variant="outlined" className={classes.btn} onClick={handleClick}>
                        Расширенный поиск
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </Button>
                </Toolbar>
                {
                    open ? <Fade in={open}>
                        <Toolbar className={classes.toolbar}>

                            <Grid direction={"row"} container>
                                <Grid item direction={"row"} alignItems={"center"} justify={"space-between"} container>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Предствитель собственника:
                                    </Typography>
                                    <FormGroup>
                                        <TextField required id="employees" className={classes.input} name="employees" onChange={handleChange}/>
                                    </FormGroup>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Предствитель покупателя:
                                    </Typography>
                                    <FormGroup>
                                        <TextField required id="standard-multiline-flexible" className={classes.input}/>
                                    </FormGroup>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Сегмент:
                                    </Typography>
                                    <TextField required id="standard-multiline-flexible" className={classes.input}/>
                                </Grid>
                                <Grid item direction={"row"} alignItems={"center"} justify={"space-between"} container>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Контакт собственника:
                                    </Typography>
                                    <FormGroup>
                                        <TextField required id="standard-multiline-flexible" className={classes.input} onChange={handleChange}/>
                                    </FormGroup>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Контакт покупателя:
                                    </Typography>
                                    <TextField required id="standard-multiline-flexible" className={classes.input}/>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Оплата:
                                    </Typography>
                                    <TextField required id="standard-multiline-flexible" className={classes.input}/>
                                </Grid>
                                <Grid item direction={"row"} alignItems={"center"} justify={"space-between"} container>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Имя собственника:
                                    </Typography>
                                    <TextField required id="standard-multiline-flexible" className={classes.input}/>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Имя покупателя:
                                    </Typography>
                                    <TextField required id="standard-multiline-flexible" className={classes.input}/>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Цена объекта:
                                    </Typography>
                                    <TextField required id="standard-multiline-flexible" className={classes.input}/>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Сумма задатка:
                                    </Typography>
                                    <TextField required id="standard-multiline-flexible" className={classes.input}/>
                                </Grid>

                                <Grid item direction={"row"} alignItems={"center"} justify={"space-between"} container>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Дата задатка:
                                    </Typography>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <ThemeProvider theme={defaultMaterialTheme}>
                                            <KeyboardDatePicker
                                                variant="inline"
                                                format="MM/dd/yyyy"
                                                margin="normal"
                                                id="date-picker-a"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </ThemeProvider>
                                    </MuiPickersUtilsProvider>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Дата завершения задатка:
                                    </Typography>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-b"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Дата сделки:
                                    </Typography>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-c"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
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
