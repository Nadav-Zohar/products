import './App.css';
import React, { useEffect, useState } from 'react';
import Products from './products/Products';
import Login from './user/Login';
import Logout from './user/Logout';
import Loader from './user/components/Loader';

export const GeneralContext = React.createContext();

function App() {
    const [user, setUser] = useState();
    const [isLogged, setIsLogged] = useState();
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        fetch("https://api.shipap.co.il/login", {
            credentials: 'include',
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.text().then(x => {
                    throw new Error(x);
                });
            }
        })
        .then(data => {
            updateUser(data);
        })
        .catch(err => {
            setUser();
            setIsLogged(false);
        })
        .finally(() => {
            setIsLoader(false);
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
        <GeneralContext.provider value= {{ setIsLoader, user, setUser, isLogged, setIsLogged }}>
            {
                isLogged === undefined ? '' : 
                <div className="App">
                    <h1>Product Managment</h1>

                    <div className="frame">
                        {
                            isLogged ?
                            <>
                                <div>{user.fullName} is online! <Logout success={clearUser} /></div>
                                <Products />
                            </> :
                            <Login success={updateUser} />
                        }
                        {isLoader && <Loader />}
                    </div>
                </div>
            }
        </GeneralContext.provider>
        
    );
}

export default App;