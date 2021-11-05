import "./App.css";
import logo from "./Barter-logo.png";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import BarterList from "./Components/BarterList";
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import { useDispatch } from "react-redux";
import { SET_USER } from "./redux/auth/actions";

function App() {
  const dispatch = useDispatch();

  const checkUser = JSON.parse(localStorage.getItem("user"));

  if (checkUser) {
    dispatch({
      type: SET_USER,
      payload: checkUser,
    });
  }

  return (
    <div className="App">
      <img src={logo} className="logo" />
      <h1>Welcome to Barter App</h1>

      <BrowserRouter>
        <Header />
        <div>
          <Switch>
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/barterList" component={BarterList} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
