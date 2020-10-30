import React, {useEffect, useState} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Chip,
    Grid,
} from "@material-ui/core"
import { deals } from '../../data/deals'
import Filter from "../../components/Filter/Filter";
import moment from 'moment';


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
    const columns = [
        { id: 'no', label: 'NO', minWidth: 100 },
        { id: 'employees', label: 'Специалисты', minWidth: 120 },
        { id: 'address', label: 'Адрес', minWidth: 120 },
        { id: 'price', label: 'Цена', minWidth: 85 },
        { id: 'deal', label: 'Собственник/Покупатель', minWidth: 150 },
        { id: 'contacts', label: 'Контакты', minWidth: 90 },
        { id: 'advances', label: 'Дата задатка от/ Дата задатка до', minWidth: 160 },
        { id: 'kickbacks', label: 'Комиссионные', minWidth: 100 },
        { id: 'deposit', label: 'Сумма задатка', minWidth: 70 },
        { id: 'payment', label: 'Тип оплаты', minWidth: 80 },
    ];
    const rows = [
        ...deal
    ];
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearch = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const colors = status => {
        switch (status) {
            case 'Срыв':
                return 'red';
            case 'Сделка':
                return 'green';
            case 'Заявка':
                return 'lightgreen';
            case 'Задаток':
                return 'yellow';
            case 'Ожидает':
                return 'grey';
            default:
                return 'black'
        }
    };
    const status = (status) => {
        return (
            <Chip
                label={status}
                size="small"
                style={{ backgroundColor: colors(status), color: 'white', marginLeft: '8px' }}
            />
        )
    };

    const data = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
        return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map((column, index) => {
                    const value = row[column.id];

                    return (
                        <React.Fragment key={index}>
                            <TableCell align={column.align}>
                                {(value && value !== 'null') ? value : '-'}
                                { column.id === 'no'
                                    ? status(row.status) : null
                                }
                            </TableCell>
                        </React.Fragment>

                    );
                })}
            </TableRow>
        );
    });


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
                    />
                </Grid>
            </Container>
            <Container maxWidth="xl">
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    data
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </Container>
        </React.Fragment>
    );
}
