import React from "react";
import {
    Container,
    Box,
    Typography,
} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from "@material-ui/data-grid";

const useStyles = makeStyles(theme => ({
    box: {
        display: 'table',
        marginBottom: theme.spacing(2),
        maxWidth: 600,
        width: '100%',
        border: '1px solid #ccc',
    },
    innerBox: {
        display: 'table-cell',
        padding: theme.spacing(2),
        borderRight: '1px solid #ccc',
        '&:last-child': {
            borderRight: 'none',
        }
    },
    bold: {
        fontWeight: 'bold',
    },
    divider: {
        width: '1px',
        height: '100%',
        border: '1px solid #ccc',
    }
}));

const columns = [
    { field: 'id', headerName: 'No'},
    { field: 'fullName', headerName: 'ФИО агента', headerAlign: 'center', width: 170},
    { field: 'category', headerName: 'Категория', headerAlign: 'center', width: 120},
    { field: 'plan', headerName: 'План ВД', headerAlign: 'center'},
    { field: 'fact', headerName: 'Факт ВД', headerAlign: 'center'},
    { field: 'activity', headerName: 'Участ. в сделке про./пок', headerAlign: 'center', width: 180},
    { field: 'prediction', headerName: 'Прогноз (сумма)', headerAlign: 'center', width: 150},
    { field: 'fact2', headerName: 'Факт ВД + прогноз (+ % прогноз)', headerAlign: 'center', width: 220},
    { field: 'sum', headerName: 'Сумма срыва (+ % срыва)', headerAlign: 'center', width: 230},
];
const rows = [
    {
        id: 1,
        fullName: 'Султан Гибатуллин',
        category: 'А',
        plan: '450 000',
        fact: '225 000 / 50%',
        activity: '2 / 5',
        prediction: '250 000',
        fact2: '-',
        sum: '300 000 / 13%'
    },
    {
        id: 2,
        fullName: 'Максат Егисбаев',
        category: 'В',
        plan: '300 000',
        fact: '200 000 / 66%',
        activity: '2 / 4',
        prediction: '250 000',
        fact2: '-',
        sum: '300 000 / 13%'
    },
]

const Dashboard = props => {
    const styles = useStyles();
    return (
        <Container maxWidth="xl" style={{ marginTop: 30, position: 'relative' }}>
            <Box className={styles.box}>
                <Box className={styles.innerBox}>
                    <Typography className={styles.bold}>
                        Team Leader:
                    </Typography>
                    <Typography>
                        Султан Гибатуллин
                    </Typography>
                </Box>
                <Box className={styles.innerBox}>
                    <Typography className={styles.bold}>
                        Всего агентов:
                    </Typography>
                    <Typography className={styles.bold}>
                        Новых:
                    </Typography>
                    <Typography className={styles.bold}>
                        Удаленных:
                    </Typography>
                </Box>
            </Box>
            <div style={{ height: 400, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rowHeight={52}
                            headerHeight={56}
                            pageSize={10}
                            hideFooterRowCount={true}
                            rows={rows}
                            columns={columns}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}


export default Dashboard;
