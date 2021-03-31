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
import { employeeTransform } from '../../helpers/dashboardTransformation'


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




    // name - FIO
    // grade - Категория
    // active - Статус
    // plan_profit - План ВД
    // current_profit - Факт ВД
    // number_cust - Участ в сделках
    // number_obj - Учас в сделках продава
    // current_fails - Сумма срыва

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
        { field: 'name', headerName: 'ФИО агента', headerAlign: 'center', flex: 0.7,
        renderCell: params => (
            <Link to={`/dashboard/${params.getValue('link')}`}>
                { params.getValue('name') }
            </Link>
        )},
        { field: 'grade', headerName: 'Категория', headerAlign: 'center', width: 130,
            renderCell: (params) => (
                <div style={{ width: '100%', textAlign: 'center' }}>
                    { params.getValue('grade') }
                </div>
            )
        },
        { field: 'plan_profit', headerName: 'План ВД', headerAlign: 'center', flex: .6,
            renderCell: (params) => (
                <div style={{ width: '100%', textAlign: 'center' }}>
                    { params.getValue('plan_profit') }
                </div>
            )
        },
        { field: 'current_profit', headerName: 'Факт ВД', headerAlign: 'center', flex: 1,
            renderCell: (params) => (
                <React.Fragment>
                    {/*<div className={styles.jss153}>*/}
                    {/*    <div className={styles.jss154}>*/}
                    {/*        { params.getValue('percent') }*/}
                    {/*    </div>*/}
                    {/*    <div*/}
                    {/*        className={styles.jss155}*/}
                    {/*        style={{*/}
                    {/*            maxWidth: `${params.getValue('percent')}%`,*/}
                    {/*            backgroundColor: vol(params.getValue('percent'))*/}
                    {/*        }}/>*/}
                    {/*</div>*/}
                    <div style={{ width: '100%', textAlign: 'center' }}>
                        { params.getValue('current_profit') }
                    </div>
                </React.Fragment>
            )
        },
        { field: 'activity', headerName: 'Участ. в сделке про./пок', headerAlign: 'center', flex: 1,
            renderCell: (params) => (
                <div style={{ width: '100%', textAlign: 'center' }}>
                    { params.getValue('activity') }
                </div>
            )
        },
        { field: 'prediction', headerName: 'Прогноз', headerAlign: 'center', width: 120,
            renderCell: (params) => (
                <div style={{ width: '100%', textAlign: 'center' }}>
                    { params.getValue('prediction') }
                </div>
            )
        },
        { field: 'fact2', headerName: 'Факт ВД + прогноз', headerAlign: 'center', flex: .9,
            renderCell: (params) => (
                <div style={{ width: '100%', textAlign: 'center' }}>
                    { params.getValue('fact2') }
                </div>
            )
        },
        { field: 'current_fails', headerName: 'Сумма срыва', headerAlign: 'center', flex: .7,
            renderCell: (params) => (
                <div style={{ width: '100%', textAlign: 'center' }}>
                    { params.getValue('current_fails') }
                </div>
            )
        },
    ];
    const rows = [
        ...employeeTransform(indicator?.employees_set)
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
                <div style={{ height: 550, width: '100%' }}>
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
