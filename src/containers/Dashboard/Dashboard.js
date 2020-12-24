import React from "react";
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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


const Dashboard = () => {
    return (
        <Container maxWidth="xl">
            <Grid container>
                <Grid item>

                </Grid>
                <Grid item>

                </Grid>
            </Grid>
        </Container>
    )
};


export default Dashboard
