import React from 'react'
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
    Checkbox,
    Grid,
} from "@material-ui/core"
import Filter from "../../components/Filter/Filter";


const columns = [
    { id: 'no', label: 'NO', minWidth: 50 },
    { id: 'employees', label: ' Специалисты', minWidth: 120 },
    { id: 'address', label: ' Адрес', minWidth: 120 },
    { id: 'price', label: ' Цена', minWidth: 100 },
    { id: 'deal', label: 'Собственник/Покупатель', minWidth: 130 },
    { id: 'contacts', label: ' Контакты', minWidth: 100 },
    { id: 'advances', label: ' Дата задатка от/ Дата задатка до', minWidth: 120 },
    { id: 'kickbacks', label: ' Комиссионные', minWidth: 100 },
    { id: 'deposit', label: ' Сумма задатка', minWidth: 100 },
    { id: 'transaction', label: ' Вид сделки', minWidth: 80 }
];

function createData(no, employees, address, price, deal, contacts, advances, kickbacks, deposit, transaction) {
    return { no, employees, address, price, deal, contacts, advances, kickbacks, deposit, transaction};
}

const rows = [
    createData(1, ['Гульшат Шакенова', '\nГульшат Орынбаева'], 'Родостовца д 271', '12,500,500 тг',
        ['Галия Нуржановна', '\nГульжан Айтбаева'], ['87007002161', '\n87007002161'],
        ['12.04.20 -', '\n16.04.20'], ['200000 тг', '\n100000 тг'], '400000 тг', 'наличные' ),
    createData(2, ['Гульшат Шакенова', '\nГульшат Орынбаева'], 'Родостовца д 271', '12,500,500 тг',
        ['Галия Нуржановна', '\nГульжан Айтбаева'], ['87007002161', '\n87007002161'],
        ['12.04.20 -', '\n16.04.20'], ['200000 тг', '\n100000 тг'], '400000 тг', 'наличные' ),
    createData(3, ['Гульшат Шакенова', '\nГульшат Орынбаева'], 'Родостовца д 271', '12,500,500 тг',
        ['Галия Нуржановна', '\nГульжан Айтбаева'], ['87007002161', '\n87007002161'],
        ['12.04.20 -', '\n16.04.20'], ['200000 тг', '\n100000 тг'], '400000 тг', 'наличные' ),
    createData(4, ['Гульшат Шакенова', '\nГульшат Орынбаева'], 'Родостовца д 271', '12,500,500 тг',
        ['Галия Нуржановна', '\nГульжан Айтбаева'], ['87007002161', '\n87007002161'],
        ['12.04.20 -', '\n16.04.20'], ['200000 тг', '\n100000 тг'], '400000 тг', 'наличные' ),
    createData(5, ['Гульшат Шакенова', '\nГульшат Орынбаева'], 'Родостовца д 271', '12,500,500 тг',
        ['Галия Нуржановна', '\nГульжан Айтбаева'], ['87007002161', '\n87007002161'],
        ['12.04.20 -', '\n16.04.20'], ['200000 тг', '\n100000 тг'], '400000 тг', 'наличные' ),
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

export default function StickyHeadTable() {
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

    return (
        <React.Fragment>
            <Container maxWidth="xl" style={{ marginTop: 30 }}>
                <Grid>
                    <Filter/>
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
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {columns.map((column, index) => {
                                                const value = row[column.id];
                                                return (
                                                    <React.Fragment key={index}>
                                                        <TableCell align={column.align}>
                                                            {value}
                                                            { column.id === 'no' ?
                                                                <Checkbox
                                                                    defaultChecked
                                                                    color="primary"
                                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                                /> : null
                                                            }
                                                        </TableCell>
                                                    </React.Fragment>

                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
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
