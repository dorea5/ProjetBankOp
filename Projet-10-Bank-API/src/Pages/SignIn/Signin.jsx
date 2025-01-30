import '../../assets/css/main.css';
import Header from "../../Components/Header";
import Footer from '../../Components/Footer';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Redux/reducers/userSlice";

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await dispatch(loginUser({ email: username, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/user');
    }
  };

  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleLogin}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="sign-in-button" disabled={loading}> {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SignIn;
