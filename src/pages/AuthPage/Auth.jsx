import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Auth.scss";
import Input from "../../shared/ui/Input/Input.jsx";
import Button from "../../shared/ui/Button/Button.jsx";
import Checkbox from "../../shared/ui/Checkbox/Checkbox.jsx";

const Auth = () => {
    const [authType, setAuthType] = useState("login");
    const [agreeToPolicy, setAgreeToPolicy] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        phone: "",
        confirmPassword: ""
    });

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        setFormErrors(prev => ({ ...prev, [field]: "" })); // Сбрасываем ошибку при вводе
    };

    const checkPassword = () => {
        return formData.password === formData.confirmPassword;
    };

    const validateForm = () => {
        let errors = {};

        if (!formData.email) errors.email = "Введите email";
        if (!formData.password) errors.password = "Введите пароль";

        if (authType === "registration") {
            if (!formData.username) errors.username = "Введите имя";
            if (!formData.phone) errors.phone = "Введите телефон";
            if (!formData.confirmPassword) errors.confirmPassword = "Повторите пароль";
            if (formData.password && !checkPassword()) errors.confirmPassword = "Пароли не совпадают";
        }

        if (!agreeToPolicy) errors.policy = "Вы должны согласиться с политикой";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        console.log("Form submitted:", formData);
    };

    const isFormValid = () => {
        console.log("Я работаю")
        if (authType === "login") {
            console.log("Логин")
            return formData.email && formData.password && agreeToPolicy;
        } else {
            console.log("Рег")
            return (
                formData.email &&
                formData.password &&
                formData.username &&
                formData.phone &&
                formData.confirmPassword &&
                checkPassword() &&
                agreeToPolicy
            );
        }
    };

    return (
        <div className="auth__container">
            <motion.section
                className="auth__section"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="auth-tabs">
                    {["login", "registration"].map((type) => (
                        <motion.button
                            key={type}
                            className={`auth-tab ${authType === type ? "active" : ""}`}
                            onClick={() => setAuthType(type)}
                        >
                            {type === "login" ? "Авторизация" : "Регистрация"}
                            {authType === type && (
                                <motion.div
                                    className="underline"
                                    layoutId="underline"
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={authType}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.3 }}
                    >
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-fields">
                                {authType === "registration" && (
                                    <>
                                        <div className='form__field-name'>
                                            <label>Имя<span>*</span></label>
                                            <Input
                                                value={formData.username}
                                                onChange={handleInputChange("username")}
                                                placeholder="Введите ваше имя"
                                            />
                                            {formErrors.username && <p className="error">{formErrors.username}</p>}
                                        </div>

                                        <div className='form__field-tel'>
                                            <label>Телефон<span>*</span></label>
                                            <Input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={handleInputChange("phone")}
                                                placeholder="+7 (999) 999-99-99"
                                            />
                                            {formErrors.phone && <p className="error">{formErrors.phone}</p>}
                                        </div>
                                    </>
                                )}

                                <div className='form__field-email'>
                                    <label>Email<span>*</span></label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange("email")}
                                        placeholder="example@gmail.com"
                                    />
                                    {formErrors.email && <p className="error">{formErrors.email}</p>}
                                </div>

                                <div className='form__field-password'>
                                    <label>Пароль<span>*</span></label>
                                    <Input
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange("password")}
                                        placeholder="Минимум 8 символов"
                                    />
                                    {formErrors.password && <p className="error">{formErrors.password}</p>}
                                </div>

                                {authType === "registration" && (
                                    <div className='form__field-password'>
                                        <label>Повторите пароль<span>*</span></label>
                                        <Input
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange("confirmPassword")}
                                            placeholder="Повторите пароль"
                                        />
                                        {formErrors.confirmPassword && <p className="error">{formErrors.confirmPassword}</p>}
                                    </div>
                                )}
                            </div>

                            <motion.div
                                className="form-agreement"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Checkbox
                                    id="policy-agreement"
                                    checked={agreeToPolicy}
                                    onChange={(e) => setAgreeToPolicy(e.target.checked)}
                                />
                                <label htmlFor="policy-agreement" className="agreement-text">
                                    Я согласен с <a href="#">политикой конфиденциальности</a> и на обработку персональных данных
                                </label>
                                {formErrors.policy && <p className="error">{formErrors.policy}</p>}
                            </motion.div>

                            <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }}>
                                <Button
                                    type="submit"
                                    text={authType === "login" ? "Войти" : "Зарегистрироваться"}
                                    disabled={!isFormValid}
                                />
                            </motion.div>
                        </form>
                    </motion.div>
                </AnimatePresence>
            </motion.section>
        </div>
    );
};

export default Auth;
