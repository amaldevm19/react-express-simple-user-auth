import { Link, withRouter } from "react-router-dom";

import "./Header.css"
function NavBar() {

    return(
        <nav>
            <ul className="navbar-style">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul>
        </nav>
    )
}

export const Header = () => {

    const headerStyle = {
        display:"flex",
        color:"white",
        backgroundColor: "blue"

    }
    return(
        <div style={headerStyle}>
            <h1>Simple User Auth SPA</h1>
            <NavBar/>
        </div>
    )
}





