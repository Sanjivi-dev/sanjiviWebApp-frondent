
import './App.css';
import ApplicationForm from './ApplicationForm';
import Layout from './Layout';
import Myform from './myform';
import LoginForm from './LoginForm';
import RegisterForm from './registerForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from './RegistrationForm';
import Dashboard from './Dashboard';


function App() {
  function onbuttonClick (){
    console.log(" button clicked");
    // alert("save button clicked");
  }
  return (
    // <div>
    //   <ApplicationForm/>
    // </div>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginForm />} />
          <Route path="Myform" element={<Myform />}/>
          <Route path="ApplicationForm" element={<ApplicationForm />}/>
          <Route path="regform" element={<RegisterForm />}/> 
          <Route path="RegistrationForm" element={<RegistrationForm />}/> 
          <Route path="adminView" element={<Dashboard />}/>
          {/* <Route path="Circket_Score"element={<StateAndEffect/>}/> */}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
