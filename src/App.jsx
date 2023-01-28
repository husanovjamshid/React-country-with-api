import "bootstrap/dist/css/bootstrap.min.css";
import { Item } from "./components/Item";
import { Header } from "./components/Headers";
import { useEffect, useState, useRef } from "react";
import search from ".././src/assets/img/search.svg";
import loading from ".././src/assets/img/loading1.gif";
import error from ".././src/assets/img/404.png";
import { Single } from "./components/pages/Single";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

function App() {
  let [country, setCountry] = useState({
    loading: true,
    data: [],
    err: "",
  });

  useEffect(() => {
    setCountry({ loading: true, data: [], err: "" });
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((data) => {
        if (data.status === 200) {
          setCountry({ loading: false, data: data.data, err: "" });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  let changeSelect = (evt) => {
    function allRegion() {
      axios
        .get(`https://restcountries.com/v3.1/region/${evt.target.value}`)
        .then((data) => {
          if (data.status === 200) {
            setCountry({ loading: false, data: data.data, err: "" });
          }
        });
    }

    allRegion();
  };

  let inputValue = useRef();
  let changeForm = (evt) => {
    evt.preventDefault();

    axios
      .get(
        `https://restcountries.com/v3.1/name/${inputValue.current.value.trim()}`
      )
      .then((data) => {
        if (data.status === 200) {
          setCountry({ loading: false, data: data.data, err: "" });
        }
      })
      .catch((err) => console.log(err));

    inputValue.current.value = "";
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {country.loading ? (
                  <img className="loading" src={loading} alt="" />
                ) : (
                  ""
                )}
                {country.err ? (
                  <img className="loading" src={error} alt="" />
                ) : (
                  ""
                )}
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
                    : ""}
                </ul>
              </>
            }
          />
          <Route path="/item/:names" element={<Single />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
