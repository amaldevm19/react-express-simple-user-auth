
import { useState, useEffect } from "react";
import { Route, useRouteMatch, Switch} from "react-router-dom";

import { LoginForm } from "../components/Users/LoginForm";
import { SignupForm } from "../components/Users/SignupForm";
import { Profile } from "../components/Users/Profile";
import {UserLinks } from "../components/Users/UserLinks";
import "./Users.css"



export default function Users(){
    const [userToken, setUsertoken] = useState(null);
    let { path } = useRouteMatch();
    useEffect(() => {
        let user = sessionStorage.getItem("userToken");
        let token = JSON.parse(user);
        setUsertoken(token);
        return () => {
            setUsertoken(null)
        }
    }, [])
    const setToken = (user)=>{    
        console.log(user)
        setUsertoken(user);
        sessionStorage.setItem("userToken",JSON.stringify(user));
    }
    return(
        <div>
            <div className="user-links">
                <UserLinks userToken={userToken}setToken={setToken}/>
            </div>
            <Switch>
                <Route exact path={`${path}/`}>
                    {userToken && <Profile userToken={userToken}/> }
                    {!userToken && <LoginForm setToken={setToken}/> }
                </Route>
                <Route path={`${path}/login`}>
                    {!userToken && <LoginForm setToken={setToken}/> }
                </Route>
                <Route path={`${path}/signup`}>
                    <SignupForm />
                </Route>

            </Switch>
        </div>
       
    )
}