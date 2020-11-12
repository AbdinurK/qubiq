import React, {useEffect, useState} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
// import { Link } from 'react-router-dom'
import {
    Container,
    // Chip,
    Grid,
    // Button
} from "@material-ui/core"
import { deals } from '../../data/deals'
import Filter from "../../components/Filter/Filter";
import moment from 'moment';
import { CsvBuilder } from 'filefy';
import {DataGrid} from "@material-ui/data-grid";
import {randomCreatedDate} from "@material-ui/x-grid-data-generator";


const arr = [];
deals.map(deal => arr.push({
    no: deal.iddeals,
    employees: [`${deal.advertisement.employeesid.name} ${deal.advertisement.employeesid.surname}`, `\n${deal.customer.employeesid.name} ${deal.customer.employeesid.surname}`],
    address: `${deal.advertisement.parameters.street} ${deal.advertisement.parameters.house_number}`,
    price: `${deal.advertisement.parameters.cost}`,
    deal: [`${deal.advertisement.parameters.owner_card.name}`, `\n${deal.customer.name}`],
    contacts: [`${deal.advertisement.parameters.owner_card.phone_number !== "NULL" ? deal.advertisement.parameters.owner_card.phone_number : '-'}`, `\n${deal.customer.phone_number !== "NULL"  ? deal.customer.phone_number : '-'}`],
    advances: [`${new Date(deal.date_of_deposit).toLocaleDateString()}`, `${deal.expiration_date_of_deposit !== null ? new Date(deal.expiration_date_of_deposit).toLocaleDateString() : '-'}`],
    kickbacks: [`${deal.amount_of_deposit} тг`, `\n${deal.customer_commission} тг`],
    deposit: `${deal.amount_of_deposit}`,
    payment: `${deal.customer.payment_type}`,
    status: deal.status,
    transaction: deal.transaction_date
}));

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: '30px'
    },
    container: {
        maxHeight: 800,
    },
    header: {
        display: 'flex',
        flexWrap: 'wrap',
        wordWrap: 'break-word',
        whiteSpace: 'initial',
        height: '100%',
        maxHeight: '110px',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
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
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function StickyHeadTable() {
    const initialState = {
        name: '',
        status: '',
        payment: '',
        dep_date: new Date('2017-06-13'),
        exp_date: new Date('2017-06-16'),
        transaction: new Date()
    };
    const [state, setState] = useState(initialState);
    const [use, setUsed] = useState(false);
    const [deal, setDeals] = useState([]);
    useEffect(() => {
        setDeals(arr)
    }, []);
    const onReset = () => {
        setDeals(arr);
        setState(initialState)
    };
    const classes = useStyles();
    const columns = [
        { field: 'id', width: 80, headerName: 'Номер',
            renderCell: (params) => (
                <React.Fragment>
                    { params.getValue('id') }
                </React.Fragment>
            ),
        },
        { field: 'employees', width: 300, headerName: 'Специалисты', headerAlign: 'center',
            valueGetter: (params) =>
                `${params.getValue('employee1') || ''} ${
                    params.getValue('employee2') || ''
                }`,
        },
        { field: 'deal_date', type: 'date', width: 120, headerName: 'Дата сделки'},
        { field: 'start_commission_date', type: 'date', width: 145, headerName: 'Дата задатка от'},
        { field: 'end_commission_date', type: 'date', width: 145, headerName: 'Дата задатка до'},
        { field: 'price', headerName: 'Цена', width: 100 },
        { field: 'address', headerName: 'Адрес'},
        { field: 'contract', headerName: 'Собственик / Покупатель', width: 330,
            valueGetter: (params) =>
                `${params.getValue('owner') || ''} - ${
                    params.getValue('customer') || ''
                }`,
            headerAlign: 'center',
            headerClassName: classes.header
        },
        { field: 'commission', headerName: 'Сумма задатка', width: 140 },
        { field: 'moneys', headerName: 'Комиссионные собственника', width: 120,
            valueGetter: (params) =>
                `${params.getValue('owner_money') || ''} - ${
                    params.getValue('customer_money') || ''
                }`,
            headerClassName: classes.header
        },
        { field: 'contacts', headerName: 'Контакты собственника', width: 200,
            valueGetter: (params) =>
                `${params.getValue('owner_phone') || ''} - ${
                    params.getValue('customer_phone') || ''
                }`,
        },
        { field: 'deal_type', headerName: 'Тип сделки', width: 110},
        { field: 'payment', headerName: 'Тип оплаты', width: 120}
    ];

    const rows = [
        {
            id: 544,
            employee1: 'Гульшат Шакенова',
            employee2: 'Гульшат Шакенова',
            deal_date: randomCreatedDate().toLocaleDateString(),
            start_commission_date: randomCreatedDate().toLocaleDateString(),
            end_commission_date: randomCreatedDate().toLocaleDateString(),
            address: '212132',
            price: '250000',
            owner: 'Бериккали Брекешев',
            customer: 'Бериккали Брекешев',
            commission: '300000',
            owner_money: '200000',
            customer_money: '2430000',
            owner_phone: '87007002161',
            customer_phone: '87007002161',
            deal_type: 'Сделка',
            payment: 'Наличные'
        },
        {
            id: 545,
            employee1: 'Гульшат Шакенова',
            employee2: 'Гульшат Шакенова',
            deal_date: randomCreatedDate().toLocaleDateString(),
            start_commission_date: randomCreatedDate().toLocaleDateString(),
            end_commission_date: randomCreatedDate().toLocaleDateString(),
            address: '212132',
            price: '250000',
            owner: 'Бериккали Брекешев',
            customer: 'Бериккали Брекешев',
            commission: '300000',
            owner_money: '200000',
            customer_money: '2430000',
            owner_phone: '87007002161',
            customer_phone: '87007002161',
            deal_type: 'Сделка',
            payment: 'Наличные'
        },
        {
            id: 546,
            employee1: 'Гульшат Шакенова',
            employee2: 'Гульшат Шакенова',
            deal_date: randomCreatedDate().toLocaleDateString(),
            start_commission_date: randomCreatedDate().toLocaleDateString(),
            end_commission_date: randomCreatedDate().toLocaleDateString(),
            address: '212132',
            price: '250000',
            owner: 'Бериккали Брекешев',
            customer: 'Бериккали Брекешев',
            commission: '300000',
            owner_money: '200000',
            customer_money: '2430000',
            owner_phone: '87007002161',
            customer_phone: '87007002161',
            deal_type: 'Сделка',
            payment: 'Наличные'
        },
    ];


    const handleSearch = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    //
    // const colors = status => {
    //     switch (status) {
    //         case 'Срыв':
    //             return 'red';
    //         case 'Сделка':
    //             return 'green';
    //         case 'Заявка':
    //             return 'lightgreen';
    //         case 'Задаток':
    //             return 'yellow';
    //         case 'Ожидает':
    //             return 'grey';
    //         default:
    //             return 'black'
    //     }
    // };
    // const status = (status, id) => {
    //     return (
    //         <Link to={`/deals/${id}`} style={{ textDecoration: 'none'}}>
    //             <Chip
    //                 label={status}
    //                 size="small"
    //                 style={{ backgroundColor: colors(status), color: 'white', marginLeft: '8px', cursor: 'pointer' }}
    //             />
    //         </Link>
    //     )
    // };



    const onApply = () => {
        setDeals(deal.filter(d => (
            moment(d.advances[0], "YYYY-MM-DD HH:mm").unix()  >= moment(state.dep_date, "YYYY-MM-DD HH:mm").unix() &&
            moment(d.advances[0], "YYYY-MM-DD HH:mm").unix()  <= moment(state.exp_date, "YYYY-MM-DD HH:mm").unix()
            ) ||
            d.payment === state?.payment.toLowerCase() ||
            d.status === state.status ||
            d.employees.includes(state.name) ||
            d.deal.includes(state.name) ||
            new Date(d.transaction).getTime() >= state.transaction
        ))
    };

    const onDepDateChange = e => {
        setState({
            ...state,
            dep_date: e
        })
    };

    const onExpDateChange = e => {
        setState({
            ...state,
            exp_date: e
        })
    };

    const onDealDateChange = e => {
        setState({
            ...state,
            transaction: e
        })
    };

    const onUsed = (state) => {
        setUsed(state)
    };

    const handleExport = () => {
        new CsvBuilder("users.csv")
            .setColumns(['Номер', 'Специалист', 'Специалист покупателя', 'Дата сделки', 'Дата задатка от', 'Дата задатка до',
                'Адрес', 'Цена', 'Собственик', 'Покупатель', 'Сумма задатка', 'Комиссионные собственника', 'Комиссионные покупателя',
                'Контакты собственника', 'Контакты покупателя', 'Тип сделки', 'Тип оплаты'])
            .addRows(rows.map(row => Object.values(row)))
            .exportFile();
    };

    return (
        <React.Fragment>
            <Container maxWidth="xl" style={{ marginTop: 30 }}>
                <Grid>
                    <Filter
                        onSearch={handleSearch}
                        state={state}
                        onApply={onApply}
                        onDepDateChange={onDepDateChange}
                        onExpDateChange={onExpDateChange}
                        onDealDateChange={onDealDateChange}
                        onReset={onReset}
                        apply={use}
                        onUsed={onUsed}
                        handleExport={handleExport}
                    />
                </Grid>
            </Container>
            <div style={{ height: 500, width: 1400, margin: '0 auto' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid rows={rows} columns={columns} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
