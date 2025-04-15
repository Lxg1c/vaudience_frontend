import "./Menu.scss";
import CloseIcon from "../../assets/close-icon.svg";

// eslint-disable-next-line react/prop-types
const Menu = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
      <div className="sidebar__close">
        <button
          onClick={toggleSidebar}
          className="sidebar__close-button"
          role="button"
          aria-label="Close sidebar"
        >
          <img src={CloseIcon} alt="Close" />
        </button>
      </div>
      <ul className="sidebar__list" role="list">
        <li className="sidebar__list-item" role="listitem">
          Новинки
        </li>
        <li className="sidebar__list-item" role="listitem">
          Одежда
        </li>
        <li className="sidebar__list-item" role="listitem">
          Аксессуары
        </li>
        <li className="sidebar__list-item" role="listitem">
          Расспродажа
        </li>
        <li className="sidebar__list-item" role="listitem">
          О нас
        </li>
        <li className="sidebar__list-item" role="listitem">
          Контакты
        </li>
      </ul>
    </div>
  );
};

export default Menu;
