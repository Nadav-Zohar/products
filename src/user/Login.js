import { useContext, useState } from 'react';
import './User.css';
import Joi from 'joi';
import Signup from "./Signup";
import { GeneralContext } from '../App';

export default function Login() {
    const {setIsLoader, setUser, setIsLogged, snackbar } = useContext(GeneralContext);
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isSignup, setIsSignup] = useState(false);

    const loginSchema = Joi.object({
        userName: Joi.string().min(3).max(10).required(),
        password: Joi.string().required(),
    });

    const login = ev => {
        ev.preventDefault();

        setIsLoader(true);
        fetch(`https://api.shipap.co.il/login`, {
        credentials: 'include',
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(formData),
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
        setUser(data);
        setIsLogged(true);
        snackbar(`${data.fullName} is on`);

    })
    .catch(err => {
        setLoginError(err.message);
        snackbar(err.message);
    })
    .finally(() => {
        setIsLoader(false);
    });
    }
    
    const handelInput = ev => {
        const { name, value } = ev.target;
        
        const obj = {
            ...formData,
            [name]: value,
        };

        const schema = loginSchema.validate(obj, {
            abortEarly: false,
        });

        const err = {
            ...errors,
            [name]: undefined,
        };

        if (schema.error) {
            const e = schema.error.details.find(x => x.context.key === name);
            err[name] = e?.message;
            setIsValid(false);
        } else {
            setIsValid(true);
        }

        setFormData(obj);
        setErrors(err);
    }

    return (
        <>
            {
                isSignup ? 
                <>
                    <Signup success={user => { setFormData({ ...formData, userName: user.userName }); setIsSignup(false) }} />
                    <p className="signup">
                        <a onClick={() => setIsSignup(false)}>To Log In Press Here</a>
                    </p>
                </> :
                <>
                    <div className="Login smallFrame">
                        <h2>Sign In</h2>

                        <form onSubmit={login}>
                            <label>
                                User Name :
                                <input type="text" name='userName' value={formData.userName} onChange={handelInput} />
                            </label>

                            { errors.userName ? <div className='fieldError'>{errors.userName}</div> : '' }

                            <label>
                                Password:
                                <input type="password" name='password' value={formData.password} onChange={handelInput} />
                            </label>

                            { errors.password ? <div className='fieldError'>{errors.password}</div> : '' }

                            <button>Log In</button>

                            { loginError ? <div className='fieldError'>{loginError}</div> : '' }
                        </form>
                    </div>

                    <p className="signup">
                        <a onClick={() => setIsSignup(true)}>To Sign Up Press Here</a>
                    </p>
                </>
            }
        </>
    )
}