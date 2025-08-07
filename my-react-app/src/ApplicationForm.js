// import { useState } from "react";
import axios from 'axios';
import './ApplicationForm.css';
import React, { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import {useNavigate} from 'react-router-dom';

  
const ApplicationForm = () => {
  const [serialnumber, setSerialnumber] = useState("");
  const [firstname, setFirstname] = useState("");
  const [isFirstnameValid, setIsFirstnameValid] = useState(true);
  const [lastname, setLastname] = useState("");
  const [isLastnameValid, setIsLastnameValid] = useState(true);
  const [birthdate, setBirthdate] = useState("");
  // const [error, setError] = useState('');
  const [age, setAge] = useState("");
  const [appointmentdate, setAppointmentdate] = useState("");
  const [adderess, setAdderess] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  // const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [maritalstatus, setMaritalStatus] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isPincodeValid, setIsPincodeValid] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

 
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setIsValidEmail(emailRegex.test(value));
  };

  const handleFirstnameChange = (e) => {
    const value = e.target.value;
    setFirstname(value);
    const nameRegex = /^[A-Za-z\s]+$/;
    setIsFirstnameValid(nameRegex.test(value));
  };
 const handleChange = (value, country, e, formattedValue) => {
    setPhone(value);
    setIsValid(value.length >= 11 && value.length <= 15); // basic length check
  };
  const handleLastnameChange = (e) => {
    const value = e.target.value;
    setLastname(value);
    const nameRegex = /^[A-Za-z\s]+$/;
    setIsLastnameValid(nameRegex.test(value));
  };

  const handleBirthdateChange = (e) => {
    const date = e.target.value;
    setBirthdate(date);
    validateBirthdate(date);
  };

  const validateBirthdate = (dateString) => {
    const today = new Date();
    const selectedDate = new Date(dateString);

    // if (selectedDate > today) {
    //   setError("Birthdate cannot be in the future");
    //   return;
    // }

    const ageCalc = today.getFullYear() - selectedDate.getFullYear();
    const m = today.getMonth() - selectedDate.getMonth();
    const isBirthdayPassed = m > 0 || (m === 0 && today.getDate() >= selectedDate.getDate());
    const actualAge = isBirthdayPassed ? ageCalc : ageCalc - 1;

    setAge(actualAge);
    // setError(actualAge < 18 ? "Must be 18 or older" : "");
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setPincode(value);
      setIsPincodeValid(/^\d{6}$/.test(value));
    }
  };

  const handleBack = () => {
    navigate (-1);
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setPhone(value);
      setIsPhoneValid(/^\d{10}$/.test(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (serialnumber === "") return alert("Appointment number is empty");
    if (firstname === "" || !isFirstnameValid) return alert("Invalid or empty First name");
    if (lastname === "" || !isLastnameValid) return alert("Invalid or empty Last name");
    if (birthdate === "") return alert("Birth date is empty");
    if (age === "") return alert("Age is empty");
    if (appointmentdate === "") return alert("Appointment date is empty");
    if (adderess === "") return alert("Address is empty");
    if (city === "") return alert("City is empty");
    if (state === "") return alert("State is empty");
    if (pincode === "") return alert("Pincode is empty");
    if (!isPincodeValid) return alert("Pincode must be Exactly 6 digits");
    if (phone === "") return alert("Phone is empty");
    if (!isPhoneValid) return alert("Phone number must be exactly 10 digits");
    if (email === "") return alert("Email is empty");
    if (!isValidEmail) return alert("Invalid email format");
    if (maritalstatus === "") return alert("Marital status is empty");
    // if (error) return alert(error);

    axios.post('http://localhost:9090/savetoapplication', {
      serialnumber,
      firstname,
      lastname,
      birthdate,
      age,
      appointmentdate,
      adderess,
      city,
      state,
      pincode,
      phone,
      email,
      maritalstatus
    })
      .then(() => alert("Appointment Created"))
      .catch((error) => console.log(error));
  };

  return (
    <form className="ApplicationForm" onSubmit={handleSubmit}>
      <h1 className="heading">Online Medical Appointment</h1>

      <div className="form-row">
        <div className="form-group">
          <label>Appointment number*</label>
          <input
            type="text"
            value={serialnumber}
            className="input_saddow"
            style={{width: '200px',height: '30px',  border: '1px solid #ccc',
            borderRadius: '4px'}}
            onChange={(e) => setSerialnumber(e.target.value)}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>First name*</label>
          <input
            type="text"
            value={firstname}
            className="form-input"
            style={{width: '300px'}}
            onChange={handleFirstnameChange}
          />
          {!isFirstnameValid && (
            <p style={{ color: 'red', fontSize: '12px' }}>Only alphabets allowed</p>
          )}
        </div>
        <div className="form-group">
          <label>Last name*</label>
          <input
            type="text"
            value={lastname}
            className="form-input"
            style={{width: '300px'}}
            onChange={handleLastnameChange}
          />
          {!isLastnameValid && (
            <p style={{ color: 'red', fontSize: '12px' }}>Only alphabets allowed</p>
          )}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Birth date*</label>
          <input
            type="date"
            value={birthdate}
            className="form-input"
            style={{width: '300px'}}
            onChange={handleBirthdateChange}
          />
          {/* {error && <p style={{ color: 'red' }}>{error}</p>}/ */}
        </div>
        <div className="form-group">
          <label>Age*</label>
          <input
            type="number"
            value={age}
            className="form-input"
            style={{width: '200px'}}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>

      <div className="appointment_date">
        <label>Appointment date*</label>
        <input
          type="date"
          className="pointmentinpiut"
          style={{width: '300px'}}
          value={appointmentdate}
          onChange={(e) => setAppointmentdate(e.target.value)}
        />
      </div>

      <div className="form-group full-width">
        <label>Address*</label>
        <input
          type="text"
          value={adderess}
          className="form-input"
          onChange={(e) => setAdderess(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>City*</label>
          <select
            name="city"
            id="city"
            className="form-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select State</option>
            <option value="Chennai">Chennai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Cuddalore">Cuddalore</option>
            <option value="Dindugul">Dindugul</option>
            <option value="Erode">Erode</option>
            <option value="kanchipuram">Kanchipuram</option>
            <option value="Mudurai">Mudurai</option>
            <option value="Kumbakonam">Kumbakonam</option>
            <option value="Nagapattinam">Nagapattinam</option>
            <option value="Pudukottai">Pudukottai</option>
            <option value="Thanjavur">Thanjavur</option>
            <option value="Tirunelveli">Tirunelveli</option>
            <option value="Salem">Salem</option>
            <option value="Vellore">Vellore</option>
          </select>
        </div>
        <div className="form-group">
          <label>State*</label>
          <select
            name="state"
            id="state"
            className="form-input"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="">Select State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Goa">Goa</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Punjab">Punjab</option>
            <option value="Telangana">Telangana</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Pincode*</label>
          <input
            type="text"
            value={pincode}
            className="form-input"
            style={{width: '200px'}}
            onChange={handlePincodeChange}
            maxLength="6"
          />
          {!isPincodeValid && (
            <p style={{ color: 'red', fontSize: '12px' }}>
              Pincode must be exactly 6 digits.
            </p>
          )}
        </div>
           <div className="form-group">
      <label>Phone*</label>
      <PhoneInput
        country={'in'}
        value={phone}
        onChange={handleChange}
        inputStyle={{
          width: '300px',
        }}
        containerStyle={{ marginBottom: '10px' }}
        inputProps={{
          required: true,
          placeholder: 'Enter phone number',
        }}
        enableSearch
      />

      {!isValid && (
        <p style={{ color: 'red', fontSize: '12px' }}>
          {/* Please enter a valid phone number. */}
        </p>
      )}
    </div>

      </div>

      <div className="form-group full-width">
        <label>Email*</label>
        <input
          type="email"
          value={email}
          className="form-input"
          onChange={handleEmailChange}
        />
        {!isValidEmail && (
          <p style={{ color: 'red', fontSize: '12px' }}>Invalid email format</p>
        )}
      </div>

      <div className="form-group full-width">
        <label>Marital Status*</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="maritalstatus"
              value="married"
              onChange={(e) => setMaritalStatus(e.target.value)}
              checked={maritalstatus === "married"}
            />
            Married
          </label>
          <label>
            <input
              type="radio"
              name="maritalstatus"
              value="notmarried"
              onChange={(e) => setMaritalStatus(e.target.value)}
              checked={maritalstatus === "notmarried"}
            />
            Not Married
          </label>
          <label>
            <input
              type="radio"
              name="maritalstatus"
              value="widowed"
              onChange={(e) => setMaritalStatus(e.target.value)}
              checked={maritalstatus === "widowed"}
            />
            Widowed
          </label>
        </div>
      </div>

      <div className="form-group full-width">
        <button type="submit" className="submitbutton">
          SUBMIT FORM
        </button>
      </div>
      <div>
        <button type="button"
        style={{backgroundColor: 'salmon',color: 'white',width: '90px',
        height: '30px',fontSize: '25px',border: 'none',padding: '1px'}}
        onClick = {handleBack}>
          Back
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;