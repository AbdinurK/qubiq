import React from "react";
import {
    Container,
    Box,
    Typography,
} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from "@material-ui/data-grid";
import {Link} from "react-router-dom";

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
    },
    last: {
        '& .MuiDataGrid-columnSeparator': {
            display: 'none'
        },
        flex: 1,
    },
    jss153: {
        width: '100%',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        height: '26px',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '2px',
        marginRight: theme.spacing(2)
    },
    jss154: {
        width: '100%',
        display: 'flex',
        position: 'absolute',
        lineHeight: '24px',
        justifyContent: 'center',
    },
    jss155: {
        height: '100%',
    },
    text: {
        textAlign: 'center'
    }
}));

const TeamDashboard = props => {
    const styles = useStyles();
    const vol = per => {
        switch (per) {
            case per < 50:
                return '#efbb5aa3'
            case per > 50:
                return '#ccc'
            default: return '#efbb5aa3'
        }
    }
    const columns = [
        { field: 'id', headerName: 'No', width: 70 },
        { field: 'fullName', headerName: 'ФИО агента', headerAlign: 'center', width: 170,
        renderCell: params => (
            <Link to={`/dashboard/171`}>
                { params.getValue('fullName') }
            </Link>
        )},
        { field: 'category', headerName: 'Категория', headerAlign: 'center', width: 110},
        { field: 'plan', headerName: 'План ВД', headerAlign: 'center'},
        { field: 'facts', headerName: 'Факт ВД', headerAlign: 'center', width: 180,
            renderCell: (params) => (
                <React.Fragment>
                    <div className={styles.jss153}>
                        <div className={styles.jss154}>
                            { params.getValue('percent') }
                        </div>
                        <div
                            className={styles.jss155}
                            style={{
                                maxWidth: `${params.getValue('percent')}%`,
                                backgroundColor: vol(params.getValue('percent'))
                            }}/>
                    </div>
                    <div>
                        { params.getValue('fact') }
                    </div>
                </React.Fragment>
            )
        },
        { field: 'activity', headerName: 'Участ. в сделке про./пок', headerAlign: 'center', width: 230},
        { field: 'prediction', headerName: 'Прогноз', headerAlign: 'center', width: 150,},
        { field: 'fact2', headerName: 'Факт ВД + прогноз', headerAlign: 'center', width: 180},
        { field: 'sum', headerName: 'Сумма срыва', headerAlign: 'center', width: 160, headerClassName: styles.last},
    ];
    const rows = [
        {
            id: 1,
            fullName: 'Султан Гибатуллин',
            category: 'А',
            plan: '450 000',
            fact: '225 000',
            percent: 33,
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
            fact: '200 000',
            percent: 66,
            activity: '2 / 4',
            prediction: '250 000',
            fact2: '-',
            sum: '300 000 / 13%'
        },
    ]
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


export default TeamDashboard;
