import React, {useState} from 'react'
import {
    Container,
    TextField,
    Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            margin: theme.spacing(1),
            width: 200,
            height: '100%',
        },
    },
    container: {
        '& .MuiContainer-root': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        }
    },
    input: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));


const Login = () => {
    const classes = useStyles();
    const [data, setData] = useState({
        username: 'Sultan',
        password: 'gss280697'
    })
    const handleSubmit = () => {
        axios.post('http://localhost:8000/accounts/login/', data, {
            headers: { 'X-CSRFTOKEN': csrfCookie }
        })
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }
    return (
        <Container maxWidth="sm" className={classes.container}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    label="Username"
                    value={data.username}
                    name="username"
                    variant="outlined"
                    onChange={e => setData({
                        ...data,
                        username: e.target.value
                    })}
                />
                <TextField
                    label="Password"
                    value={data.password}
                    type="password"
                    name="password"
                    variant="outlined"
                    onChange={e => setData({
                        ...data,
                        password: e.target.value
                    })}
                />
                <Button onClick={handleSubmit}>
                    Войти
                </Button>
            </form>
        </Container>
    )
}


export default Login
