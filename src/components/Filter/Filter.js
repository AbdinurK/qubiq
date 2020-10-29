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
    reset: {
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

    const handleChange = (event) => {
        props.onSearch(event)
    };
    const handleDateChange = (date) => {
        props.onDateChange(date)
    };
    const handleClick = () => {
        setOpen(!open);
    };

    const handleApply = () => {
        props.onApply()
    };

    const onReset = () => {
        props.onReset()
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
                                        <TextField required id="employees1" value={props.state.employees} className={classes.input} name="employees" onChange={handleChange}/>
                                    </FormGroup>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Предствитель покупателя:
                                    </Typography>
                                    <FormGroup>
                                        <TextField required id="employees2" value={props.state.employees} className={classes.input} name="employees" onChange={handleChange}/>
                                    </FormGroup>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Сегмент:
                                    </Typography>
                                    <FormGroup>
                                        <TextField required id="address" value={props.state.address} className={classes.input} name="address" onChange={handleChange}/>
                                    </FormGroup>
                                </Grid>
                                <Grid item direction={"row"} alignItems={"center"} justify={"space-between"} container>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Контакт собственника:
                                    </Typography>
                                    <FormGroup>
                                        <TextField required id="contact1" className={classes.input} name="contacts" onChange={handleChange}/>
                                    </FormGroup>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Контакт покупателя:
                                    </Typography>
                                    <FormGroup>
                                        <TextField required id="contact2" className={classes.input} name="contacts" onChange={handleChange}/>
                                    </FormGroup>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Оплата:
                                    </Typography>
                                    <FormGroup>
                                        <TextField required id="transaction" name="price" className={classes.input} value={props.state.price} onChange={handleChange}/>
                                    </FormGroup>
                                </Grid>
                                <Grid item direction={"row"} alignItems={"center"} justify={"space-between"} container>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Имя собственника:
                                    </Typography>
                                    <FormGroup>
                                        <TextField required id="deal1" className={classes.input} name="deal" onChange={handleChange}/>
                                    </FormGroup>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Имя покупателя:
                                    </Typography>
                                    <FormGroup>
                                        <TextField required id="deal2" className={classes.input} name="deal" onChange={handleChange}/>
                                    </FormGroup>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Цена объекта:
                                    </Typography>
                                    <FormGroup>
                                        <TextField required id="price" name="price" className={classes.input} onChange={handleChange}/>
                                    </FormGroup>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Сумма задатка:
                                    </Typography>
                                    <FormGroup>
                                        <TextField required id="deposit" value={props.state.deposit} name="deposit" className={classes.input} onChange={handleChange}/>
                                    </FormGroup>
                                </Grid>

                                <Grid item direction={"row"} alignItems={"center"} justify={"space-between"} container>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Дата задатка от:
                                    </Typography>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <ThemeProvider theme={defaultMaterialTheme}>
                                            <FormGroup>
                                                <KeyboardDatePicker
                                                    variant="inline"
                                                    format="yyyy-MM-dd"
                                                    margin="normal"
                                                    name="advances1"
                                                    id="advances1"
                                                    value={props.state.advances}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            </FormGroup>
                                        </ThemeProvider>
                                    </MuiPickersUtilsProvider>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        до:
                                    </Typography>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <FormGroup>
                                            <KeyboardDatePicker
                                                variant="inline"
                                                format="yyyy-MM-dd"
                                                margin="normal"
                                                name="advances2"
                                                id="date-picker-b"
                                                value={props.state.advances}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </FormGroup>
                                    </MuiPickersUtilsProvider>
                                    <Typography className={classes.title} variant="body1" noWrap>
                                        Дата сделки:
                                    </Typography>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <FormGroup>
                                            <KeyboardDatePicker
                                                variant="inline"
                                                format="yyyy-MM-dd"
                                                margin="normal"
                                                id="transaction_date"
                                                vvalue={props.state.advances}
                                                onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </FormGroup>
                                    </MuiPickersUtilsProvider>
                                    <Button color="default" className={classes.reset} onClick={onReset}>
                                        Сбросить
                                    </Button>
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
