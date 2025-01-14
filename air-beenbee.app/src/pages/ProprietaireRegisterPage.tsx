import { useNavigate } from 'react-router-dom';
import { FormField, Form} from "../components/Form";


const RegisterPage = ()  => {

  const navigate = useNavigate();

  const formStructure: FormField[] = [
    { name: 'prenom', label: 'Prénom', type: 'text' },
    { name: 'nom', label: 'Nom', type: 'text' },
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'password', label: 'Mot de passe', type: 'password' },
  ];

    const handleFormSubmit = async (formData: { [key: string]: any }) => {
      //send data to backend
      await fetch('http://localhost:3002/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).then((response) => {
        if (response.ok) {
          console.log('Inscription réussie');
          //redirect to login page
          navigate('/');

        } else {
          console.log('Inscription échouée');
        }
      });
    };

    return (
      <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col w-full max-w-md justify-center">
        <div className="flex w-full justify-center">
          <h1>Inscription propriétaire</h1>
        </div>
        <div className="flex w-full justify-center">
          <Form formStructure={formStructure} label="S'inscrire" onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  
    )
  }
  
  export default RegisterPage;
  