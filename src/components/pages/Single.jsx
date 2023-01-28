import back from "../../assets/img/call-made.svg";
import belgium from "../../assets/img/belgium.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Single = () => {
  let [getCountry, setGetCountry] = useState();
  let { names } = useParams();

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${names}`)
      .then((data) => setGetCountry(data.data?.[0]))
      .catch((err) => console.log(err));
    console.log(getCountry);
  }, [names]);
  //   console.log(names);

  return (
    <>
      <a className="back__btn d-flex align-items-center" href="#">
        <img className="me-2" src={back} alt="" /> Back
      </a>

      <div className="row pb-5">
        <div className="col-md-6">
          <img width="560px" className="rounded-3" src={belgium} alt="" />
        </div>
        <div className="col-md-6">
          <div className="country__wrap mt-5">
            <h3 className="country__name">{getCountry.name.common}</h3>
            <div className="row">
              <div className="col-md-6">
                <p className="country__info">
                  <span className="fw-bold">
                    Native Name: {getCountry.name.official}
                  </span>
                </p>
                <p className="country__info">
                  <span className="fw-bold">
                    Population: {getCountry.population}
                  </span>
                </p>
                <p className="country__info">
                  {/* <span className="fw-bold">Region:</span> {country.region} */}
                </p>
                <p className="country__info">
                  {/* <span className="fw-bold">Sub Region:</span> {country.subregion} */}
                </p>
                <p className="country__info">
                  {/* <span className="fw-bold">Capital:</span> {country.capital} */}
                </p>
              </div>
              <div className="col-md-6">
                <p className="country__info">
                  <span className="fw-bold">Top Level Domain:</span> .be
                </p>
                {/* <p className="country__info">
                  <span className="fw-bold">Currencies:</span> {country.currencies?.GBP?.name}
                </p> */}
                <p className="country__info">
                  {/* <span className="fw-bold">Languages:</span> {country.languages} */}
                </p>
              </div>
            </div>
            <div className="d-flex mt-5 gap-3">
              <p className="country__info">
                <span className="fw-bold">Border Countries:</span>
              </p>
              <a className="lang__link" href="#">
                France
              </a>
              <a className="lang__link" href="#">
                Germany
              </a>
              <a className="lang__link" href="#">
                Netherlands
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
