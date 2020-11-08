import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    Tabs,
    Typography,
    Container,
    Box,
    Tab,
    Paper,
    Grid,
} from '@material-ui/core'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{ width: '100%' }}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: 700,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    paper: {
        padding: theme.spacing(2),
    },
    fields: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    field: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

export default function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '30px' }}>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Покупатель" {...a11yProps(0)} />
                    <Tab label="Объект" {...a11yProps(1)} />
                    <Tab label="Объект1" {...a11yProps(2)} />
                    <Tab label="Сделка" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0} style={{ backgroundColor: '#fcfcfc', width: '100%' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant="h6" className={classes.field}>
                                Контакты
                            </Typography>
                            <Paper className={classes.paper}>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                         Имя:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Марат
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Телефон:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        +77007002161
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" className={classes.field}>
                                Специалисты
                            </Typography>
                            <Paper className={classes.paper}>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Специалист:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Раушан Узакова
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Дата добавления:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        31.10.2020 в 12:54:40
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Дата изменения:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        31.10.2020 в 12:54:40
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" className={classes.field}>
                                Параметры поиска
                            </Typography>
                            <Paper className={classes.paper}>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Комнатность:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        3
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Сегмент поиска:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Нет
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Район:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Ауезовский
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Год подстройки:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        1969
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Этаж:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Первый Средний
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Тип планировки:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        ОБ УЛ
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" className={classes.field}>
                                Информация о покупателе
                            </Typography>
                            <Paper className={classes.paper}>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Инвестор:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Нет
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Бюджет:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        16.7 млн
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Тип оплаты:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Ипотека
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} style={{ backgroundColor: '#fcfcfc', width: '100%' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant="h6" className={classes.field}>
                                Параметры
                            </Typography>
                            <Paper className={classes.paper}>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Комнатность:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        2
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Площадь
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        44.0 (-) 6.0
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Год подстройки:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        1978
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Этаж:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        3 (5)
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Тип конструкции:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        панельный
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Состояние:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        хорошее
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Высота потолков:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        2.8
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Угловая:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        нет
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Бывшее общежите:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        нет
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Кухня студия:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        нет
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.field}>
                                    Об объекте
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Эксклюзив:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            нет
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            В залоге:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            нет
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Переплан:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            да
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Переплан узаконен:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            нет
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Ключь iAgent:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            14718558
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.field}>
                                    Стоимость
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Цена:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            18.0 млн тг
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Цена за м2:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            409,090 тг
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container item xs={6}>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.field}>
                                    Специалист
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Специалист:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Асель Джанбасарова
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Дата добавления:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            31.10.2020 в 18:37:20
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Дата изменения:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            31.10.2020 в 18:37:20
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.field}>
                                    Собственник
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Имя:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Гуля
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" className={classes.field}>
                                Расположение
                            </Typography>
                            <Paper className={classes.paper}>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Район:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Алмалинский
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Улица:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Ади Шарипова(Мечникова)
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Пересечение:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Макатаева
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Номер дома:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        17
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Grid container spacing={3}>
                        <Grid container spacing={3} item xs={6}>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.field}>
                                    Стоимость
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Цена:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            27.0 млн. тг
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Цена за м2:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            409,985 тг
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.field}>
                                    Параметры
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Комнатность:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            3
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Площадь:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            - ( - ) -
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Год подстройки:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            1990
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Этаж:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            4 (None)
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.field}>
                                     Собственник
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Имя:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Гульнара
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Телефон:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            +77056114828
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3} item xs={6}>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.field}>
                                    Об объекте
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Эксклюзив:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            нет
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            В залоге:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            нет
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.field}>
                                    Расположение
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Район:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Алмалинский
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Улица:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Исаева
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Пересечение:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            Гоголя
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Номер дома:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            10
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Номер квартиры:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            7
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.field}>
                                     Специалист
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Ильяс Караталов
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            -
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={3} style={{ backgroundColor: '#fcfcfc', width: '100%' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Typography variant="h6" className={classes.field}>
                                Специалисты
                            </Typography>
                            <Paper className={classes.paper}>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Со стороны продовца:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Ильяс Караталов -
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Со стороны покупателя:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Ильяс Караталов -
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Юридическое сопровождение:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        -
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Комментарий руководителя:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        -
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" className={classes.field}>
                                Сделка
                            </Typography>
                            <Paper className={classes.paper}>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Дата сделки:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        10.06.2020
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Комиссия продавца:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        0
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Комиссия покупателя:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        380000
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Сумма комиссионных:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        380,000 - Односторонная
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" className={classes.field}>
                                Задаток
                            </Typography>
                            <Paper className={classes.paper}>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Дата оформления:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        10.06.2020
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Дата истечения:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        дд.мм.гггг
                                    </Typography>
                                </Box>
                                <Box className={classes.fields}>
                                    <Typography variant="subtitle1">
                                        Сумма задатка:
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        100000
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </TabPanel>
            </div>
        </Container>
    );
}
