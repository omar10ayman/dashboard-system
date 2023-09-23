import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Input from './compment/Input';
import {useState} from 'react'
function App() {
  let [formInput,setInput]=useState({
    name:"",
    email:"",
    password:"",
    confirmPass:""
  })
  let [formErr,setErr]=useState({
    nameErr:"",
    emailErr:"",
    passwordErr:"",
    confirmPassErr:""
  })
  function handlechange(e){
    switch(e.target.id){
      case"form-name":
      formInput.name=e.target.value
      break;
      case"form-Email":
      formInput.email=e.target.value
      break;
      case"form-password":
      formInput.password=e.target.value
      break;
      case"form-Conpassword":
      formInput.confirmPass=e.target.value
      break;
      default:
      break;
    }
  }
  function handleSubmit(e){
    e.preventDefault()
    ShowInput()
    ShowErr()
    clearInput()
  }
  function ShowInput(){
    if(formInput.name===""  || formInput.name.includes(" ")===true|| formInput.email==="" || formInput.password==="" || formInput.confirmPass==="" || formInput.confirmPass!==formInput.password){
      setInput({
        name:"",
        email:"",
        password:"",
        confirmPass:""
      })
      
    }else{
      setInput({...formInput})
    }
  }
  function ShowErr(){
    setErr(
      {
         nameErr : formInput.name.length===0 || formInput.name.includes(" ")===true? "Please enter name without spaces" :"",
         emailErr : formInput.email.length===0 || formInput.email.endsWith("@gmail.com")===false ? "Please enter email format" :"",
         passwordErr : formInput.password.length<8 || formInput.password.length>12 ? "Password is 8 Min & 12 Max" :"",
         confirmPassErr: formInput.confirmPass===formInput.password && formInput.confirmPass.length>0? '':"Don't Match Password"
      }
      )
  }
  function clearInput(){
    document.getElementById("form-name").value=''
    document.getElementById("form-Email").value=''
    document.getElementById("form-password").value=''
    document.getElementById("form-Conpassword").value=''
  }
  return (
    <div className="container bg-secondary-subtle w-100  " style={{
     height:'100hv'
    }}>
      <form className="d-flex flex-column justify-content-center align-items-center gap-3" style={{
        height:"100vh"
      }}>
        <Input type={"text"} placeHolder={"Enter Your Name"} id={"form-name"} handlechange={handlechange} value={formInput.name} />
        {formErr.nameErr.length>0 && <span>{formErr.nameErr}</span>}
        <Input type={"text"} placeHolder={"Enter Your Email"} id={"form-Email"} handlechange={handlechange} value={formInput.email}  />
        {formErr.emailErr.length>0 && <span>{formErr.emailErr}</span>}
        <Input type={"text"} placeHolder={"Enter Your password"} id={"form-password"} handlechange={handlechange} value={formInput.password}   />
        {formErr.passwordErr.length>0 && <span>{formErr.passwordErr}</span>}
        <Input type={"text"} placeHolder={"Confirm password"} id={"form-Conpassword"} handlechange={handlechange} value={formInput.confirmPass}   />
        {formErr.confirmPassErr.length>0 && <span>{formErr.confirmPassErr }</span>}
        <button className="btn btn-success" type="submit" onClick={handleSubmit}>Submit</button>
        {formInput.name.length>0 && <div>
          <p>Name: {formInput.name}</p>
          <p>Email: {formInput.email}</p>
          <p>Password: {formInput.password}</p>
          <p>Confirm: {formInput.confirmPass}</p>
        </div>}
      </form>
    </div>
  );
}

export default App;
