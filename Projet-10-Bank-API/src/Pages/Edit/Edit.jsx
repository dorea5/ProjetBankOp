import Footer from "../../Components/Footer";
import argentbanklogo from '../../assets/img/argentBankLogo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import '../../assets/css/edit.css';
import { Link } from 'react-router-dom';

const Edit = () => {
  const [firstName, setFirstName] = useState('Tony');
  const [lastName, setLastName] = useState('Jarvis');
  const navigate = useNavigate();

  const handleSave = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
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
          <Link className="main-nav-item" to="/sign-out">
            <i className="fa fa-user-circle"></i>
            <FontAwesomeIcon icon={faArrowRightFromBracket} color="grey" className="iconspace" />
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
