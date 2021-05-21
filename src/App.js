
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import { Header } from "./components/Header";

import './App.css';


function App() {
  return (
    <div className="App"> 
      <Router>
        <div>
          <Header/>
          <Switch>
            <Route path="/users">
              <Users userToken={false} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
