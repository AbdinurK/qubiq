import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { DatePicker } from 'antd';
import {
    Tabs,
    Typography,
    Container,
    Box,
    Tab,
    Paper,
    Grid,
    Button,
} from '@material-ui/core'
import moment from "moment";
import axios from 'axios'
import Header from "../../components/Header/Header";

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
        flexDirection: 'column',
        height: '100%',
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

export default function DealCard(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [deal, setDeal] = useState(null)
    const [formData, setFormData] = useState({})

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setTimeout(() => {
            axios.get(`http://localhost:8000/api/deals/${props.match.params.id}/`)
                .then(res => setDeal(res.data))
                .catch(e => console.log(e))
        }, 3000)
    }, [props.match.params.id])


    return (
        <React.Fragment>
            <Header/>
            <Container maxWidth="lg" style={{ marginTop: '30px' }}>
                <div className={classes.root}>
                    <Tabs
                        orientation="horizontal"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <Tab label="Сделка" {...a11yProps(0)} />
                        <Tab label="Покупатель" {...a11yProps(1)} />
                        <Tab label="Объект" {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={value} index={0} style={{ backgroundColor: '#fcfcfc', width: '100%' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h6" className={classes.field}>
                                    Информация о сделке
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Представитель продавца:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            {deal?.advertisement.employeesid.name} {deal?.advertisement.employeesid.surname}
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Представитель покупателя:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            {deal?.customer.employeesid.name} {deal?.customer.employeesid.surname}
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Юридическое сопровождение:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.jurist ?  deal?.jurist : '-'}
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Дата задатка:
                                        </Typography>
                                        <DatePicker
                                            value={moment(deal?.date_of_deposit, 'DD.MM.YYYY')}
                                            format={'DD.MM.YYYY'}
                                            onChange={(date) => {
                                                setDeal({
                                                    ...deal,
                                                    date_of_deposit: date.format("DD.MM.YYYY")
                                                })
                                                setFormData({
                                                    ...formData,
                                                    date_of_deposit: date.format("DD.MM.YYYY")
                                                })
                                            }}
                                            allowClear={false}
                                        />
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Дата истечения задатка:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            <DatePicker
                                                value={deal?.expiration_date_of_deposit
                                                    ? moment(deal?.expiration_date_of_deposit, 'DD.MM.YYYY') : ''
                                                }
                                                format={'DD.MM.YYYY'}
                                                onChange={(date) => {
                                                    setDeal({
                                                        ...deal,
                                                        expiration_date_of_deposit: date.format("DD.MM.YYYY")
                                                    })
                                                    setFormData({
                                                        ...formData,
                                                        expiration_date_of_deposit: date.format("DD.MM.YYYY")
                                                    })
                                                }}
                                                allowClear={false}
                                            />
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" className={classes.field}>
                                    Продавец
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Залог:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.pledged }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Дата ожидаемой оплаты:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.own_pay_date }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Дата полной оплаты:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.own_full_pay_date }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Сумма к оплате:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.seller_commission }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Оплаченная часть:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.own_pay ? deal?.own_pay : 0 }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Остаток:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { (deal?.seller_commission - deal?.own_pay).toString() }
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" className={classes.field}>
                                    Покупатель
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Ипотека:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.customer.bank }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Дата ожидаемой оплаты:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.cust_pay_date }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Дата полной оплаты
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.cust_full_pay_date }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Сумма к оплате:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.customer_commission }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Оплаченная часть:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.cust_pay ? deal?.cust_pay : 0 }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Остаток:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { (deal?.customer_commission - deal?.cust_pay).toString() }
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid container spacing={2} item xs={12}>
                                <Grid xs={12} sm={6} item>
                                    <Paper className={classes.paper}>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Итого:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { (deal?.customer_commission + deal?.seller_commission).toString() }
                                            </Typography>
                                        </Box>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Оплаченная часть:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { (deal?.cust_pay + deal?.own_pay).toString() ? (deal?.cust_pay + deal?.own_pay).toString() : 0 }
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid xs={12} sm={6} item container alignItems={"flex-end"} justify={"center"}>
                                    <Link to={`/deals/edit/${props.match.params.id}`}>
                                        Перейти к редактированию
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1} style={{ backgroundColor: '#fcfcfc', width: '100%' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" className={classes.field}>
                                    Контакты
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Имя:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.customer.name }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Телефон:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.customer.phone_number }
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" className={classes.field}>
                                    Специалисты
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Специалист:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.customer.employeesid.name } { deal?.customer.employeesid.surname }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Дата добавления:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.customer.contact_date }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Дата изменения:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.customer.date_of_change }
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" className={classes.field}>
                                    Параметры поиска
                                </Typography>
                                <Paper className={classes.paper}>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Комнатность:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.room }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Сегмент поиска:
                                        </Typography>
                                        <Typography variant="subtitle2">

                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Район:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.district.name }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Год подстройки:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.year_of_construction }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Этаж:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.number_of_floors }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Тип планировки:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.type_of_layout }
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs container direction={"row"} spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h6" className={classes.field}>
                                        Информация о покупателе
                                    </Typography>
                                    <Paper className={classes.paper}>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Инвестор:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.customer.investor }
                                            </Typography>
                                        </Box>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Бюджет:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.customer.budget }
                                            </Typography>
                                        </Box>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Тип оплаты:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.customer.payment_type }
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid container alignItems={"center"} justify={"center"} item xs={12} sm={12}>
                                    <Button href={`http://localhost:8000/customers/customer/${deal?.customer.idcustomer_card}/edit/`} variant='outlined' color="primary">
                                        Редактировать
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2} style={{ backgroundColor: '#fcfcfc', width: '100%' }}>
                        <Grid container spacing={3}>
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
                                            { deal?.advertisement.parameters.room }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Площадь
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.area }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Год подстройки:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.year_of_construction }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Этаж:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.floor }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Тип конструкции:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.type_of_layout }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Состояние:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.condition }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Высота потолков:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.ceiling_height }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Угловая:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.angle }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Бывшее общежите:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.former_hostel }
                                        </Typography>
                                    </Box>
                                    <Box className={classes.fields}>
                                        <Typography variant="subtitle1">
                                            Кухня студия:
                                        </Typography>
                                        <Typography variant="subtitle2">
                                            { deal?.advertisement.parameters.studio_kitchen }
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" className={classes.field}>
                                        Об объекте
                                    </Typography>
                                    <Paper className={classes.paper}>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Эксклюзив:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.parameters.exclusive }
                                            </Typography>
                                        </Box>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                В залоге:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.parameters.pledged }
                                            </Typography>
                                        </Box>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Переплан:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.parameters.replan }
                                            </Typography>
                                        </Box>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Переплан узаконен:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.parameters.legalized_replan }
                                            </Typography>
                                        </Box>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Ключь iAgent:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.parameters.iagent_number }
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid xs={12} sm={6} item>
                                    <Typography variant="h6" className={classes.field}>
                                        Расположение
                                    </Typography>
                                    <Paper className={classes.paper}>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Район:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.parameters.district.name }
                                            </Typography>
                                        </Box>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Улица:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.parameters.street }
                                            </Typography>
                                        </Box>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Пересечение:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.parameters.cross_street }
                                            </Typography>
                                        </Box>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Номер дома:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.parameters.apartment_number }
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" className={classes.field}>
                                        Специалист
                                    </Typography>
                                    <Paper className={classes.paper}>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Специалист:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.employeesid.name } { deal?.advertisement.employeesid.surname }
                                            </Typography>
                                        </Box>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Дата добавления:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.date_of_creation }
                                            </Typography>
                                        </Box>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Дата изменения:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.date_of_change }
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" className={classes.field}>
                                        Стоимость
                                    </Typography>
                                    <Paper className={classes.paper}>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Цена:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.parameters.cost }
                                            </Typography>
                                        </Box>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Цена за м2:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.parameters.total_cost }
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} item xs={12}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" className={classes.field}>
                                        Собственник
                                    </Typography>
                                    <Paper className={classes.paper}>
                                        <Box className={classes.fields}>
                                            <Typography variant="subtitle1">
                                                Имя:
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                { deal?.advertisement.parameters.owner_card.name }
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid xs={12} sm={6} item container alignItems={"flex-end"} justify={"center"}>
                                    <Button href={`http://localhost:8000/objects/object/${deal?.advertisement.idadvertisement}/edit/`} variant='outlined' color="primary">
                                        Редактировать
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </div>
            </Container>
        </React.Fragment>
    );
}
