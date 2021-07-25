import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/not-found";
import MovieForm from "./components/movieForm";
import Profile from "./components/profile";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import LogOut from "./components/logOut";
import { getCurrentUser } from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import CustomerForm from "./components/customerForm";
import ClientMovies from "./components/clientMovies";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState();
  const [movieId, setMovieId] = useState();
  useEffect(() => {
    const user = getCurrentUser();
    setUser(user);
  }, []);

  const handleRent = movie_id => {
    setMovieId(movie_id);
  }
  return (
    <div className="wrapper">
      <NavBar user={user} />
      <div id="content">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button type="button" id="sidebarCollapse" className="navbar-btn">
              <span></span>
              <span></span>
              <span></span>
            </button>
            <h3 style={{ marginBottom: "0" }}>Super Movies</h3>
            <button
              className="btn btn-dark d-inline-block d-lg-none ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fa fa-align-justify"></i>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav ml-auto">
                {/* <li className="nav-item active">
                  <a className="nav-link" href="#">
                    Page
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Page
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Page
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Page
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/profile" component={Profile} />
          <Route path="/logout" component={LogOut} />
          <Route path="/register" component={RegisterForm} />
          <ProtectedRoute
            path="/movies/:id"
            render={(props) => <MovieForm {...props} user={user} />}
          />
          <Route
            path="/movies"
            render={(props) => (
              <Movies {...props} user={user} onRent={handleRent} />
            )}
          />
          <ProtectedRoute
            path="/mymovies"
            render={(props) => <ClientMovies {...props} onRent={handleRent} />}
          />
          <ProtectedRoute
            path="/customers/:id"
            render={(props) => (
              <CustomerForm {...props} movieId={movieId} user={user} />
            )}
          />
          <ProtectedRoute
            path="/customers"
            render={(props) => <Customers {...props} user={user} />}
          />
          <ProtectedRoute
            path="/rentals"
            render={(props) => <Rentals {...props} user={user} />}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
