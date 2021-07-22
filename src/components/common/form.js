import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validate = () => {
        const options = { abortEarly: false };
        const {error} = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;
        const errorsObject = {};
        for (let item of error.details) {
            errorsObject[item.path[0]] = item.message; 
        }
        return errorsObject;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value }
        const onChangeSchema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, onChangeSchema);
        return error ? error.details[0].message : null;

    }

    handleChange = ({ currentTarget }) => {
        const errsObj = { ...this.state.errors };
        const errMsg = this.validateProperty(currentTarget);
        if (errMsg) errsObj[currentTarget.name] = errMsg;
        else delete errsObj[currentTarget.name];

        const accountData = { ...this.state.data };
        accountData[currentTarget.name] = currentTarget.value;
        this.setState({ errors: errsObj });
        this.setState({ data: accountData })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const errorsObj = this.validate();
        this.setState({
            errors: errorsObj || {}
        });
        console.log(errorsObj);
        if (errorsObj) return;
        
        this.doSubmit();
    };

    renderButton = label => <button disabled={this.validate()} className="btn btn-primary">{label}</button>

    renderSelect(name, label, options) {
        const { data, errors } = this.state;

        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

    renderInput(name, label, type="text") {
        const { errors, data } = this.state;
        return (
            <Input
                type={type}
                name={name}
                label={label}
                value={data[name]}
                onChange={this.handleChange}
                error={errors[name]}
            />
        )
    } 

}

export default Form;