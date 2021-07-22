import React from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import { getCurrentUser } from "../services/authService";

const MoviesTable = ({
  movies,
  onLike,
  onDelete,
  sortColumn,
  onSort,
  onRent,
  loading,
}) => {
  const user = getCurrentUser();
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) =>
        user && user.isSuperAdmin ? (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ) : (
          <p>{movie.title}</p>
        ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => {
        const liked = movie.likes.filter(
          (l) => l.userId === (user ? user._id : null)
        );
        return (
          <>
            {
              user && !user.isSuperAdmin ? <Like
                liked={liked[0] ? liked[0].liked : null}
                onClick={() => onLike(movie)}
              /> : null
            }
          </>
        );
      }
    },
    // {
    //   key: "rent",
    //   content: (movie) =>
    //     user && user.isClient ? null : (
    //       <Link
    //         onClick={() => {
    //           onRent(movie._id);
    //         }}
    //         className="btn btn-warning btn-sm"
    //         to={`/customers/new`}
    //       >
    //         Rent
    //       </Link>
    //     ),
    // },
    {
      key: "delete",
      content: (movie) => {
        if (user && user.isSuperAdmin)
          return (
            <button
              onClick={() => onDelete(movie)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          );
        if (user && (movie.clientId ? movie.clientId._id === user._id : null))
          return (
            <button
              onClick={() => onDelete(movie)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          );
      },
    },
  ];

  return (
    <Table
      loading={loading}
      data={movies}
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
};

export default MoviesTable;
