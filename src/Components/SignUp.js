import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {

    let navigate=useNavigate();
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""});


    //destructuring
    const {name,email,password}=credentials;

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password}),
          });
          const json = await response.json();
          console.log(credentials.password," ",credentials.cpassword);
          // console.log(json.success,json.authToken);
          if(json.success)
          {
            localStorage.setItem('token',json.authToken);
            //to redirect we are using useNavigate or useHistory hook from react router dom
            navigate("/");
            props.showAlert("Your account has been created","success");
          }else{
            console.log(json);
            props.showAlert("Please enter valid credentials to get registered","danger");
            
          }
    }
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value});
        //console.log(credentials.password,"  ",credentials.cpassword);
      }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div id="SignupHeading" className="form-text my-4">
            <h2 className='text' style={{paddingTop:"100px"}}>Create an account to use INoteBook</h2>
        </div>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} required />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    {/* required hm form me kr sakty , agr jo required hua wo form me provide na kia 
    to form submit nhi huta , in-built validation hai ye onSubmit() event listener ky sath na ky onClick ky sath */}
    <input type="password" className="form-control" id="password" name="password" onChange={onChange}  minLength={5} required/>
    <div id="passwordHelp" className="form-text">Your password must contain atleast five characters.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary"disabled={!(credentials.cpassword===credentials.password)}>Submit</button>
</form>
    </div>
  );
}

export default SignUp;
