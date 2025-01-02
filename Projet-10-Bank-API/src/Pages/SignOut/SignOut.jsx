import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supprime le jeton du localStorage
    localStorage.removeItem('token');
    // Redirige l'utilisateur vers la page de connexion
    navigate('/sign-in');
  }, [navigate]);

  return null; //  il redirige 
};

export default SignOut;

