
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import * as EmailValidator from 'email-validator';

async function signupUser(credentials){
    return fetch('http://localhost:8000/api/users/signup',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data=>data)
}
export const SignupForm = () => {
    const history = useHistory();
    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirmpassword, setConfirmPassword] = useState("");
    const[passwordmatch, setPasswordmatch] = useState(false)
    const[errorMessage, setErrorMessage] = useState("")
    const textInput = useRef(null);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!EmailValidator.validate(email)){
            setErrorMessage("Please provide a valid email")
            return
        }
        if(!(confirmpassword && passwordmatch)){
            setErrorMessage("Password is not matching");
            textInput.current.focus();
            return
        }
        setErrorMessage("")
        const response = await signupUser({
            username,
            email,
            password
        });

       if(response.status == 201){
            history.push("/users/login");
       }else{
            let error = await response.json();
            setErrorMessage(error.message)
       }
       
    }
    const passwordMatcher =(e)=>{
        if(password === e.target.value){
            setPasswordmatch(true);
        }else{
            setPasswordmatch(false);
        }
        setConfirmPassword(e.target.value);
    }

    return(
        <div>
            <h1>Signup Form</h1>
            <p style={{display:errorMessage?"block":"none"}}>{errorMessage}</p>
            <form style={{padding:10, display:"flex", flexDirection:"column", justifyContent:"space-around", minHeight:200 }}>
                <label>UserName:
                    <input type="text"  onChange={e=>setUsername(e.target.value)} value={username}/>
                </label>
                <label>Email:
                    <input type="email"  onChange={e=>setEmail(e.target.value)} value={email}/>
                </label>
                <label>Password:
                    <input type="password"  onChange={e=>setPassword(e.target.value)} value={password}/>
                </label>
                <label>Confirm Password:
                    <input type="password" 
                        style={passwordmatch?{outlineColor:"green"}:{outlineColor:"tomato", }} 
                        onChange={passwordMatcher} 
                        value={confirmpassword}
                        ref={textInput}
                        />
                </label>
                <input type="submit" value="submit" style={{maxWidth:"fit-content"}} onClick={handleSubmit}/>
            </form>
        </div>
    )
}
