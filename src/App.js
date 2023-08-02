import { useEffect, useState } from 'react';
import './App.css';
import Products from './products/Products';
import Login from './user/Login';
import Logout from './user/Logout';

function App() {
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState();

  useEffect(() => {
      fetch("https://api.shipap.co.il/login", {
          credentials: 'include',
      })
      .then(res => res.json())
      .then(data => {
          if (data.status === 'success') {
              updateUser(data.user);
          } else {
              setUser();
              setIsLogged(false);
          }
      });
  }, []);

  const updateUser = user => {
      setUser(user);
      setIsLogged(true);
  }
  const clearUser = () => {
    setUser();
    setIsLogged(false);
}

  return (
    <>
        {
            isLogged === undefined ? '' : 
            <div className="App">
                <h1>Product Managment</h1>

                <div className="frame">
                    {
                        isLogged ?
                        <>
                            <div>{user.fullName} מחובר! <Logout success={clearUser} /></div>
                            <Products />
                        </> :
                        <Login success={updateUser} />
                    }
                </div>
            </div>
        }
    </>
    
);
}

export default App;
