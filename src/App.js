import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import store from "./store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CodeGeneration from "./pages/CodeGeneration";
import CodeValidation from "./pages/CodeValidation";
import ProfileResult from "./pages/ProfileResult";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile-result" component={ProfileResult} />
            <Route exact path="/code-generation" component={CodeGeneration} />
            <Route exact path="/code-validation" component={CodeValidation} />
          </Switch>
        </Router>
      </Provider>
      <ToastContainer
        className="toast-container"
        bodyClassName="toast-class"
        style={{ marginTop: 100, color: "dark" }}
        autoClose={true}
      />
    </>
  );
}

export default App;
