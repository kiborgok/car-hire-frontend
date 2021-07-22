import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
//import { Link } from "react-router-dom";
import Form from "./common/form";
import { register } from "../services/userService";
import { loginWithJwt, getCurrentUser } from "../services/authService";

class RegisterForm extends Form {
    state = {
        data: {
            name: "",
            username: "",
            password: ""
        },
        errors: {}
    };

    schema = {
        name: Joi.string().required().label("Name"),
        username: Joi.string().required().email().label("Username"),
        password: Joi.string().required().min(5).label("Password")
    };
    
    doSubmit = async () => {
        try {
            const response = await register(this.state.data);
            loginWithJwt(response.headers["x-auth-token"]);
            window.location = "/";
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
    return (
      <>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Register")}
          {/* {
              <h6 className="p-3">Client Register <Link to="/clientRegister">HERE</Link>
            </h6>
          } */}
        </form>
      </>
    );
    }
}
export default RegisterForm;
