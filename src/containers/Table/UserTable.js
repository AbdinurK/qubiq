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


const arr = [];
deals.map(deal => arr.push({
    no: deal.iddeals,
    employees: [`${deal.advertisement.employeesid.name} ${deal.advertisement.employeesid.surname}`, `\n${deal.customer.employeesid.name} ${deal.customer.employeesid.surname}`],
    address: `${deal.advertisement.parameters.street} ${deal.advertisement.parameters.house_number}`,
    price: `${deal.advertisement.parameters.cost}`,
    deal: [`${deal.advertisement.parameters.owner_card.name}`, `\n${deal.customer.name}`],
    contacts: [`${deal.advertisement.parameters.owner_card.phone_number !== "NULL" ? deal.advertisement.parameters.owner_card.phone_number : '-'}`, `\n${deal.customer.phone_number !== "NULL"  ? deal.customer.phone_number : '-'}`],
    advances: [`${deal.date_of_deposit}`, ` / ${deal.expiration_date_of_deposit !== null ? deal.expiration_date_of_deposit : '-'}`],
    kickbacks: [`${deal.amount_of_deposit} тг`, `\n${deal.customer_commission} тг`],
    deposit: `${deal.amount_of_deposit}`,
    transaction: `${deal.type_of_deal}`,
    status: deal.status
}));
const columns = [
    { id: 'no', label: 'NO', minWidth: 95 },
    { id: 'employees', label: 'Специалисты', minWidth: 120 },
    { id: 'address', label: 'Адрес', minWidth: 120 },
    { id: 'price', label: 'Цена', minWidth: 85 },
    { id: 'deal', label: 'Собственник/Покупатель', minWidth: 150 },
    { id: 'contacts', label: 'Контакты', minWidth: 90 },
    { id: 'advances', label: 'Дата задатка от/ Дата задатка до', minWidth: 160 },
    { id: 'kickbacks', label: 'Комиссионные', minWidth: 100 },
    { id: 'deposit', label: 'Сумма задатка', minWidth: 70 },
    { id: 'transaction', label: 'Вид сделки', minWidth: 80 },
];
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

export default function StickyHeadTable(value1, value2) {
    const initialState = {
        name: '',
        status: '',
        employees: '',
        address: '',
        price: '',
        deal: '',
        contacts: '',
        advances: new Date('2017-06-23'),
        kickbacks: '',
        deposit: '',
        transaction: ''
    };
    const [state, setState] = useState(initialState);
    const [deal, setDeals] = useState([]);
    useEffect(() => {
        setDeals(arr)
    }, []);
    const onReset = () => {
        setDeals(arr);
        setState(initialState)
    };
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

    const status = (status) => (
        <Chip
            label={status}
            size="small"
            style={{ backgroundColor: colors(status), color: 'white', marginLeft: '8px' }}
        />
    );

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
        setDeals(deal.filter(d => d.price === state.price || d.status === state.status || d.deposit === state.deposit))
    };

    const onDateChange = e => {
        setState({
            ...state,
            advances: e
        })
    };


    return (
        <React.Fragment>
            <Container maxWidth="xl" style={{ marginTop: 30 }}>
                <Grid>
                    <Filter onSearch={handleSearch} state={state} onApply={onApply} onDateChange={onDateChange} onReset={onReset}/>
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
