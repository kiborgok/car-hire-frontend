import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCustomer, saveCustomer } from "../services/customerService";
import { getMovie } from "../services/movieService";
import { saveRental } from "../services/rentalService";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

class CustomerForm extends Form {
  state = {
    data: {
      name: "",
      phone: "",
      //dateReturned: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().min(5).label("Name"),
    phone: Joi.string().required().label("Phone"),
    //dateReturned: Joi.string().required().label("Date Returned")
  };

  async fetchCustomer(customerId) {
    try {
      const { data: customer } = await getCustomer(customerId);
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  componentDidMount() {
    const customerId = this.props.match.params.id;
    if (customerId === "new") return;
    this.fetchCustomer(customerId);
  }

  mapToViewModel(customer) {
    return {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    };
  }

  async fetchMovie(movieId) {
    try {
      const { data: movie } = await getMovie(movieId);
      if (movie.numberInStock === 0) {
        return toast.error("Movie not in stock");
      }
    } catch (ex) {
      toast.error(ex.response.message);
    }
  }

  doSubmit = async () => {
    if (this.props.user && (this.props.user.isAdmin || this.props.user.isSuperAdmin)) {
      return toast.warning("You are not a user");
    }
    try {
      await this.fetchMovie(this.props.movieId);
      const { data: customer } = await saveCustomer(this.state.data);
      const rentalRequest = {
        customerId: customer._id,
        movieId: this.props.movieId,
        //dateReturned: this.state.data.dateReturned
      };
      await saveRental(rentalRequest);
    } catch (ex) {
      toast(ex.response.message);
    }
    setTimeout(() => (window.location = "/customers"), 1000);
  };
  render() {
      if (!this.props.movieId && this.props.match.params.id === "new")
        return <Redirect to="/movies" />;
    return (
      <>
        <h1>Customer Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("phone", "Phone")}
          {/* {this.renderInput("dateReturned", "Date Returned", "date")} */}
          {this.renderButton("Save")}
        </form>
      </>
    );
  }
}

export default CustomerForm;
