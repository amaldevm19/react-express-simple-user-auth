
import { Link, useRouteMatch } from "react-router-dom";

export const LinkButton = (props) => {
    let { url } = useRouteMatch();
    return(
        <div>
           <Link to={`${url}/${props.link}`} style={{textDecoration:"none", fontSize:"large"}}>{props.name}</Link>
        </div>
    )
}
