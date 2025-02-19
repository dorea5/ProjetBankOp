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
import Account from "../../Components/Account";

function User() {

  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const accountsData = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "$2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "$10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x5201)",
      amount: "$184.30",
      description: "Current Balance",
    },
  ];



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
          {loading ? "Loading..." : userData ? `${userData.userName} ` : "User"}

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

        {accountsData.map((account, index) => (
          <Account
            key={index}
            title={account.title}
            amount={account.amount}
            description={account.description}
          />
        ))}
      </main>
      <Footer />
    </>
  );
}

export default User;
