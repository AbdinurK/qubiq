import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from '@material-ui/core/CardContent';
import CardHeader from "@material-ui/core/CardHeader";
import Container from '@material-ui/core/Container';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Switch from '@material-ui/core/Switch';
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import avatar from "./avatar.png"
import {Box} from "@material-ui/core";
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
    },
    media: {
        height: '200px',
        width: '200px',
    },
    container: {
        maxWidth: '1140px',
        marginTop: '40px'
    },
    header: {
        backgroundColor: '#F7F7F7',
        listStyle: 'none',
    },
    cardHeader: {
        minWidth: '200px'
    },
    cardHeaders: {
        marginLeft: '16px'
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'row',
    },
    title: {
        fontSize: 14,
    },
    divider: {
        marginLeft: '16px'
    },
    data: {
        marginLeft: '16px'
    },
    divider1: {
        margin: '16px 0'
    },
    number: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    actions: {
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'space-between',
    }
}));

const UserCard = props => {
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
    });
    const [data, setData] = React.useState({})
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/employees/156')
            .then(res => setData(res.data))
    }, [])
    const { checkedA, checkedB } = state;
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Модератор' },
        { key: 2, label: 'Сотрудник' },
    ]);
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Card className={classes.root} variant="outlined">
                <Grid container alignItems="center" className={classes.header}>
                    <CardHeader
                        title={`${data.name} ${data.surname}`}
                        className={classes.cardHeader}
                    />
                    <Divider orientation="vertical" flexItem/>
                    <Typography variant="button" className={classes.cardHeaders}>
                        ДОЛЖНОСТЬ:
                    </Typography>
                    {chipData.map((data) => {
                        let icon;

                        return (
                            <li key={data.key} className={classes.cardHeaders}>
                                <Chip
                                    icon={icon}
                                    label={data.label}
                                    onDelete={handleDelete(data)}
                                    className={classes.chip}
                                    color={"primary"}
                                />
                            </li>
                        );
                    })}
                    <Divider orientation="vertical" flexItem className={classes.cardHeaders}/>
                    <Typography variant="button" className={classes.cardHeaders}>
                        СТАТУС:
                    </Typography>
                    <Chip label="Активен" variant="outlined" color={"secondary"} className={classes.cardHeaders}/>
                    <Divider orientation="vertical" flexItem className={classes.cardHeaders}/>
                    <Typography variant="button" className={classes.cardHeaders}>
                        Номер пакета:
                    </Typography>
                    <Typography variant="subtitle1" className={classes.cardHeaders}>
                       79
                    </Typography>
                </Grid>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Paper variant="outlined" className={classes.media}>
                                <CardMedia
                                    className={classes.media}
                                    image={avatar}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs className={classes.data} container direction="row">
                                    <Box>
                                        <Grid item>
                                            <Typography variant="h5">
                                                Личные данные
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Дата Рождения:
                                                25.09.2020
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Дата приема на работу:
                                                25.09.2020
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Отделение:
                                            </Typography>
                                        </Grid>
                                        <Divider orientation="horizontal" className={classes.divider1}/>
                                        <Grid item xs>
                                            <Typography variant="h5">
                                                База Qubiq
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Логин:
                                                +77000000000
                                            </Typography>
                                            <Button size={"small"} variant="contained" color="default">
                                                Изменить пароль
                                            </Button>
                                        </Grid>
                                    </Box>
                                    <Divider orientation="vertical" flexItem className={classes.data}/>
                                    <Grid item className={classes.data}>
                                        <Typography variant="h5">
                                            Номера для подачи
                                        </Typography>
                                        <Grid direction="row" container>
                                            <Grid item>
                                                <Box>
                                                    <Typography variant="subtitle1">
                                                        Телефон:
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        Телефон: Xiaomi Redmi 5A
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        Серийный номер телефона: 231a3d1d7d05
                                                    </Typography>
                                                </Box>
                                                <Divider orientation="horizontal" className={classes.divider1}/>
                                                <Box>
                                                    <Typography variant="subtitle1">
                                                        Gmail:
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        Логин: QubiqPhones@gmail.com
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        Пароль: -
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Divider orientation="vertical"/>
                                            <Grid item className={classes.data}>
                                                <Box>
                                                    <Typography variant="subtitle1">
                                                        iAgent:
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        Логин: 58@qubiq.kz
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        Пароль: 123456
                                                    </Typography>
                                                </Box>
                                                <Divider orientation="horizontal" className={classes.divider1}/>
                                                <Box>
                                                    <Typography variant="subtitle1">
                                                        Krisha:
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        Логин: g.abdurahvaqubiq@yandex.kz
                                                    </Typography>
                                                    <Typography variant="subtitle2">
                                                        Пароль: 123456
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider orientation="horizontal" className={classes.divider1}/>
                <CardActions className={classes.actions}>
                    <Box className={classes.number}>
                        <Box>
                            <Typography variant="subtitle1">
                                Номер телефона:
                            </Typography>
                            <Typography variant="subtitle1">
                                ID сим карты:
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" className={classes.data} gutterBottom>
                                87717533485
                            </Typography>
                            <Typography variant="subtitle2" className={classes.data}>
                                899970156097072176
                            </Typography>
                        </Box>
                    </Box>
                    <FormGroup className={classes.cardActions}>
                        <FormControlLabel
                            control={<Switch checked={state.checkedA} size="small" onChange={handleChange} name="checkedA" />}
                            label="Снять статус модератора"
                        />
                        <FormControlLabel
                            control={<Switch checked={state.checkedB} size="small" onChange={handleChange} name="checkedB" />}
                            label="Уведомление о задатках"
                        />
                        <Divider orientation="vertical"/>
                        <Button variant="contained" color="primary" disabled={!checkedB || !checkedA}>
                            Сохранить
                        </Button>
                    </FormGroup>
                </CardActions>
            </Card>
        </Container>
    );
};

export default UserCard;
