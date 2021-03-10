import React, { useEffect, useState } from 'react'
import {
    Row,
    Col,
    Alert,
    Card,
    CardBody
} from 'reactstrap'
import { Link, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { AvField, AvForm } from 'availity-reactstrap-validation'
import { loginUserAction, apiError } from '../store/actions'
import "./Login.css"
import profile from './profile-img.png'

// Sultan
// gss280697


const Login = (props) => {
    const [state, setState] = useState({
        username: 'Sultan',
        password: 'gss280697'
    })

    const handleValidSubmit = (event, values) => {
        props.loginUserAction(values, props.history)
    }

    useEffect(() => {
        props.apiError("")
    }, [])

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return (
        <React.Fragment>
            <div className="home-btn d-none d-sm-block">
                <Link to="/" className="text-dark">
                    <i className="bx bx-home h2" />
                </Link>
            </div>
            <div className="account-pages my-5 pt-sm-5">
                <div className="container">
                    <Row className="justify-content-center row">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="overflow-hidden card">
                                <div className="bg-soft-primary">
                                    <Row className="row">
                                        <Col className="col-7">
                                            <div className="text-primary p-4">
                                                <h5 className="text-primary h5">Добро пожаловать !</h5>
                                                <p>Войдите чтобы продолжить...</p>
                                            </div>
                                        </Col>
                                        <Col className="col-5 align-self-end">
                                            <img src={profile} alt="" className="img-fluid" />
                                        </Col>
                                    </Row>
                                </div>
                                <CardBody className="pt-0 card-body">
                                    <div className="p-2">
                                        <AvForm
                                            className="form-horizontal"
                                            onValidSubmit={handleValidSubmit}
                                        >
                                            {props.error && props.error ? (
                                                <Alert color="danger">{props.error}</Alert>
                                            ) : null}

                                            <div className="form-group mb-3">
                                                <AvField
                                                    name="username"
                                                    label="Логин"
                                                    value={state.username}
                                                    className="form-control"
                                                    placeholder="Enter email"
                                                    onChange={onChange}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <AvField
                                                    name="password"
                                                    label="Пароль"
                                                    value={state.password}
                                                    type="password"
                                                    required
                                                    onChange={onChange}
                                                    placeholder="Enter Password"
                                                />
                                            </div>


                                            <div className="mt-3 d-grid">
                                                <button
                                                    className="btn btn-primary btn-block waves-effect waves-light"
                                                    type="submit"
                                                >
                                                    Войти
                                                </button>
                                            </div>


                                            <div className="mt-4 text-center">
                                                <Link to="/forgot-password" className="text-muted">
                                                    <i className="mdi mdi-lock mr-1" /> Забыли пароль ?
                                                </Link>
                                            </div>
                                        </AvForm>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = state => {
    const { error } = state.Login
    return { error }
}

export default withRouter(
    connect(mapStateToProps, { loginUserAction, apiError })(Login)
)

