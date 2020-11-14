import React, {useEffect, useState} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {
    Container,
} from "@material-ui/core"
import { deals } from '../../data/deals'
import Filter from "../../components/Filter/Filter";
import { CsvBuilder } from 'filefy';
import { DataGrid } from "@material-ui/data-grid";


const arr = [];
const exp = [];
deals.map(deal => arr.push({
    id: deal.iddeals,
    employee1: `${deal.advertisement.employeesid.name} ${deal.advertisement.employeesid.surname}`,
    employee2: `${deal.customer.employeesid.name} ${deal.customer.employeesid.surname}`,
    deal_date: new Date(deal.transaction_date),
    start_commission_date: new Date(deal.date_of_deposit),
    end_commission_date: new Date(deal.expiration_date_of_deposit),
    address: `${deal.advertisement.parameters.street} ${deal.advertisement.parameters.house_number}`,
    price: `${deal.advertisement.parameters.cost}`,
    owner: deal.advertisement.parameters.owner_card.name,
    customer: `${deal?.customer?.name} ${ deal.customer.surname ? deal.customer.surname : 'отсутствует'  }`,
    commission: deal.amount_of_deposit,
    owner_money: deal.amount_of_deposit,
    customer_money: deal.customer_commission,
    owner_phone: deal.advertisement.parameters.owner_card.phone_number,
    customer_phone: deal.customer.phone_number !== "NULL" ? deal.customer.phone_number : 'отсутствует' ,
    deal_type: deal.status,
    payment: deal.customer.payment_type,
    bank: deal.customer.bank === null ? 'наличные' :  deal.customer.bank,
    pledged_bank: deal.advertisement.parameters.pledged_bank === null ? 'Не в залоге' :  deal.advertisement.parameters.pledged_bank
}));
deals.map(deal => exp.push({
    id: deal.iddeals,
    employee1: `${deal.advertisement.employeesid.name} ${deal.advertisement.employeesid.surname}`,
    employee2: `${deal.customer.employeesid.name} ${deal.customer.employeesid.surname}`,
    deal_date: new Date(deal.transaction_date).toLocaleDateString(),
    start_commission_date: new Date(deal.date_of_deposit).toLocaleDateString(),
    end_commission_date: new Date(deal.expiration_date_of_deposit).toLocaleDateString(),
    address: `${deal.advertisement.parameters.street} ${deal.advertisement.parameters.house_number}`,
    price: `${deal.advertisement.parameters.cost}`,
    owner: deal.advertisement.parameters.owner_card.name,
    customer: `${deal?.customer?.name} ${ deal.customer.surname ? deal.customer.surname : 'отсутствует'  }`,
    commission: deal.amount_of_deposit,
    owner_money: deal.amount_of_deposit,
    customer_money: deal.customer_commission,
    owner_phone: deal.advertisement.parameters.owner_card.phone_number,
    customer_phone: deal.customer.phone_number !== "NULL" ? deal.customer.phone_number : 'отсутствует' ,
    deal_type: deal.status,
    bank: deal.customer.bank === null ? 'наличные' :  deal.customer.bank,
    pledged_bank: deal.advertisement.parameters.pledged_bank === null ? 'Не в залоге' :  deal.advertisement.parameters.pledged_bank
}));
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: '30px',
        '& MuiDataGrid-colCell': {
            minHeight: 110,
        },
    },
    container: {
        maxHeight: 800,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        textDecoration: 'none',

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
const cellStyles = makeStyles(theme => ({
    root: {
        '& .MuiDataGrid-colCell': {
        },
        '& .MuiDataGrid-row > .MuiDataGrid-cell': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            minHeight: '100px !important',
            overflow: 'inherit',
            lineHeight: '30px!important',
            whiteSpace: 'pre-wrap',
            height: '100%',
            wordWrap: 'break-word',
            textAlign: 'center',
            position: 'relative'
        },
        '& .MuiDataGrid-row > .MuiDataGrid-cell > p': {
            display: 'inline-block',
            textAlign: 'center',
            margin: 'auto',
        },
        '& .MuiDataGrid-colCellTitle': {
            textOverflow: 'ellipsis',
            overflowWrap: 'break-word',
            display: '-webkit-box',
            '-webkit-line-clamp': 4,
            '-webkit-box-orient': 'vertical',
            hyphens: 'auto'
        },
        '& .MuiDataGrid-row': {
            minHeight: '100px !important',
        }
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
    const cell = cellStyles();

    const columns = [
        { field: 'id', width: 80, headerName: 'Номер',
            renderCell: (params) => (
                <React.Fragment>
                    <Link to={`/deals/${params.getValue('id')}`}>
                        { params.getValue('id') }
                    </Link>
                </React.Fragment>
            ),
            cellClassName: classes.header,
        },
        { field: 'employees', width: 200, headerName: 'Специалисты', headerAlign: 'center',
            valueGetter: (params) =>
                `${params.getValue('employee1') || ''} ${
                    params.getValue('employee2') || ''
                }`,
            renderCell: (params) => (
                <div style={{ }}>
                    <p>
                        { params.getValue('employee1') }
                    </p>
                    <p>
                        { params.getValue('employee2') }
                    </p>
                </div>
            ),
            headerClassName: classes.header
        },
        { field: 'deal_date', type: 'date', width: 120, headerName: 'Дата сделки'},
        { field: 'start_commission_date', type: 'date', width: 145, headerName: 'Дата задатка от'},
        { field: 'end_commission_date', type: 'date', width: 145, headerName: 'Дата задатка до'},
        { field: 'price', headerName: 'Цена', width: 100, headerAlign: 'center', },
        { field: 'address', headerName: 'Адрес', headerAlign: 'center', width: 140},
        { field: 'contract', headerName: 'Собственик/Покупатель', width: 200,
            valueGetter: (params) =>
                `${params.getValue('owner') || ''} ${
                    params.getValue('customer') || ''
                }`,
            headerAlign: 'center',
            headerClassName: classes.header
        },
        { field: 'commission', headerName: 'Задаток', width: 100 },
        { field: 'moneys', headerName: 'Комиссионные', width: 140,
            valueGetter: (params) =>
                `${params.getValue('owner_money') || ''} ${
                    params.getValue('customer_money') || ''
                }`,
            cellClassName: classes.header,
            renderCell: (params) => (
                <div>
                    <p>
                        { params.getValue('owner_money') }
                    </p>
                    <p>
                        { params.getValue('customer_money') }
                    </p>
                </div>
            ),
        },
        { field: 'contacts', headerName: 'Контакты', width: 140,
            valueGetter: (params) =>
                `${params.getValue('owner_phone') || ''} ${
                    params.getValue('customer_phone') || ''
                }`,
            cellClassName: classes.header,
            headerAlign: 'center'
        },
        { field: 'deal_type', headerName: 'Статус', width: 140,
            cellClassName: classes.header,
            headerAlign: 'center'
        },
        { field: 'payment', width: 200, headerName: 'Банк / Залог', headerAlign: 'center',
            valueGetter: (params) =>
                `${params.getValue('bank') || ''} ${
                    params.getValue('pledged_bank') || ''
                }`,
            renderCell: (params) => (
                <div style={{ }}>
                    <p>
                        { params.getValue('bank') }
                    </p>
                    <p>
                        { params.getValue('pledged_bank') }
                    </p>
                </div>
            ),
            headerClassName: classes.header
        },
    ];
    const rows = [
        ...deal
    ];


    const handleSearch = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const onApply = () => {
        setDeals(deal.filter(d => (
            d.deal_type === state.status ||
            d.deal_date > state.transaction ||
            // (d.start_commission_date >= state.dep_date && d.end_commission_date <= state.exp_date) ||
            d.payment === state.payment
        )))
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
                'Контакты собственника', 'Контакты покупателя', 'Тип сделки', 'Банк', 'Залог'])
            .addRows(exp.map(row => Object.values(row)))
            .exportFile();
    };

    return (
        <React.Fragment>
            <Container maxWidth="xl" style={{ marginTop: 30 }}>
                <div style={{ height: 100, minWidth: 1400, margin: '0 auto', flexGrow: 1 }}>
                    <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
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
                        </div>
                    </div>
                </div>
            </Container>
            <Container maxWidth="xl" style={{ marginTop: 30, display: 'flex' }}>
                <div style={{ height: 734, minWidth: 1400, margin: '0 auto', flexGrow: 1 }}>
                    <div style={{ display: 'flex', height: '100%' }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGrid
                                className={cell.root}
                                rows={rows}
                                columns={columns}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
}
