import '../../scss/Form.scss';
import { useDispatch } from "react-redux";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {createUser} from "../../enteties/user/api.js";

const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        email: "",
        nickname: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isAllFieldsFilled = Object.values(values).some(val => val);

        if (!isAllFieldsFilled) {
            return;
        }

        if (values.password.length < 8) {
            console.log('Пароль должен быть не менее 8 символов');
            return;
        }

        dispatch(createUser(values));

        navigate('../login')

    };

    return (
        <div className="form">
            <div className="form__container container">
                <h1 className="form__title">VAUDIENCE</h1>

                <form className="form__form" onSubmit={handleSubmit}>
                    <input
                        className='form__form-input'
                        name="nickname"
                        required={true}
                        onChange={handleChange}
                        type='text'
                        placeholder='nickname'
                    />

                    <input
                        className='form__form-input'
                        name="password"
                        required={true}
                        onChange={handleChange}
                        type='password'
                        placeholder='password'
                    />

                    <input
                        className='form__form-input'
                        name="email"
                        required={true}
                        onChange={handleChange}
                        type='email'
                        placeholder='e-mail'
                    />

                    <button type='submit' className='btn-reset form__form-btn'>Register</button>

                    <div className='form__form-links'>
                        <Link to="../register" className="to_register form__form-links--link">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;