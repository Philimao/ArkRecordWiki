import React, { useRef, useState } from "react";
import { nanoid } from "nanoid";

export default function SearchForm({
  menuArray,
  operatorArray,
  handleSearch,
  searchValue,
  setSearchValue,
  searchType,
  setSearchType,
}) {
  const types = ["关卡", "干员"];
  const [optionList, setOptionList] = useState([]);
  const ph = ["活动名或关卡名...", "干员名称（试运行中）"];
  const [placeholder, setPlaceholder] = useState(ph[0]);
  const keyArray = useRef(
    Array(5)
      .fill(0)
      .map(() => nanoid())
  );

  function handleChange(evt) {
    setSearchValue(evt.target.value);
    if (evt.target.value.length === 0) {
      setOptionList([]);
    } else {
      if (searchType === "关卡") {
        setOptionList(
          menuArray
            .filter((item) => item.indexOf(evt.target.value.toUpperCase()) > -1)
            .slice(0, 5)
        );
      } else if (searchType === "干员")
        setOptionList(
          operatorArray
            .filter((item) => item.indexOf(evt.target.value) > -1)
            .slice(0, 5)
        );
    }
  }

  /**
   * Go further
   * No re-render if option list is not changed
   */
  return (
    <form className="d-flex" id="search_form" onSubmit={handleSearch}>
      <div className="input-group me-2 bg-white rounded-3">
        <input
          list="buttons"
          className="form-control"
          id="search_form_input"
          type="search"
          placeholder={placeholder}
          aria-label="Search"
          value={searchValue}
          onChange={handleChange}
        />
        <datalist id="buttons">
          {optionList.map((item, index) => (
            <option value={item} key={keyArray.current[index]} />
          ))}
        </datalist>
        <button
          id="search_type"
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {searchType}
        </button>
        <ul
          className="dropdown-menu dropdown-menu-end"
          style={{ minWidth: "5rem" }}
        >
          {types.map((item, index) => (
            <li
              role="button"
              className="dropdown-item"
              key={item}
              onClick={() => {
                setSearchType(item);
                setPlaceholder(ph[index]);
              }}
              tabIndex="0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <button className="btn btn-outline-light" type="submit">
        <i className="fas fa-search" />
      </button>
    </form>
  );
}
