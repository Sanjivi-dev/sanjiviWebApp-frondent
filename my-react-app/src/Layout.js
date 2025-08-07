import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  function backbutton ()  {
    navigate(-1);
  }
  return (
    
    <div>
      <nav className="navbar">
      <div>  <h1 className="lookasul">Online Medical Appointment</h1></div>
        <div>
            <ul>
          
            <Link to="/" className="trainee-link" >Home</Link>

            {/* <button onClick={backbutton} className="trainee">Back</button> */}
          
            <link to="/AppointmentForm" className="lookaslayout"  style={{textDecoration :"none"}}></link>
            <link to="/RegistrationForm" className="lookasregistration" style={{textDecoration :"none"}}></link>

            {/* <Link to="/StateAndEffect" className="lookaslayout"  style={{textDecoration :"none"}}>Hellotohome</Link> */}
          
        </ul>
        </div>
      </nav>
      <Outlet />  
    </div>

      
   
  )
};

export default Layout;