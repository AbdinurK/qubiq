import React from "react";
import { Container, Grid, Paper, Typography, Box, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
    box: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    paper: {
        padding: theme.spacing(2),
        border: '1px solid #ccc',
        minWidth: '320px',
    }
}));


const Dashboard = () => {
    const classes = useStyles()
    return (
        <Container maxWidth="xl" style={{ marginTop: 30 }}>
            <Typography variant="h5" color="initial">
                Команды
            </Typography>
            <Grid container spacing={3} style={{ marginTop: 5 }}>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Box className={classes.box}>
                            <Typography>
                                Лидер команды:
                            </Typography>
                            <Typography variant="subtitle2">
                                Айдын Диасулы
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Количество участников:
                            </Typography>
                            <Typography variant="subtitle2">
                                12
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Результат за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                🥇
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Рейтинг за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                +2 🚀
                            </Typography>
                        </Box>
                        <Chip
                            style={{ marginTop: 5 }}
                            size="small"
                            label="Подробнее"
                            clickable
                            color="primary"
                            deleteIcon={<DoneIcon />}
                        />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Box className={classes.box}>
                            <Typography>
                                Лидер команды:
                            </Typography>
                            <Typography variant="subtitle2">
                                Айдын Диасулы
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Количество участников:
                            </Typography>
                            <Typography variant="subtitle2">
                                12
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Результат за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                🥇
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Рейтинг за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                +2 🚀
                            </Typography>
                        </Box>
                        <Chip
                            style={{ marginTop: 5 }}
                            size="small"
                            label="Подробнее"
                            clickable
                            color="primary"
                            deleteIcon={<DoneIcon />}
                        />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Box className={classes.box}>
                            <Typography>
                                Лидер команды:
                            </Typography>
                            <Typography variant="subtitle2">
                                Айдын Диасулы
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Количество участников:
                            </Typography>
                            <Typography variant="subtitle2">
                                12
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Результат за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                🥇
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Рейтинг за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                +2 🚀
                            </Typography>
                        </Box>
                        <Chip
                            style={{ marginTop: 5 }}
                            size="small"
                            label="Подробнее"
                            clickable
                            color="primary"
                            deleteIcon={<DoneIcon />}
                        />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Box className={classes.box}>
                            <Typography>
                                Лидер команды:
                            </Typography>
                            <Typography variant="subtitle2">
                                Айдын Диасулы
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Количество участников:
                            </Typography>
                            <Typography variant="subtitle2">
                                12
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Результат за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                🥇
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Рейтинг за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                +2 🚀
                            </Typography>
                        </Box>
                        <Chip
                            style={{ marginTop: 5 }}
                            size="small"
                            label="Подробнее"
                            clickable
                            color="primary"
                            deleteIcon={<DoneIcon />}
                        />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Box className={classes.box}>
                            <Typography>
                                Лидер команды:
                            </Typography>
                            <Typography variant="subtitle2">
                                Айдын Диасулы
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Количество участников:
                            </Typography>
                            <Typography variant="subtitle2">
                                12
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Результат за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                🥇
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Рейтинг за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                +2 🚀
                            </Typography>
                        </Box>
                        <Chip
                            style={{ marginTop: 5 }}
                            size="small"
                            label="Подробнее"
                            clickable
                            color="primary"
                            deleteIcon={<DoneIcon />}
                        />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Box className={classes.box}>
                            <Typography>
                                Лидер команды:
                            </Typography>
                            <Typography variant="subtitle2">
                                Айдын Диасулы
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Количество участников:
                            </Typography>
                            <Typography variant="subtitle2">
                                12
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Результат за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                🥇
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Рейтинг за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                +2 🚀
                            </Typography>
                        </Box>
                        <Chip
                            style={{ marginTop: 5 }}
                            size="small"
                            label="Подробнее"
                            clickable
                            color="primary"
                            deleteIcon={<DoneIcon />}
                        />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Box className={classes.box}>
                            <Typography>
                                Лидер команды:
                            </Typography>
                            <Typography variant="subtitle2">
                                Айдын Диасулы
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Количество участников:
                            </Typography>
                            <Typography variant="subtitle2">
                                12
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Результат за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                🥇
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Рейтинг за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                +2 🚀
                            </Typography>
                        </Box>
                        <Chip
                            style={{ marginTop: 5 }}
                            size="small"
                            label="Подробнее"
                            clickable
                            color="primary"
                            deleteIcon={<DoneIcon />}
                        />
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Box className={classes.box}>
                            <Typography>
                                Лидер команды:
                            </Typography>
                            <Typography variant="subtitle2">
                                Айдын Диасулы
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Количество участников:
                            </Typography>
                            <Typography variant="subtitle2">
                                12
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Результат за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                🥇
                            </Typography>
                        </Box>
                        <Box className={classes.box}>
                            <Typography >
                                Рейтинг за месяц:
                            </Typography>
                            <Typography variant="subtitle2">
                                +2 🚀
                            </Typography>
                        </Box>
                        <Chip
                            style={{ marginTop: 5 }}
                            size="small"
                            label="Подробнее"
                            clickable
                            color="primary"
                            deleteIcon={<DoneIcon />}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
};


export default Dashboard
