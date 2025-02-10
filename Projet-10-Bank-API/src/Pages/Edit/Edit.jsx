import Footer from "../../Components/Footer";
import argentbanklogo from '../../assets/img/argentBankLogo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/main.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../Redux/reducers/userSlice';
import { useEffect } from "react";
import { fetchUserProfile } from '../../Redux/reducers/userSlice';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";



const Edit = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const { userData, loading, } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching user profile...");
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    console.log("User data reçu:", userData);
    if (!userData) {
      console.warn("Utilisateur non connecté !");
    }
    if (userData?.userName) { // Vérifie que la clé est correcte
      setUsername(userData.userName);
    }
  }, [userData, navigate]);


  const handleSave = async () => {
    console.log("Save button clicked");

    try {
      console.log("Valeur de username avant l'envoi:", username);

      if (!username || username.trim() === "") {
        console.error("Erreur: username est vide ou undefined");
        alert("Le champ username ne peut pas être vide.");
        return;
      }

      const result = await dispatch(updateUserProfile({ userName: username }));
      console.log("Redux action result:", result);

      if (updateUserProfile.fulfilled.match(result)) {
        console.log("User data mis à jour:", result.payload);
        alert("Profile updated successfully!");
      } else {
        console.error("Error updating profile:", result.payload);
        alert("Failed to update profile: " + result.payload);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred");
    }
  };

  const handleCancel = () => {
    console.log("Cancel button clicked"); // DEBUG
    navigate('/User');
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
        <div className="row">

          <Link className="link" to="/User">
            <div className="greencolor">
              {loading ? "Loading..." : userData ? `${userData.userName} ` : "User"}
              <FontAwesomeIcon icon={faUser} className="iconspace-green" />


            </div>
          </Link>

          <FontAwesomeIcon icon={faGear} className="iconspace-green" />
          <Link className="main-nav-item" to="/sign-out">

            <FontAwesomeIcon icon={faPowerOff} className="iconspace-green" />
          </Link>
        </div>



      </nav>
      <main>
        <h2 className="sr-only">Accounts</h2>
        <h2>Edit user info</h2>
        <div className="name-edit " >
          <div className="row">
            <label htmlFor="username">User name:</label><br />
            <input className="inputedit"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}

            /><br />
          </div>
          <div className="row">
            <label htmlFor="firstName">First Name:</label><br />
            <input className="inputedit-grey" type="text" id="firstName" value={userData?.firstName || ''} readOnly /><br /> {/* readOnly */}
          </div>
          <div className="row">
            <label htmlFor="lastName">Last Name:</label><br />
            <input className="inputedit-grey" type="text" id="lastName" value={userData?.lastName || ''} readOnly /><br /> {/* readOnly */}
          </div>
          <div className="row">
            <button className="green" onClick={handleSave}>Save</button>
            <button className="green" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
        <section className="account-edit">
          <div className="account-content-wrapper-edit">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
            <FontAwesomeIcon className="arrow-edit" icon={faChevronRight} />
          </div>

        </section>
        <section className="account-edit">
          <div className="account-content-wrapper-edit">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
            <FontAwesomeIcon className="arrow-edit" icon={faChevronRight} />
          </div>

        </section>
        <section className="account-edit">
          <div className="account-content-wrapper-edit">
            <h3 className="account-title">Argent Bank Credit Card (x5201)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
            <FontAwesomeIcon className="arrow-edit" icon={faChevronRight} />
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Edit;
