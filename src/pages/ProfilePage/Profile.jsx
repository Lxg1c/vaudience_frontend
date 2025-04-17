import "./Profile.scss";
import Input from "../../shared/ui/Input/Input.jsx";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../shared/ui/Button/Button.jsx";
import { useEffect, useState } from "react";
import { saveNewUserData } from "@/enteties/user/api/api.js";
import Loader from "@/shared/ui/Loader/Loader.jsx";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.user.isLoading);

  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: user.currentUser.username,
    phone: user.currentUser.phone,
    email: user.currentUser.email,
  });

  useEffect(() => {
    setUserData({
      username: user.currentUser.username,
      phone: user.currentUser.phone,
      email: user.currentUser.email,
    });
  }, [user.currentUser]);

  const handleSubmit = async () => {
    const payload = {
      userId: user.currentUser.id,
      userData: userData,
    };
    await dispatch(saveNewUserData(payload));
  };

  return (
    <section className="profile">
      <div className="profile__container container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="profile__container-title text-center">Профиль</h1>
            <Input
              placeholder="Имя"
              type="text"
              name="name"
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              value={userData.username}
            />
            <Input
              placeholder="Телефон"
              type="tel"
              name="name"
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              value={userData.phone}
            />
            <Input
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              value={userData.email}
            />
            <Button text="Сохранить" onClick={handleSubmit} />
          </>
        )}
      </div>
    </section>
  );
};

export default Profile;
