
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/Signin";
import './assets/css/App.css';
import User from "./Pages/Profile/User";
import Edit from "./Pages/Edit/Edit";
import SignUp from "./Pages/SignUp/SignUp";
import SignOut from "./Pages/SignOut/SignOut";

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