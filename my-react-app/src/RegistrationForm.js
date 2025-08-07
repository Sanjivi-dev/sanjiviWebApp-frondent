import { useState } from "react";
import axios from 'axios';
import './Register.css';
import {useNavigate} from "react-router-dom"; 

const RegistrationForm = () => {
    const [firstname, setFirstname] = useState("");
    const [isFirstnameValid, setIsFirstnameValid] = useState(true);
    const [lastname, setLastname] = useState("");
    const [isLastnameValid, setIsLastnameValid] = useState(true);
    const [username, setUsername] = useState("");
    const [dateofbirth, setDateofbirth] = useState("");
    const [passwood, setPasswood] = useState("");

    const navigate = useNavigate();

    const handleFirstnameChange = (e) =>{
        const value = e.target.value;
        setFirstname(value);

        const nameRegex = /^[A-Za-z\s]+$/;
        setIsFirstnameValid (value === "" || nameRegex.test(value));
    }

    const handleLastnameChange = (e) => {
        const value = e.target.value;
        setLastname(value);

        const nameRegex = /^[A-Za-z\s]+$/;
        setIsLastnameValid(value === "" || nameRegex.test(value));
    }

    const handleBack = () =>{
        navigate (-1);
    };

    const submitted = (e) => {
        e.preventDefault();

        if (username.trim() === "") {
            alert("Username is empty");
            return;
        }

        if (passwood.trim() === "") {
            alert("Password is empty");
            return;
        }

        if (!isFirstnameValid) {
            alert("First name is invalid. Only alphabets")
            return;
        }

        if (!isLastnameValid) {
            alert("Last name is invalid. Only letters and spaces are allowed.");
            return;
        }

        axios.post('http://localhost:9090/savetoRegistration', {
            firstname: firstname,
            lastname: lastname,
            userName: username,
            dateofbirth: dateofbirth,
            passwood: passwood
        })
        .then((response) => {
            alert("Saved Successfully");
        })
        .catch((error) => {
            console.error(error);
        });
    }    

    return (
        <>
        <nav>
            <form className="registrationform" onSubmit={submitted}>
                <h1 className="lookasheading">Registration</h1>

                <div>
                    <label className="Divfirstname">First name:</label>
                    <input
                        type="text"
                        value={firstname}
                        className="Inputfirstname"
                        onChange={handleFirstnameChange}
                    />
                </div>

                <div>
                    <label className="Divlastname">Last name:</label>
                    <input
                        type="text"
                        value={lastname}
                        className="Inputlastname"
                        onChange={handleLastnameChange}
                    />
                        {!isLastnameValid && (
                        <p style={{ color: 'red', fontSize: '12px' }}>
                        Last name must contain only letters and spaces.
                        </p>
                        )}
                </div>

                <div className="Divfathername">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        className="Inputfathername"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <label className="Divdateofbirth">Date of birth:</label>
                    <input
                        type="date"
                        value={dateofbirth}
                        className="Inputdateofbirth"
                        onChange={(e) => setDateofbirth(e.target.value)}
                    />
                </div>

                <div>
                    <label className="Dividproof">Password:</label>
                    <input
                        type="password"
                        value={passwood}
                        className="Inputidproof"
                        onChange={(e) => setPasswood(e.target.value)}
                    />
                </div>

                <div className="black"> 
            
                   <button type="button"
                   onClick={handleBack} style={{marginLeft: '30px',
                    width: '70px',height: '30px',
                    fontSize: '20px',backgroundColor: 'rgb(224, 192, 164)',
                    borderRadius: '7px',border: 'none',marginTop: '20px'}}>
                    Back
                    </button>

                    <button type="submit"
                    className="divandSUBMIT"
                    style={{ width: '80px',height: '30px',
                    fontSize: '20px',backgroundColor: 'rgb(224, 192, 164)',
                    borderRadius: '7px',border: 'none',color: 'black',marginLeft: '100px'}}
                    >Submit</button>
                
                </div>
            </form>
        </nav>
        </>
    );
};

export default RegistrationForm;
 