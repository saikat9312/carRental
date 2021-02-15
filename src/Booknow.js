import { useState } from "react";
import "./App.css";

const Booknow = (props) => {
  const [duration, setDuration] = useState();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { fullName, email, phone, ...props };
    console.log("payload", payload);
    fetch("/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((results) => results.json())
      .then((data) => {
        alert(data.message);
        throw new Error();
      })
      .catch((e) => {
        alert("Error!");
        console.log("EE", e);
      });
  };

  return (
    <form className="request-form">
      <div className="content">
        <h1>Booknow</h1>
        <hr />
        <label>Model</label>
        <div className="model-name">{props.name}</div>
        <br />
        <label>Duration</label>
        <div onChange={onChangeDuration}>
          <input type="radio" value="1" name="duration" />
          <label> 1 Month</label>
          <br />
          <input type="radio" value="3" name="duration" />
          <label> 3 Month</label>
          <br />
          <input type="radio" value="6" name="duration" />
          <label> 6 Month</label>
          <br />
          <input type="radio" value="12" name="duration" />
          <label> 1 Year</label>
          <br />
          {duration ? (
            <>
              <div>Rental Price: {props.rental_price}/Month</div>
              <div className="amount-payable">
                Payable Amount: {props.rental_price * duration}
              </div>
            </>
          ) : null}
        </div>
        <hr />
        <h2>Your Details</h2>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            name="fullname"
            onChange={(e) => setFullName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Phone</label>
          <input
            type="number"
            value={phone}
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button className="frm-action-btn button" onClick={handleSubmit}>
          Submit
        </button>
        <button>Close</button>
      </div>
    </form>
  );
};

export default Booknow;
