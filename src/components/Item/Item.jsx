import "./item.scss";

export let Item = ({ obj }) => {
  return (
    <li className="col-md-3">
      <div className="card">
        <img
          src={obj.flags.svg}
          width="100%"
          height="150px"
          className="card-img-top"
          alt={obj.name.common}
        />
        <div className="card-body">
          <h5 className="card-title mb-3"><strong>{obj.name.common}</strong></h5>
          <p className="m-0"> <strong>Population:</strong> {obj.population}</p>
          <p className="my-1"> <strong>Region:</strong> {obj.region} </p>
          <p><strong>Capital: </strong> {obj?.capital}</p>
        </div>
      </div>
    </li>
  );
};
