import Footer from "../../Components/Footer";
import argentbanklogo from '../../assets/img/argentBankLogo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/main.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../Redux/reducers/userSlice';
import { useEffect } from "react";


const Edit = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();
  const { userData, loading, } = useSelector(state => state.user);
  const user = useSelector((state) => state.user.userData); //accès état utilisateur via redux
  const navigate = useNavigate();

  //initialiser les champs avec les données user venant de redux
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      // Dispatch de l'action pour maj le profil via redux
      await dispatch(updateUserProfile({ firstName, lastName }));
      alert('Profile updated successfully!');
      navigate("/User");
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  const handleCancel = () => {
    navigate('/User');
  };

  const handleViewTransactions = () => {
    navigate('/transactions');
  };

  return (
    <div className="profile-page">
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
          <Link className="link" to="/User">
            <FontAwesomeIcon icon={faCircleUser} className="iconspace" />
            {loading ? "Loading..." : userData ? `${userData.firstName} ` : "User"}
          </Link>
          <Link className="main-nav-item" to="/sign-out">
            <i className="fa fa-user-circle"></i>
            <FontAwesomeIcon icon={faRightToBracket} className="iconspace" />
            Sign out
          </Link>
        </div>
      </nav>
      <main>
        <h2 className="sr-only">Accounts</h2>
        <h2>Welcome back</h2>
        <div className="name-edit">
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button" onClick={handleViewTransactions}>
              View transactions
            </button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button" onClick={handleViewTransactions}>
              View transactions
            </button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x5201)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button" onClick={handleViewTransactions}>
              View transactions
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Edit;
