import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Container, Grid, Tabs, Tab, Box, Typography, Paper} from '@material-ui/core';
import FusionCharts from 'fusioncharts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import axios from 'axios'

ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);

const jsonify = res => res.json();
const dataFetch = fetch(
    "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json"
).then(jsonify);
const schemaFetch = fetch(
    "https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json"
).then(jsonify);

const dataSource = {
    chart: {},
    caption: {
        text: "Sales Analysis"
    },
    subcaption: {
        text: "Grocery"
    },
    yaxis: [
        {
            plot: {
                value: "Grocery Sales Value"
            },
            format: {
                prefix: "$"
            },
            title: "Sale Value"
        }
    ]
};

class ChartViewer extends React.Component {
    constructor(props) {
        super(props);
        this.onFetchData = this.onFetchData.bind(this);
        this.state = {
            timeseriesDs: {
                type: "timeseries",
                renderAt: "container",
                width: "1000",
                height: "500",
                dataSource
            }
        };
    }

    componentDidMount() {
        this.onFetchData();
    }

    onFetchData() {
        Promise.all([dataFetch, schemaFetch]).then(res => {
            const data = res[0];
            const schema = res[1];
            const fusionTable = new FusionCharts.DataStore().createDataTable(
                data,
                schema
            );
            const timeseriesDs = Object.assign({}, this.state.timeseriesDs);
            timeseriesDs.dataSource.data = fusionTable;
            this.setState({
                timeseriesDs
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.timeseriesDs.dataSource.data ? (
                    <ReactFC {...this.state.timeseriesDs} />
                ) : (
                    "loading"
                )}
            </div>
        );
    }
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        margin: theme.spacing(2),
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        minWidth: '150px'
    },
    tabPanel: {
        backgroundColor: '#fcfcfc',
        width: '100%'
    },
    paper: {
        padding: theme.spacing(2),
    },
    row: {
        padding: theme.spacing(2),
        minWidth: '220px',
        textAlign: 'center'
    },
    fields: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: theme.spacing(2),
    },
    field: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            style={{ width: '100%' }}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const DashboardDetail = (props) => {
    const styles = useStyles();

    const [value, setValue] = useState(0);
    const [data, setData] = useState({})
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setTimeout(() => {
            axios.get(`http://localhost:8000/api/dashboard/${props.match.params.id}/`)
                .then(res => setData(res.data))
                .catch(e => console.log(e))
        }, 3000)
    }, [props.match.params.id])


    return (
        <Container maxWidth="xl">
            <div className={styles.root}>
                <Tabs
                    orientation="vertical"
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={styles.tabs}
                >
                    <Tab label="Общее" {...a11yProps(0)} />
                    <Tab label="Очки" {...a11yProps(1)} />
                    <Tab label="Валовый доход" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0} className={styles.tabPanel}>
                    <Grid container>
                        <Grid item container direction={"column"}>
                            <Typography variant="h6" className={styles.field}>
                                Показатели агента
                            </Typography>
                            <Paper className={styles.paper}>
                                <Typography>
                                    { data?.name } { data?.surname }
                                </Typography>
                                <Typography>
                                    Агент категорий "{ data?.grade }"
                                </Typography>
                                <Typography>
                                   TL { data?.leader }
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item container justify={"space-between"}>
                            <Grid item xs={5}>
                                <Typography variant="h6" className={styles.field}>
                                    Общие показатели
                                </Typography>
                                <Box className={styles.box}>
                                    <Paper className={styles.row}>
                                        <Typography variant="h4">
                                            { data?.current_points } oч.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {(data?.current_points / data?.plan_points) * 100 }% от { data?.plan_points  } оч.
                                        </Typography>
                                    </Paper>
                                    <Paper className={styles.row}>
                                        <Typography variant="h4">
                                            10 дн.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            с последнего задатка.
                                        </Typography>
                                    </Paper>
                                </Box>
                                <Box className={styles.box}>
                                    <Paper className={styles.row}>
                                        <Typography variant="h4">
                                            { data?.current_profit } тг.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {(data?.current_profit / data?.plan_profit) * 100 }% от { data?.plan_profit } тг
                                        </Typography>
                                    </Paper>
                                    <Paper className={styles.row}>
                                        <Typography variant="h4">
                                            14 дн.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            с последней сделки.
                                        </Typography>
                                    </Paper>
                                </Box>
                                <Box className={styles.box}>
                                    <Paper className={styles.row}>
                                        <Typography variant="h4">
                                            { data?.new_objects } | { data?.active_objects }
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            новых | всего
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            объектов
                                        </Typography>
                                    </Paper>
                                    <Paper className={styles.row}>
                                        <Typography variant="h4">
                                            { data?.new_customers } | { data?.active_customers }
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            новых | всего
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            покупателей
                                        </Typography>
                                    </Paper>

                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" className={styles.field}>
                                    Рейтинг по очкам
                                </Typography>
                                <Paper className={styles.paper} style={{ height: 70 }}>
                                    <Typography variant="subtitle1">
                                        15. Айтуар Серикханов
                                    </Typography>
                                </Paper>

                                <Typography variant="h6" className={styles.field}>
                                    Рейтинг по валовому доходу
                                </Typography>
                                <Paper className={styles.paper} style={{ height: 100 }}>
                                    <Typography variant="subtitle1">
                                        1. ...
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        8. Айтуар Серикханов
                                    </Typography>
                                </Paper>

                                <Typography variant="h6" className={styles.field}>
                                    Показы
                                </Typography>
                                <Paper className={styles.paper} style={{ marginTop: 10, }}>
                                    <Typography variant="subtitle1">
                                        Показов объектов: { data?.obj?.length }
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Показов покупателям: { data?.cust?.length }
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} className={styles.tabPanel}>
                    <ChartViewer/>
                </TabPanel>
                <TabPanel value={value} index={2} className={styles.tabPanel}>
                    <ChartViewer/>
                </TabPanel>
            </div>
        </Container>
    )
};


export default DashboardDetail
