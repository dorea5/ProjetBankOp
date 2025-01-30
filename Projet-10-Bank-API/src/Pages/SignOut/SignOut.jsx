import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/reducers/userSlice';//action logout redux

const SignOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Utilise le dispatch pour appeler l'action logout

  useEffect(() => {
    // Supprime le jeton du localStorage
    localStorage.removeItem('token');
    // Appele l'action logout pour vider le store
    dispatch(logout());
    // Redirige l'utilisateur vers la page de connexion
    navigate('/sign-in');
  }, [dispatch, navigate]);

  return null;
};

export default SignOut;
