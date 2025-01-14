import { useNavigate } from 'react-router-dom';
import { Form, FormField } from "../components/Form";
import { useAuth } from '../context/AuthContext';


const LoginPage = () => {

  const navigate = useNavigate();
  const { setAuthState } = useAuth();
  
  const formStructure: FormField[] = [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'password', label: 'Mot de passe', type: 'password' },
      ];

      const handleFormSubmit = async (formData: { [key: string]: any }) => {
        try {
          const response = await fetch('http://localhost:3003/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            const userData = await response.json();
            userData.role = 'locataire';
            userData.id=userData.id_locataire;
            setAuthState({
              isAuthenticated: true,
              user: userData,
            });
            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/');
            console.log('Connexion réussie');
          } else {
            console.log('Connexion échouée');
          }
        } catch (error) {
          console.error('An error occurred during login:', error);
        }
      };

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="flex flex-col w-full max-w-md justify-center">
      <div className="flex w-full justify-center">
        <h1>Connexion locataire</h1>
      </div>
      <div className="flex w-full justify-center">
        <Form formStructure={formStructure} label="Se connecter" onSubmit={handleFormSubmit} />
      </div>
    </div>
  </div>  
  );
}

export default LoginPage;