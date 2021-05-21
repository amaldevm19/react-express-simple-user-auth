
import { useHistory } from "react-router-dom";

import { LinkButton } from "../LinkButton";

export const UserLinks = ({userToken, setToken}) => {
    const history = useHistory();

    const handleClick = (e)=>{
        e.preventDefault();
        setToken(null);
        history.push("/users");
    }

    if(userToken){
        return <a onClick={handleClick}  style={{textDecoration:"none", fontSize:"large", cursor:"pointer"}} href=""> Logout</a>;
    }
    return (
        <>
            <LinkButton name="Login" link="login"/>
            <LinkButton name="Sign-up" link="signup"/>
        </>
    )
}
