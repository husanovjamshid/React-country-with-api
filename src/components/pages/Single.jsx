import back from "../../assets/img/call-made.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import loading from "../../assets/img/loading1.gif";
import { Link } from "react-router-dom";


export const Single = () => {
  let [getCountry, setGetCountry] = useState({
    loading: true,
    data: [],
  });
  let { names } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${names}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setGetCountry({
            loading: false,
            data: data,
          });
        }
      })
      .catch((err) => console.log(err));
    // console.log(getCountry);
  }, []);
  //   console.log(names);

  return (
    <>
      {getCountry.loading ? (
        <img className="loading" src={loading} alt="" />
      ) : (
        ""
      )}
      <a
        className="back__btn d-flex align-items-center"
        onClick={() => navigate(-1)}
      >
        <img className="me-2" src={back} alt="" /> Back
      </a>

      {getCountry.data.map((item) => (
        <div className="row d-flex align-items-center justify-content-evenly pb-5">
          <div className="single__img col-12 col-sm-12  col-md-5 ">
            <img
              // width="560px"
              height="401px"
              className="rounded-3"
              src={item.flags.svg}
              alt=""
            />
          </div>
          <div className="country__info__right col-12 col-sm-12  col-md-7">
            <div className="country__wrap ">
              <h3 className="country__name">{item.name?.common}</h3>
              <div className="row">
                <div className="col-md-6">
                  <p className="country__info">
                    <span className="fw-bold">Native Name: </span>
                    {item.name.official}
                  </p>
                  <p className="country__info">
                    <span className="fw-bold">Population: </span>
                    {item.population}
                  </p>
                  <p className="country__info">
                    <span className="fw-bold">Region: </span> {item.region}
                  </p>
                  <p className="country__info">
                    <span className="fw-bold">Sub Region: </span>{" "}
                    {item.subregion}
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="country__info">
                    <span className="fw-bold">Top Level Domain: </span>{" "}
                    {item.tld}
                  </p>
                  <p className="country__info">
                    <span className="fw-bold">Capital: </span> {item.capital}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
