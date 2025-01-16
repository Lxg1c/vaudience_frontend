import '../../scss/Form.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../../thunks/userThunk.js";

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

        dispatch(loginUser(values))

        navigate('../')
    };

    return (
        <div className="form">
            <div className="form__container container">
                <h1 className="form__title">VAUDIENCE</h1>

                <form className="form__form" onSubmit={handleSubmit}>
                    <input
                        className='form__form-input'
                        name="email"
                        required
                        onChange={handleChange}
                        type='email'
                        placeholder='email'
                    />

                    <input
                        className='form__form-input'
                        name="password"
                        required
                        onChange={handleChange}
                        type='password'
                        placeholder='password'
                    />

                    <label className='form__form-label'>
                        <input type="checkbox" className="form__form-checkbox"/>
                        <span>Remember me</span>
                    </label>

                    <button type='submit' className='btn-reset form__form-btn'>Enter</button>

                    <div className='form__form-links'>
                        <Link to="../register" className="to_register form__form-links--link">Register</Link>
                        <Link to="" className="reset_password form__form-links--link">Forget password?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;