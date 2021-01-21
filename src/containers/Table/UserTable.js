import React, {useEffect, useState} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {
    Button,
    Container,
    Typography
} from "@material-ui/core"
import Filter from "../../components/Filter/Filter";
import { CsvBuilder } from 'filefy';
import { DataGrid } from "@material-ui/data-grid";
import { connect } from "react-redux"
import moment from 'moment'
import { getDeals } from '../../store/action/dealsActions'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: '30px',
        '& MuiDataGrid-colCell': {
            minHeight: 110,
        },
    },
    space: {
        marginTop: 30,
        position: 'relative'
    },
    header: {
        minWidth: '5%',
        width: '100%'
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
        },
        flex: 1,
    },
    gridWrapper: {
        height: 1114,
        width: '100%',
        marginTop: '30px',
        marginBottom: 30
    }
}));
const cellStyles = makeStyles(() => ({
    root: {
        fontSize: '0.6rem',
        lineHeight: 1,
        '& .MuiDataGrid-row > .MuiDataGrid-cell': {
            flex: 1,
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


const UserTable = ({ getDeals, deals }) => {

    const classes = useStyles();
    const cell = cellStyles();

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'KZT',
        minimumFractionDigits: 0
    });
    const usdPrice = {
        type: 'number',
        valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
        cellClassName: 'font-tabular-nums',
    };

    useEffect(() => {
        getDeals();
    }, [getDeals])

    const handleExport = () => {
        new CsvBuilder("users.csv")
            .setColumns(['Номер', 'Специалист', 'Специалист покупателя', 'Дата сделки', 'Дата задатка от', 'Дата задатка до',
                'Адрес', 'Цена', 'Собственик', 'Покупатель', 'Сумма задатка', 'Комиссионные собственника', 'Комиссионные покупателя',
                'Контакты собственника', 'Контакты покупателя', 'Тип сделки', 'Банк', 'Залог'])
            .addRows(deals.map(row => Object.values(row)))
            .exportFile();
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
            default: return '#dd4343'
        }
    }

    const columns = [
        { field: 'id', width: 120, headerName: 'No',
            renderCell: (params) => (
                <div style={{ width: '100%' }}>
                    <Link to={`/deals/${params.getValue('id')}`} style={{ display: 'inline-block', width: '100%' }}>
                        { params.getValue('id') }
                        <Button style={{ background: status(params.getValue('deal_type')), marginLeft: 5, maxWidth: '45px', fontSize: '9px', color: 'white', padding: '5px 2px' }}>
                            { params.getValue('deal_type') }
                        </Button>
                    </Link>
                </div>
            ),
        },
        { field: 'employees', width: 140, headerName: 'Специалисты', headerAlign: 'center',
            valueGetter: (params) =>
                `${params.getValue('employee1') || ''} ${
                    params.getValue('employee2') || ''
                }`,
            renderCell: (params) => (
                <div>
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
        { field: 'address', headerName: 'Цена / Адрес', headerAlign: 'center', flex: 1,
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
        { field: 'start_commission_date', type: 'date', headerAlign: 'center', width: 130, headerName: 'Дата задатка от'},
        { field: 'end_commission_date', type: 'date', headerAlign: 'center', width: 130, headerName: 'Дата задатка до',
            renderCell: (params) => (
                <div
                    style={{
                        width: '100%',
                        backgroundColor: moment(params.getValue('end_commission_date')).isBefore(moment()) && params.getValue('deal_type') === 'Задаток' ? 'red' : '' }}>
                    { moment(params.getValue('end_commission_date'), 'DD.MM.YYYY').format('DD.MM.YYYY') }
                </div>
            ),
        },
        { field: 'deal_date', type: 'date', width: 120, headerAlign: 'center', headerName: 'Дата сделки'},
        { field: 'contract', headerName: 'Собственик/Покупатель', width: 170,
            valueGetter: (params) =>
                `${params.getValue('owner') || ''} ${
                    params.getValue('customer') || ''
                }`,
            renderCell: (params) => (
                <div>
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
        { field: 'commission', headerName: 'Задаток', headerAlign: 'center', ...usdPrice },
        { field: 'moneys', flex: 1.1, headerName: 'Комиссионные', headerAlign: 'center', ...usdPrice,
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
        { field: 'contacts', headerName: 'Контакты', width: 120,
            valueGetter: (params) =>
                `${params.getValue('owner_phone') || ''} ${
                    params.getValue('customer_phone') || ''
                }`,
            cellClassName: classes.header,
            headerAlign: 'center'
        },
        { field: 'payment', flex: 1, headerName: 'Банк / Залог', headerAlign: 'center',
            valueGetter: (params) =>
                `${params.getValue('bank') || ''} ${
                    params.getValue('pledged_bank') || ''
                }`,
            renderCell: (params) => (
                <div>
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
    let rows = []

    const initialState = {
        name: '',
        status: '',
        payment: '',
        dep_date: moment('08.12.2020', 'DD.MM.YYYY'),
        dep_used: false,
        exp_date: moment('08.12.2020', 'DD.MM.YYYY'),
        exp_used: false,
        transaction: moment('08.12.2020', 'DD.MM.YYYY'),
        transaction_used: false,
    };

    const [state, setState] = useState(initialState);
    const [use, setUsed] = useState(false);
    const [deal, setDeals] = useState([]);
    const arr = []
    if (deals) {
        rows = deals
    }
    if (use) {
        rows = deal
    }

    const onReset = () => {
        setDeals(arr);
        setState(initialState)
    };
    const handleSearch = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };
    const onApply = () => {

        let sortedDeals = deals

        if (state.status) {
            sortedDeals = sortedDeals.filter(d => d.deal_type === state.status)
        }
        if (state.payment) {
            sortedDeals = sortedDeals.filter(d => d.payment === state.payment)
        }

        if (state.name) {
            sortedDeals = sortedDeals.filter(d => d.employee1.includes(state.name) || d.employee2.includes(state.name))
        }


        if (state.dep_used && state.dep_date) {
            sortedDeals = sortedDeals.filter(d => moment(d.start_commission_date).isSameOrAfter(state.dep_date))
        }

        if (state.exp_used && state.exp_date) {
            sortedDeals = sortedDeals.filter(d => moment(d.end_commission_date).isSameOrBefore(state.exp_date))
        }

        if (state.transaction_used && state.transaction) {
            sortedDeals = sortedDeals.filter(d => moment(d.deal_date).isSame(state.transaction))
        }


        setDeals(sortedDeals)
    };

    const onDepDateChange = e => {
        setState({
            ...state,
            dep_date: e,
            dep_used: true
        })
    };

    const onExpDateChange = e => {
        setState({
            ...state,
            exp_date: e,
            exp_used: true
        })
    };

    const onDealDateChange = e => {
        setState({
            ...state,
            transaction: e,
            transaction_used: true
        })
    };

    const onUsed = (state) => {
        setUsed(state)
    };


    return (
        <React.Fragment>
            <Container maxWidth="xl" className={classes.space}>
                <Filter
                    state={state}
                    apply={use}
                    onUsed={onUsed}
                    onApply={onApply}
                    onReset={onReset}
                    onSearch={handleSearch}
                    onDepDateChange={onDepDateChange}
                    onExpDateChange={onExpDateChange}
                    onDealDateChange={onDealDateChange}
                    handleExport={handleExport}
                />
                <Typography variant="body1" className={classes.space}>
                    Число строк: { rows.length }
                </Typography>
                <div className={classes.gridWrapper}>
                    <DataGrid
                        pageSize={10}
                        hideFooterRowCount={true}
                        className={cell.root}
                        rows={rows}
                        columns={columns}
                        loading={!deals}
                    />
                </div>
            </Container>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    deals: state.deals.deals,
    loading: state.deals.loading
});

export default connect(mapStateToProps, { getDeals })(UserTable)
