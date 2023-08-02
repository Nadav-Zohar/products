import { useState } from 'react';
import './User.css';
import Joi from 'joi';

export default function Signup() {
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        email: '',
        fullName: '',
    });
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);


    const signupSchema = Joi.object({
        userName: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(6).max(50).required(),
        email: Joi.string().min(3).max(50).required(),
        fullName: Joi.string().min(5).max(50).required(),
    });

    const signUp = ev => {
        ev.preventDefault();

        fetch("https://api.shipap.co.il/signup", {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
    }

    const handelInput = ev => {
        const { name, value } = ev.target;
        
        const obj = {
            ...formData,
            [name]: value,
        };

        const schema = signupSchema.validate(obj, {
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
        <div className="Login smallFrame">
                        <h2>Sign Up</h2>

                        <form onSubmit={signUp}>
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


                            <label>
                                Email:
                                <input type="email" name='email' value={formData.email} onChange={handelInput} />
                            </label>
                            { errors.email ? <div className='fieldError'>{errors.email}</div> : '' }


                            <label>
                                Full Name:
                                <input type="text" name='fullName' value={formData.fullName} onChange={handelInput} />
                            </label>
                            { errors.fullName ? <div className='fieldError'>{errors.fullName}</div> : '' }



                            <button>Sign Up</button>

                        </form>
                    </div>
    )
}