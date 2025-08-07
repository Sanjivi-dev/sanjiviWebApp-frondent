
function RegisterForm() {
    return(
    <form class="register">
      <div><h1>Register form</h1></div>
      <div class="cal_reg">
          <label>Firstname:</label>
          <input type="text"class="oldform"></input>
          <label class="secondstyle">Lastname:</label>
          <input type="text"class="formcal"></input><br></br>
      </div>

      <div class="cal_reg">
          <label>Father:</label>
          <input type="text"class="fatherlabel"></input>
          <label class="secondstyle">Mother:</label>
          <input type="text"class="calculform"></input><br></br>
      </div>

      <div class="cal_reg">
          <label>School:</label>
          <input type="text"class="schoollabel"></input>
          <label class="secondstyle">College:</label>
          <input type="checkbox" class="calculformed"></input><br></br>
      </div>

      <div class="cal_reg">
          <label>Diploma:</label>
          <input type="text" class="old_form"></input>
          <label class="secondstyle">Degree:</label>
          <input type="text" class="techform"></input><br></br>
      </div>

      <div class="cal_reg">
        <label>Date Of Brith:</label>
        <input type="datetime-local"></input><br></br>
      </div>

      <div class="cal_reg">
          <label>Age:</label>
          <input type="number" class="form_reg"></input><br></br>
      </div>

      <div class="cal_reg">
          <label>Passout:</label>
          <input type="month" class="appleform"></input><br></br>
      </div>

      <div class="cal_reg">
          <label>Email:</label>
          <input type="email"class="orangeform"></input><br></br>
      </div>

      <div class="cal_reg">
        <label>Phone Number:</label>
        <input type="number" class="bananaform"></input><br></br>
      </div>

      <div class="claform">
        <label>Adderess:</label>
      <textarea id="w3review" name="w3review" rows="4" cols="50">
      </textarea>
      </div>

      <div>
        <label>GSearch:</label>
        <input type="search"></input>
        <input type="submit"></input>
      </div>

      <div>
          <h3>Gender:</h3>
          <input type="radio" class="mainform"></input>
          <label>Male</label><br></br>
          <input type="radio" class="mainform"></input>
          <label>Female</label><br></br>
          <input type="radio" class="mainform"></input>
          <label>Others</label><br></br>
      </div> 
      <div>
        <button className="domaform">SUBMIT</button>
        <button class="formstyle">RESET</button>
      </div>
      </form>
    
    )
  }
  export default RegisterForm;