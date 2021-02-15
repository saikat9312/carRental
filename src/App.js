import { useEffect, useState } from "react";
import carIcon from "./car.svg";
import "./App.css";
import Booknow from "./Booknow";

function App() {
  const [carList, setCarList] = useState([]);
  const [isBooknow, setIsBooknow] = useState(false);
  const [selectedCarDetail, setSelectedCarDetail] = useState();

  useEffect(() => {
    fetch("/vehicle")
      .then((results) => results.json())
      .then((data) => {
        setCarList(data);
      });
  }, []);

  const handleClick = (id) => {
    const carDetail = carList.filter( i => i.id === id)[0]
    setSelectedCarDetail(carDetail)
    setIsBooknow(true);
  };

  return (
    <div>
      {isBooknow ? <Booknow {...selectedCarDetail} /> : null}
      <div className="heading">Online Car Rental Services </div>
      <div className="container">
        {carList.map((item) => {
          return (
            <div
              key={item.id}
              className="card"
              onClick={() => handleClick(item.id)}
            >
              <img src={carIcon} alt="Car logo" className="img" />
              <h1>{item.name}</h1>
              <h2>{item.price} (Estimated Price)</h2>
              <div className="rental-price">{item.rental_price}</div>
              <div className="vehicle-type">{item.type}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
