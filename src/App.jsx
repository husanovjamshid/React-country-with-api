import "bootstrap/dist/css/bootstrap.min.css";
import { Item } from "./components/Item";
import { Header } from "./components/Headers";
import { useEffect, useState, useRef } from "react";
import search from ".././src/assets/img/search.svg";

function App() {
 

  let [country, setCountry] = useState({
    loading: true,
    data: [],
    err: "",
  });

  let inputValue = useRef();
  let changeForm = (evt) => {
    evt.preventDefault();

    fetch(
      `https://restcountries.com/v3.1/name/${inputValue.current.value.trim()}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCountry({ ...country, loading: false, data: data, err: "" });
        }
      })
      .catch((err) => {
        if (err) {
          setCountry({
            ...country,
            loading: false,
            data: [],
            err: err.messages,
          });
        }
      });

    inputValue.current.value = "";
  };

  useEffect(() => {
    setCountry({ ...country, loading: true, data: [], err: "" });
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCountry({ ...country, loading: false, data: data, err: "" });
        }
      })
      .catch((err) => {
        if (err) {
          setCountry({
            ...country,
            loading: false,
            data: [],
            err: err.messages,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="mt-5 row d-flex justify-content-between">
          <form onSubmit={changeForm} className="col-md-6">
            <div className="input-group input__group">
              <input
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
            <select className="form-select">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <ul className="row gy-4 mt-4 d-flex list-unstyled">
          {country.data.map((item) => (
            <Item key={item.name.common} obj={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
