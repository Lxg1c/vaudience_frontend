import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Auth.scss";
import Input from "@/shared/ui/Input/Input.jsx";
import Button from "@/shared/ui/Button/Button.jsx";
import Checkbox from "@/shared/ui/Checkbox/Checkbox.jsx";
import { useDispatch } from "react-redux";
import { registerUser, loginUser, aboutUser } from "@/enteties/user/index.js";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authType, setAuthType] = useState("login");
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\+7\d{10}$/.test(phone);

  // Валидация при изменении пароля
  useEffect(() => {
    if (authType === "registration" && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Пароли не совпадают",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      }
    }
  }, [formData.password, formData.confirmPassword, authType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Имя обязательно" : "";
      case "phone":
        return !validatePhone(value) ? "Некорректный телефон" : "";
      case "email":
        return !validateEmail(value) ? "Некорректный email" : "";
      case "password":
        return value.length < 8 ? "Минимум 8 символов" : "";
      case "confirmPassword":
        return formData.password !== value ? "Пароли не совпадают" : "";
      default:
        return "";
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (authType === "registration") {
      newErrors.name = validateField("name", formData.name);
      newErrors.phone = validateField("phone", formData.phone);
      newErrors.confirmPassword = validateField("confirmPassword", formData.confirmPassword);

      if (!agreeToPolicy) {
        newErrors.agreeToPolicy = "Необходимо согласие";
      }
    }

    newErrors.email = validateField("email", formData.email);
    newErrors.password = validateField("password", formData.password);

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const payload =
      authType === "login"
        ? {
            email: formData.email,
            password: formData.password,
            rememberMe,
          }
        : {
            username: formData.name,
            phone: formData.phone,
            email: formData.email,

            password: formData.password,
          };

    try {
      if (authType === "login") {
        const response = await dispatch(loginUser(payload));

        if (response.meta.requestStatus === "fulfilled") {
          await dispatch(aboutUser());
          navigate("../");
        }
      } else {
        const response = await dispatch(registerUser(payload));
        if (response.meta.requestStatus === "fulfilled") {
          setAuthType("login");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    if (authType === "login") {
      return validateEmail(formData.email) && formData.password.length >= 8;
    }

    return (
      formData.name.trim() &&
      validatePhone(formData.phone) &&
      validateEmail(formData.email) &&
      formData.password.length >= 8 &&
      formData.password === formData.confirmPassword &&
      agreeToPolicy
    );
  };

  return (
    <div className="auth__container" style={{ position: "relative" }}>
      {isLoading && (
        <div className="loading-overlay">
          <Spinner animation="border" role="status" />
        </div>
      )}
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
                    <div className="form__field-name">
                      <label>
                        Имя<span>*</span>
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Введите ваше имя"
                        error={errors.name}
                      />
                    </div>

                    <div className="form__field-tel">
                      <label>
                        Телефон<span>*</span>
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="+7 (999) 999-99-99"
                        error={errors.phone}
                      />
                    </div>
                  </>
                )}

                <div className="form__field-email">
                  <label>
                    Email<span>*</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="example@gmail.com"
                    error={errors.email}
                  />
                </div>

                <div className="form__field-password">
                  <label>
                    Пароль<span>*</span>
                  </label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Минимум 8 символов"
                    error={errors.password}
                  />
                </div>

                {authType === "registration" && (
                  <div className="form__field-password">
                    <label>
                      Повторите пароль<span>*</span>
                    </label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Повторите пароль"
                      error={errors.confirmPassword}
                    />
                  </div>
                )}
              </div>

              <motion.div
                className="form-agreement"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {authType === "registration" ? (
                  <>
                    <Checkbox
                      id="policy-agreement"
                      checked={agreeToPolicy}
                      onChange={(e) => setAgreeToPolicy(e.target.checked)}
                    />
                    <label htmlFor="policy-agreement" className="agreement-text">
                      Я согласен с <a href="#">политикой конфиденциальности</a> и на обработку
                      персональных данных
                    </label>
                    {errors.agreeToPolicy && <p className="error">{errors.agreeToPolicy}</p>}
                  </>
                ) : (
                  <>
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember-me" className="agreement-text">
                      Запомнить меня
                    </label>
                  </>
                )}
              </motion.div>

              <motion.div whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }}>
                <Button
                  type="submit"
                  text={authType === "login" ? "Войти" : "Зарегистрироваться"}
                  disabled={!isFormValid()}
                />
              </motion.div>

              {authType === "login" && (
                <div className="forgot__password-container">
                  <a className="forgot__password-container--link btn-reset" href="#">
                    Забыли пароль?
                  </a>
                </div>
              )}
            </form>
          </motion.div>
        </AnimatePresence>
      </motion.section>
    </div>
  );
};

export default Auth;
