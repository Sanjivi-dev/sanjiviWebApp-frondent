import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgb(246, 246, 246)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: '#5c6bc0',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '90vh',              // Limits height to 90% of viewport
    overflowY: 'auto',              // Enables scroll if content is too tall
    padding: '25px 30px',
    color: '#fff',
    fontFamily: 'sans-serif',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column'
  }
};

const fieldStyle = {
  display: 'flex',
  gap: '20px',
  marginBottom: '12px'
};

const labelStyle = {
  width: '140px',
  fontWeight: 'bold',
  fontSize: '14px'
};

const inputStyle = {
  flex: 1,
  padding: '8px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px'
};


function Dashboard() {
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // api call function
    axios.get('http://localhost:9090/getApplication')
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
      
  }, []);

  const filteredData = data.filter(person => {
    const name = (person.Apptnumber ?? '').toLowerCase();
    const term = (searchTerm ?? '').toLowerCase();
    const serial = String(person.serialnumber ?? '').toLowerCase();
    return name.includes(term) || serial.includes(term);
  });

  const validateBirthdate = (dateString) => {
    const today = new Date();
    const selectedDate = new Date(dateString);
    if (selectedDate > today) {
      setError("Birthdate cannot be in the future");
      return;
    }
    const ageCalc = today.getFullYear() - selectedDate.getFullYear();
    const m = today.getMonth() - selectedDate.getMonth();
    const isBirthdayPassed = m > 0 || (m === 0 && today.getDate() >= selectedDate.getDate());
    const actualAge = isBirthdayPassed ? ageCalc : ageCalc - 1;
    if (actualAge < 18) {
      setError("Must be 18 or older");
    } else {
      setError("");
    }
    setEditingUser(prev => ({ ...prev, age: actualAge }));
  };

  const handleBirthdateChange = (e) => {
    const date = e.target.value;
    setEditingUser(prev => ({ ...prev, birthdate: date }));
    validateBirthdate(date);
  };

  const handleBack = () => {
    navigate (-1);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEditingUser(prev => ({ ...prev, email: value }));
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleFirstnameChange = (e) =>{
    const value = e.target.value;
    if (/^[A-Za-z\s]+$/.test(value)){
    setEditingUser(prev => ({ ...prev, firstname: value}));
    }
  };
  const handlePincodeChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setEditingUser(prev => ({ ...prev, pincode: value }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setEditingUser(prev => ({ ...prev, phone: value }));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      axios.delete(`http://localhost:9090/deleteApplication/${id}`)
        .then(() => setData(prev => prev.filter(person => person.id !== id)))
        .catch(error => console.error('Delete failed:', error));
    }
  };

  const handleEdit = (person) => {
    setEditingUser({ ...person });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingUser(null);
    setError("");
  };

  const handleSave = () => {
    if (error || !editingUser?.id) {
      console.error("Cannot save: Validation error or missing ID.");
      return;
    }

    // Use ID if your backend uses ID, or change to `serialnumber` if needed
    axios.put(`http://localhost:9090/updateApplication/${editingUser.id}`, editingUser)
      .then(() => {
        setData(prev => prev.map(p => (p.id === editingUser.id ? editingUser : p)));
        handleModalClose();
      })
      .catch(error => console.error('Update failed:', error));
  };

  return (
    <div className="dashboard">
      <h2 style={{ color: 'blueviolet', marginLeft: '100px',}}>Admin Table</h2>
      <div style={{ margin: "20px 100px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="🔍 Search by Appt Number"
          className="form-input"
          style={{ width: "300px" }}
        />
      </div>
      <div>
        <button type="button"
        style={{marginLeft: '1100px',backgroundColor: 'blue',
          marginBottom: '100px',width: '80px',
          height: '30px',color: 'white',fontSize: '20px',border: 'none'}}
        onClick={handleBack}>Back</button>
      </div>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '900px',marginLeft: '170px' }}>
        <thead style={{ backgroundColor: '#2e3434', color: 'white' }}>
          <tr>
            <th style={{width: '10px'}}>S.No</th><th style={{width: '100px'}}>First Name</th><th style={{width: '70px'}}>Last Name</th><th style={{width: '70px'}}>Birth Date</th>
            <th style={{width: '10px'}}>Phone</th><th style={{width: '120px'}}>Email</th><th style={{width: '5px'}}>Appointment Date</th><th style={{width: '50px'}}>Actions</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: '#eef69bff', fontSize: '14px' }}>
          {filteredData.map((person) => (
            <tr key={person.id}>
              <td>{person.serialnumber}</td>
              <td>{person.firstname}</td>
              <td>{person.lastname}</td>
              <td>{person.birthdate}</td>
              <td>{person.phone}</td>
              <td>{person.email}</td>
              <td>{person.appointmentdate ?? 'N/A'}</td>
              <td>
              <FaTrash
                onClick={() => handleDelete(person.id)}
                style={{ cursor: 'pointer', color: 'red', marginRight: '10px' }}
                title="Delete"
              />
              <FaEdit
                onClick={() => handleEdit(person)}
                style={{ cursor: 'pointer', color: '#008000' }}
                title="Edit"
              />
            </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && editingUser && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
          <h1 style={{}}>
            Edit Appointment
          </h1>

            <div style={fieldStyle}>
              <label style={labelStyle}>Appt Number</label>
              <input type="number" value={editingUser.serialnumber} style={inputStyle}
               onChange={(e) => setEditingUser({...editingUser,serialnumber: e.target.value})} />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>First Name:</label>
              <input type="text" value={editingUser.firstname} style={inputStyle}
                onChange={handleFirstnameChange} />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Last Name:</label>
              <input type="text" value={editingUser.lastname} style={inputStyle}
                onChange={(e) => setEditingUser({ ...editingUser, lastname: e.target.value })} />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Birthdate:</label>
              <input type="date" value={editingUser.birthdate} style={inputStyle}
                onChange={handleBirthdateChange} />
            </div>

            {error && <div style={{ color: 'red', marginLeft: '150px', marginBottom: '10px' }}>{error}</div>}

            <div style={fieldStyle}>
              <label style={labelStyle}>Age:</label>
              <input type="number" value={editingUser.age} style={inputStyle}
                onChange={(e) => setEditingUser({ ...editingUser, age: e.target.value })} />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Phone:</label>
              <input type="text" value={editingUser.phone} style={inputStyle}
                onChange={handlePhoneChange} />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Email:</label>
              <input type="email" value={editingUser.email} style={inputStyle}
                onChange={handleEmailChange} 
                />
            </div>
            <div>
            {emailError && (
              <div style={{ color: 'red', fontSize: '12px', marginLeft: '165px' }}>
                {emailError}
              </div>
            )}
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Address:</label>
              <input type="text" value={editingUser.adderess} style={inputStyle}
                onChange={(e) => setEditingUser({ ...editingUser, adderess: e.target.value })} />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>City:</label>
              <select value={editingUser.city} style={inputStyle}
                onChange={(e) => setEditingUser({ ...editingUser, city: e.target.value })}>
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

            <div style={fieldStyle}>
              <label style={labelStyle}>State:</label>
              <select value={editingUser.state} style={inputStyle}
                onChange={(e) => setEditingUser({ ...editingUser, state: e.target.value })}>
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

            <div style={fieldStyle}>
              <label style={labelStyle}>Pincode:</label>
              <input type="text" value={editingUser.pincode} style={inputStyle}
                onChange={handlePincodeChange} maxLength="6" />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Marital Status:</label>
              <input type="text" value={editingUser.maritalstatus} style={inputStyle}
                onChange={(e) => setEditingUser({ ...editingUser, maritalstatus: e.target.value })} />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Appointment Date:</label>
              <input type="date" value={editingUser.appointmentdate} style={inputStyle}
                onChange={(e) => setEditingUser({ ...editingUser, appointmentdate: e.target.value })} />
            </div>

            <div>
              <button onClick={handleSave} style={{ backgroundColor: '#73b80dff', color: 'white' }}>Save</button>
              <button onClick={handleModalClose} style={{ marginLeft: '5px', backgroundColor: '#aebd0aff', color: 'white' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
