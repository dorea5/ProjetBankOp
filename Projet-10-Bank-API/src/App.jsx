
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./Home";
import SignIn from "./Signin";
import "./App.css";
import User from "./User";
import Edit from "./Edit";
import SignUp from "./SignUp";
import SignOut from "./SignOut";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-out" element={<SignOut />} />
          <Route path="/user" element={<User />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/sign-up" element={<SignUp />} />


        </Routes>
      </Router>
    </Provider>
  );
}

export default App;