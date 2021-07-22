import React from 'react';

const ListGroup = ({ items, onItemSelect, selectedItem, textProperty, valueProperty, lstLoading }) => {
    return (
      lstLoading ?
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div> : !lstLoading && items.length === 0 ? "There are no genres in the database":<ul className="list-group lstGroupWidth">
          {items.map((item) => (
            <li
              key={item[valueProperty]}
              onClick={() => onItemSelect(item)}
              className={
                selectedItem
                  ? item.name === selectedItem.name
                    ? "list-group-item active"
                    : "list-group-item"
                  : "list-group-item"
              }
            >
              {lstLoading ? "Loading..." : item[textProperty]}
            </li>
          ))}
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty : "name",
    valueProperty : "_id"
}

export default ListGroup;
