import React, {useEffect, useState} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {
    Button,
    Container,
    Typography
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
    customer: `${deal?.customer?.name} ${ deal.customer.surname ? deal.customer.surname : ''  }`,
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
    last: {
        '& .MuiDataGrid-columnSeparator': {
            display: 'none'
        }
    }
}));
const cellStyles = makeStyles(theme => ({
    root: {
        fontSize: '0.6rem',
        flexGrow: 1,
        lineHeight: 1,
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


export default function UserTable() {

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
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'KZT',
        minimumFractionDigits: 0
    });
    const usdPrice = {
        type: 'number',
        width: 130,
        valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
        cellClassName: 'font-tabular-nums',
    };
    const status = s => {
        switch (s) {
            case 'Сделка':
                return '#6aa84f'
            case 'Срыв 1':
                return '#999999'
            case 'Срыв 2':
                return '#ff8649'
            case 'Срыв 3':
                return '#dd4343'
            case 'Задаток':
                return '#fbbc04'
            case 'Заявка':
                return '#3d85c6'
            case 'Ожидает':
                return '#ccc'
            default: return null
        }
    }

    const columns = [
        { field: 'id', width: 70, headerName: 'No',
            renderCell: (params) => (
                <div>
                    <Link to={`/deals/${params.getValue('id')}`}>
                        { params.getValue('id') }
                        <Button style={{ background: status(params.getValue('deal_type')), maxWidth: '45px', fontSize: '9px', color: 'white', padding: '5px 2px' }}>
                            { params.getValue('deal_type') }
                        </Button>
                    </Link>
                </div>
            ),
            cellClassName: classes.header,
        },
        { field: 'employees', width: 140, headerName: 'Специалисты', headerAlign: 'center',
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
        { field: 'start_commission_date', type: 'date', headerAlign: 'center', width: 110, headerName: 'Дата задатка от'},
        { field: 'end_commission_date', type: 'date', headerAlign: 'center', width: 110, headerName: 'Дата задатка до'},
        { field: 'deal_date', type: 'date', width: 100, headerAlign: 'center', headerName: 'Дата сделки'},
        { field: 'address', headerName: 'Цена / Адрес', headerAlign: 'center', width: 140,
            valueGetter: (params) =>
                `${params.getValue('price') || ''} ${
                    params.getValue('address') || ''
                }`,
            renderCell: (params) => (
                <div style={{ }}>
                    <p>
                        {
                            currencyFormatter.format(Number(params.getValue('price')))
                        }
                    </p>
                    <p>
                        { params.getValue('address') }
                    </p>
                </div>
            ),
            headerClassName: classes.header
        },
        { field: 'contract', headerName: 'Собственик/Покупатель', width: 160,
            valueGetter: (params) =>
                `${params.getValue('owner') || ''} ${
                    params.getValue('customer') || ''
                }`,
            renderCell: (params) => (
                <div style={{ }}>
                    <p style={{ borderBottom: '1px solid #ccc' }}>
                        { params.getValue('owner') }
                    </p>
                    <p>
                        { params.getValue('customer') }
                    </p>
                </div>
            ),
            headerAlign: 'center',
            headerClassName: classes.header
        },
        { field: 'commission', headerName: 'Задаток', headerAlign: 'center', width: 60, ...usdPrice },
        { field: 'moneys', headerName: 'Комиссионные', headerAlign: 'center', width: 80, ...usdPrice,
            valueGetter: (params) =>
                `${currencyFormatter.format(Number(params.getValue('owner_money'))) || ''} ${
                    params.getValue('customer_money') || ''
                }`,
            cellClassName: classes.header,
            renderCell: (params) => (
                <div>
                    <p>
                        { currencyFormatter.format(Number(params.getValue('owner_money'))) }
                    </p>
                    <p>
                        { currencyFormatter.format(Number(params.getValue('customer_money'))) }
                    </p>
                </div>
            ),
        },
        { field: 'contacts', headerName: 'Контакты', width: 100,
            valueGetter: (params) =>
                `${params.getValue('owner_phone') || ''} ${
                    params.getValue('customer_phone') || ''
                }`,
            cellClassName: classes.header,
            headerAlign: 'center'
        },
        { field: 'payment', width: 120, headerName: 'Банк / Залог', headerAlign: 'center',
            valueGetter: (params) =>
                `${params.getValue('bank') || ''} ${
                    params.getValue('pledged_bank') || ''
                }`,
            renderCell: (params) => (
                <div style={{ }}>
                    <Typography style={{ fontSize: '0.6rem', maxHeight: '60px', }}>
                        { params.getValue('bank') }
                    </Typography>
                    <p>
                        { params.getValue('pledged_bank') }
                    </p>
                </div>
            ),
            headerClassName: classes.last
        }
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
            <Container maxWidth="xl" style={{ marginTop: 30, position: 'relative' }} >
                <div style={{ margin: '0 auto', flexGrow: 1 }}>
                    <div style={{ display: 'flex',  height: '100%' }}>
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
            <Container maxWidth="xl" style={{ marginTop: 30, position: 'relative' }}>
                <Typography variant="body1">
                    Число строк: { rows.length }
                </Typography>
            </Container>
            <Container maxWidth="xl" style={{ marginTop: '30px', marginBottom: 30, display: 'flex' }}>
                <div style={{ height: 1114, width: '100%' }}>
                    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                        <DataGrid
                            pageSize={10}
                            hideFooterRowCount={true}
                            className={cell.root}
                            rows={rows}
                            columns={columns}
                        />
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
}
