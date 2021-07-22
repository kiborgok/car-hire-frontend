import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login, getCurrentUser } from "../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
    state = {
        data: {
            username: "",
            password: ""
        },
        errors: {}
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    };
    
    doSubmit = async () => {
        try {
            const { data } = this.state;
            await login(data.username, data.password);

            const { state } = this.props.location;
            window.location = state ? state.from.pathname : "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({errors})
            }
        }
    };

    render() {
        if(getCurrentUser()) return <Redirect to="/" />
    return <>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton("Login")}
            {/* {<h6 className="p-3">Client Login <Link to="/clientLogin">HERE</Link></h6>} */}
        </form>
    </>
    }
}
export default LoginForm;