import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import SignInForm from "./components/SignInForm";

import "./App.css";

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={SignInForm} />
    </Switch>
  </BrowserRouter>
);
export default App;
