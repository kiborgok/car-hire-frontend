import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { getCurrentUser } from "../services/authService";

const ClientMovies = ({ onRent }) => {
  const user = getCurrentUser();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState({
    _id: "",
    name: "All Genres",
  });
  const pageSize = 4;
  const [loading, setLoading] = useState(true);
  const [lstLoading, setLstloading] = useState(true);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      const { data } = await getMovies();
      const clientMovies = data.filter((m) =>
        m.clientId ? m.clientId._id === user._id : null
      );
      setMovies(clientMovies);
      setLoading(false);
    }
    fetchMovies();
  }, [user._id]);

  useEffect(() => {
    async function fetchGenres() {
      const { data } = await getGenres();
      setGenres([{ _id: "", name: "All Genres" }, ...data]);
      setLstloading(false);
    }
    fetchGenres();
  }, []);

  const handleDelete = async (movie) => {
    const origialMovies = movies;
    const newMovies = movies.filter((m) => m._id !== movie._id);
    setMovies(newMovies);
    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This movie has already been deleted");
      setMovies(origialMovies);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLike = (movie) => {
    const arrayOfMovies = [...movies];
    const index = arrayOfMovies.indexOf(movie);
    arrayOfMovies[index] = { ...arrayOfMovies[index] };
    arrayOfMovies[index].liked = !arrayOfMovies[index].liked;
    setMovies(arrayOfMovies);
  };

  const getPageData = () => {
    let filtered = movies;

    if (searchQuery) {
      filtered = movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = movies.filter((m) => m.genre._id === selectedGenre._id);
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movieItems = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movieItems };
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const { totalCount, data: movieItems } = getPageData();

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          lstLoading={lstLoading}
          items={genres}
          onItemSelect={handleGenreSelect}
          selectedItem={selectedGenre}
          searchValue={searchQuery}
        />
      </div>
      <div className="col">
        <>
          {user && (user.isClient || user.isSuperAdmin) && (
            <Link to="/movies/new" className="btn btn-primary my-2">
              New Movie
            </Link>
          )}
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={handleSearch} />
          <MoviesTable
            loading={loading}
            movies={movieItems}
            sortColumn={sortColumn}
            onLike={handleLike}
            onDelete={handleDelete}
            onSort={handleSort}
            onRent={onRent}
          />
          <Pagination
            itemsCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </>
      </div>
    </div>
  );
};

export default ClientMovies;
