import "bootstrap/dist/css/bootstrap.min.css";
import { Item } from "./components/Item";
import { Header } from "./components/Headers";
import { useEffect, useState, useRef } from "react";
import search from ".././src/assets/img/search.svg";
import loading from ".././src/assets/img/loading1.gif";
import error from ".././src/assets/img/404.png";

function App() {
  let [country, setCountry] = useState({
    loading: true,
    data: [],
    err: "",
  });

  useEffect(() => {
    setCountry({ loading: true, data: [], err: "" });
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCountry({ loading: false, data: data, err: "" });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  let changeSelect = (evt) => {
    function allRegion() {
      fetch(`https://restcountries.com/v3.1/region/${evt.target.value}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCountry({ loading: false, data: data, err: "" });
          }
        });
    }

    allRegion();
  };

  let inputValue = useRef();
  let changeForm = (evt) => {
    evt.preventDefault();

    fetch(
      `https://restcountries.com/v3.1/name/${inputValue.current.value.trim()}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCountry({ loading: false, data: data, err: "" });
        }
      })
      .catch((err) => console.log(err));

    inputValue.current.value = "";
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        {country.loading ? (
          <img className="loading" src={loading} alt="" />
        ) : (
          ""
        )}
        {country.err ? <img className="loading" src={error} alt="" /> : ""}

        <div className="mt-5 row d-flex justify-content-between">
          <form onSubmit={changeForm} className="col-md-6">
            <div className="input-group input__group">
              <input
                required
                ref={inputValue}
                className="input ms-3"
                type="text"
                placeholder="Search for a country…"
              />
              <button className="btn btn-light" type="submit">
                <img src={search} alt="" />
              </button>
            </div>
          </form>

          <div className="col-md-3">
            <select onChange={changeSelect} className="form-select">
              <option disabled>Open this select menu</option>
              <option value="europe">Europe</option>
              <option value="antarctic">Antarctic</option>
              <option value="oceania">Oceania</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="americas">Americas</option>
            </select>
          </div>
        </div>
        <ul className="row gy-4 mt-4 d-flex list-unstyled">
          {country.data.length
            ? country.data.map((item) => (
                <Item key={item.name.common} obj={item} />
              ))
            : ''}
        </ul>
      </div>
    </div>
  );
}

export default App;
