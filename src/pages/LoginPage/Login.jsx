import '../../scss/Form.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../enteties/user/api.js";
import { FloatingLabel, Form, Spinner, Button } from 'react-bootstrap';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rememberMe, setRememberMe] = useState(false); // Состояние для чекбокса

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Передаем флаг rememberMe в payload
            await dispatch(loginUser({ ...values, rememberMe })).unwrap();
            navigate('/');
        } catch (err) {
            setError(err.message || 'Ошибка при авторизации. Пожалуйста, попробуйте снова.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form">
            <div className="form__container container">
                <h1 className="form__title">VAUDIENCE</h1>

                {error && <div className="form__error">{error}</div>}

                <Form noValidate validated={validated} onSubmit={handleSubmit} className="form__form">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            value={values.email}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Пожалуйста, введите корректный email.
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Пожалуйста, введите пароль.
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Запомнить меня"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                        />
                    </Form.Group>

                    <Button type="submit" className='btn-reset form__form-btn' disabled={isLoading}>
                        {isLoading ? (
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        ) : (
                            'Войти'
                        )}
                    </Button>

                    <div className='form__form-links'>
                        <Link to="../register" className="to_register form__form-links--link">Регистрация</Link>
                        <Link to="" className="reset_password form__form-links--link">Забыл пароль?</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;