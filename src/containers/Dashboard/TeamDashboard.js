import React, { useEffect } from "react";
import {
    Container,
    Box,
    Typography,
} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from "@material-ui/data-grid";
import {Link} from "react-router-dom";
import { connect } from 'react-redux'
import { getIndicators, getIndicator } from '../../store/actions'
import Header from "../../components/Header/Header";


const useStyles = makeStyles(theme => ({
    container: {
        marginTop: 30,
    },
    box: {
        display: 'table',
        marginBottom: theme.spacing(2),
        maxWidth: 600,
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '4px',
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

const TeamDashboard = ({ getIndicators, getIndicator, indicators, indicator, match }) => {

    useEffect(() => {
        getIndicators()
        getIndicator('1')
    }, [getIndicators, getIndicator, match])

    console.log(indicator)

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
        { field: 'id', headerName: 'No', width: 80 },
        { field: 'fullName', headerName: 'ФИО агента', headerAlign: 'center', flex: 0.7,
        renderCell: params => (
            <Link to={`/dashboard/171`}>
                { params.getValue('fullName') }
            </Link>
        )},
        { field: 'category', headerName: 'Категория', headerAlign: 'center', width: 130},
        { field: 'plan', headerName: 'План ВД', headerAlign: 'center', flex: .6},
        { field: 'facts', headerName: 'Факт ВД', headerAlign: 'center', flex: 1,
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
        { field: 'activity', headerName: 'Участ. в сделке про./пок', headerAlign: 'center', flex: 1},
        { field: 'prediction', headerName: 'Прогноз', headerAlign: 'center', width: 120},
        { field: 'fact2', headerName: 'Факт ВД + прогноз', headerAlign: 'center', flex: .9},
        { field: 'sum', headerName: 'Сумма срыва', headerAlign: 'center', flex: .7},
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
        <React.Fragment>
            <Header/>
            <Container maxWidth="xl" className={styles.container}>
                <Box className={styles.box}>
                    <Box className={styles.innerBox}>
                        <Typography className={styles.bold}>
                            Team Leader:
                        </Typography>
                        <Typography>
                            { indicator.leader }
                        </Typography>
                    </Box>
                    <Box className={styles.innerBox}>
                        <Typography className={styles.bold}>
                            Всего агентов: { indicator.number_all }
                        </Typography>
                        <Typography className={styles.bold}>
                            Новых: { indicator.number_new }
                        </Typography>
                        <Typography className={styles.bold}>
                            Удаленных:
                        </Typography>
                    </Box>
                </Box>
                <div style={{ height: 250, width: '100%' }}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                    />
                </div>
            </Container>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    indicators: state.Indicators.indicators,
    indicator: state.Indicators.indicator,
})

export default connect(mapStateToProps, { getIndicators, getIndicator })(TeamDashboard);
