import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router';

export default function Home () {
  const navigate = useNavigate();

  async function handleLogout (e) {
    
    console.log("here")
    // set configurations
    const configuration = {
      method: "delete",
      url: "http://localhost:5000/logout",
      withCredentials: true
    };

    // prevent the form from refreshing the whole page
    e.preventDefault();

    // make the API call
    axios(configuration)

    // navigate through login 
    navigate('/login');
    
  }
    
    return (
        <>
          <h1>Welcome</h1>
          <Link to='/login'>Login Page</Link>
          <button type='submit' onClick={(e) => handleLogout(e)}>Logout Page</button>
        </>
    )
}

