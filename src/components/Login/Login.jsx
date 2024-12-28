import '../../styles/Login.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {aboutUser, loginUser} from "../../thunks/userThunk.js";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isAllFieldsFilled = Object.values(values).some(val => val);

        if (!isAllFieldsFilled) {
            console.log('Пожалуйста, заполните все поля');
            return;
        }

        dispatch(loginUser({
            email: values.email,
            password: values.password,
        }))

        dispatch(aboutUser())

        navigate('../')
    };

    return (
        <div className="login">
            <div className="login__container container">
                <h1 className="login__title">VAUDIENCE</h1>

                <form className="login__form" onSubmit={handleSubmit}>
                    <input
                        className='login__form-input'
                        name="email"
                        required
                        onChange={handleChange}
                        type='email'
                        placeholder='email'
                    />

                    <input
                        className='login__form-input'
                        name="password"
                        required
                        onChange={handleChange}
                        type='password'
                        placeholder='password'
                    />

                    <button type='submit' className='btn-reset login__form-btn'>Enter</button>
                </form>
            </div>
        </div>
    );
};

export default Login;