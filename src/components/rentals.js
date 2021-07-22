import React, { useState, useEffect } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utils/paginate";
import SearchBox from "./common/searchBox";
import _ from "lodash";
import { getRentals } from "../services/rentalService";
import { getGenres } from "../services/genreService";
import RentalsTable from "./rentalsTable";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState({
    _id: "",
    name: "All Genres",
  });
  const pageSize = 4;
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState({ path: "movie.title", order: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchRentals() {
      const { data } = await getRentals();
      setRentals(data);
      setLoading(false);
    }
    fetchRentals();
  }, []);

  useEffect(() => {
    async function fetchGenres() {
      const { data } = await getGenres();
      setGenres([{ _id: "", name: "All Genres" }, ...data]);
      setLoading(false);
    }
    fetchGenres();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageData = () => {
    let filtered = rentals;

    if (searchQuery) {
      filtered = rentals.filter(r =>
        r.movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = rentals.filter(r => r.movie.genre._id === selectedGenre._id);
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const rentalItems = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: rentalItems };
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

  const { totalCount, data: rentalItems } = getPageData();

  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          onItemSelect={handleGenreSelect}
          selectedItem={selectedGenre}
          searchValue={searchQuery}
        />
      </div>
      <div className="col">
        {loading ? <h4>Loading...</h4> : null}
        {rentals.length === 0 && loading === false ? (
          <h2>There are no rentals in the database.</h2>
        ) : loading ? null : (
          <>
            <p>Showing {totalCount} rentals in the database.</p>
            <SearchBox value={searchQuery} onChange={handleSearch} />
            <RentalsTable
              rentals={rentalItems}
              sortColumn={sortColumn}
              onSort={handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Rentals;
