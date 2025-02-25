import '../../assets/css/main.css';
import Header from "../../Components/Header";
import Footer from '../../Components/Footer';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('SignUp Data:', { email, password, firstName, lastName });

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('SignUp Response:', data);
        navigate('/sign-in');
      } else {
        const errorData = await response.json();
        console.error('SignUp Error:', errorData);
        setError('Failed to sign up. Please try again.');
        if (errorData && errorData.message) {  //Check if errorData and message exists
          setError(errorData.message); // Display the message from the backend
        } else if (response.status === 400) { // Example: Check for 400 Bad Request
          setError("Invalid email or password. Please check your input.");
        } else if (response.status === 401) { // Example: Check for 401 Unauthorized
          setError("Incorrect password.");
        } else if (response.status === 409) { // Example: Check for 409 Conflict (e.g., email already exists)
          setError("Email already exists. Please use a different email.");
        } else {
          setError('Failed to sign up. Please try again.'); // Generic error
        }


      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
    }
  };
  return (
    <div>
      <Header />
      <main className="main bg-dark">
        <section className="sign-up-content">
          <i className="fa fa-user-circle sign-up-icon"></i>
          <h1>Sign Up</h1>
          <form onSubmit={handleSignUp}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="input-wrapper">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="sign-up-button">Sign Up</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default SignUp;