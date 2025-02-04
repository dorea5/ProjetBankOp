import Footer from "../../Components/Footer";
import "../../assets/css/main.css";
import argentbanklogo from '../../assets/img/argentBankLogo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Redux/reducers/userSlice";

function User() {

  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentbanklogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        <div>
          <FontAwesomeIcon icon={faCircleUser} className="iconspace" />
          {loading ? "Loading..." : userData ? `${userData.firstName} ` : "User"}

          <Link className="main-nav-item" to="/sign-out">
            <FontAwesomeIcon icon={faRightToBracket} className="iconspace" />
            Sign out
          </Link>

        </div>

      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {loading ? "Loading..." : userData ? `${userData.firstName} ${userData.lastName}` : "User"}
          </h1>

          {error && <p className="error-message">{error}</p>}
          <Link to="/edit" className="edit-button">Edit Name</Link>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x5201)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default User;
