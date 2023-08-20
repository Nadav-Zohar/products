import { useContext } from 'react';
import './User.css';
import { GeneralContext } from '../App';

export default function Logout() {
    const {setIsLoader, setUser, setIsLogged, snackbar} = useContext(GeneralContext);

    const logout = () => {
        setIsLoader(true);
        fetch("https://api.shipap.co.il/logout", {
            credentials: 'include',
        })
        .then(() => {
            setUser();
            setIsLoader(false);
            setIsLogged(false);
            snackbar("user logged out");
        });
    }

    return <button className="logout" onClick={logout}>log out</button>
}