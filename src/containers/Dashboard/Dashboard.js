import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Container, Grid, Tabs, Tab, Box, Typography, Paper} from '@material-ui/core';

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

const Dashboard = () => {
    const styles = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
                                    Айтуар Серикханов
                                </Typography>
                                <Typography>
                                    Агент категорий "A"
                                </Typography>
                                <Typography>
                                    TL Бейбарс Тулебаев
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
                                            35 oч.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            66% от 45 оч.
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
                                            300 000 тг.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            50% от 600 000 тг
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
                                            15 | 30
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
                                            15 | 30
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
                                        Показов объектов: 50
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Показов покупателям: 31
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={1} className={styles.tabPanel}>
                    Tab 2
                </TabPanel>
                <TabPanel value={value} index={2} className={styles.tabPanel}>
                    Tab 3
                </TabPanel>
            </div>
        </Container>
    )
};


export default Dashboard
