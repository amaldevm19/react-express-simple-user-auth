
import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as EmailValidator from 'email-validator';

async function loginUser(credentials){
    return fetch('http://localhost:8000/api/users/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data=>data)
}

export const LoginForm = ({setToken}) => {
    const history = useHistory();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[errorMessage, setErrorMessage] = useState("")
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!EmailValidator.validate(email)){
            setErrorMessage("Please provide a valid email")
            return
        }
        const response = await loginUser({
            email,
            password
        });
        if(response.status === 200){
            let user = await response.json();
            setToken(user)
            history.push("/users");
       }else{
            let error = await response.json();
            setErrorMessage(error.message)
       }
       
    }

    return(
        <div>
            <h1>Login Form</h1>
            <p style={{display:errorMessage?"block":"none"}}>{errorMessage}</p>
            <form style={{padding:10, display:"flex", flexDirection:"column", justifyContent:"space-around", minHeight:100 }}>
                <label>Email:
                    <input type="text"  onChange={e=>setEmail(e.target.value)} value={email}/>
                </label>
                <label>Password:
                    <input type="password"  onChange={e=>setPassword(e.target.value)} value={password}/>
                </label>
                <input type="submit" value="submit" style={{maxWidth:"fit-content"}} onClick={handleSubmit}/>
            </form>
        </div>
    )
}
