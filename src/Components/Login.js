import React,{useState} from "react";
import {useNavigate} from "react-router-dom"

const Login = (props) => {
  
  let navigate=useNavigate();
  const [credentials, setcredentials] = useState({email:"",password:""});
  const handleSubmit=async (e)=>{
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email:credentials.email, password:credentials.password}),
        });
        const json = await response.json();
        // console.log(json.success,json.authToken);
        if(json.success)
        {
          localStorage.setItem('token',json.authToken);
          //to redirect we are using useNavigate or useHistory hook from react router dom
          props.showAlert("You Logged in to your account Successfully","success");
          navigate("/");
        }else{
          props.showAlert("Invalid details to log in to your account","danger");
          
        }
  }

    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value});
      }
  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div id="loginHeading" className="form-text my-4 ">
            <h2 className="text" style={{paddingTop:"100px"}}>Login to Continue with INoteBook</h2>
          </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
