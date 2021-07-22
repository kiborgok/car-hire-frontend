import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import { toast } from "react-toastify";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().min(5).label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Daily Rental Rate"),
  };

    async fetchMovie(movieId) {
      try {
          const { data: movie } = await getMovie(movieId);
          this.setState({ data: this.mapToViewModel(movie) });
      } catch (ex) {
          if (ex.response && ex.response.status === 404)
              this.props.history.replace("/not-found");
      }
  }

  async fetchGenres() {
    const { data } = await getGenres();
    this.setState({ genres: data });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    this.fetchMovie(movieId);
  }

  componentDidMount() {
    this.fetchGenres();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    if (!(this.props.user.isClient || this.props.user.isSuperAdmin)) {
      return toast.warning("Not allowed");
    }
    await saveMovie(this.state.data);
    window.location = "/movies";
  };
  render() {
    return (
      <>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </>
    );
  }
}

export default MovieForm;
