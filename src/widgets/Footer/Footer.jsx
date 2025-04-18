import VKIcon from "@/assets/vk.svg";
import Logo from "@/assets/dark_logo.svg";
import TelegramIcon from "@/assets/telegram.svg";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerSections = [
    {
      title: "Магазин",
      links: [
        { name: "Новинки", url: "#" },
        { name: "Одежда", url: "#" },
        { name: "Аксессуары", url: "#" },
        { name: "Распродажа", url: "#" },
      ],
    },
    {
      title: "Компания",
      links: [
        { name: "История Vaudience", url: "#" },
        { name: "Конфиденциальность", url: "#" },
        { name: "Работа с кукис", url: "#" },
        { name: "Контакты", url: "#" },
        { name: "Оферта", url: "#" },
      ],
    },
    {
      title: "Покупателям",
      links: [
        { name: "Доставка и оплата", url: "#" },
        { name: "Возврат и обмен", url: "#" },
        { name: "Как заказать?", url: "#" },
        { name: "Как выбрать размер", url: "#" },
      ],
    },
    {
      title: "Контакты",
      links: [
        { name: "8 (928) 148-4862", url: "tel:89281484862" },
        { name: "teran_2005@mail.ru", url: "mailto:teran_2005@mail.ru" },
      ],
      socials: [
        { icon: VKIcon, alt: "VK", url: "#" },
        { icon: TelegramIcon, alt: "Telegram", url: "#" },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer__container container" id="aboutus">
        <div className="footer__logo">
          <Link to="/" title="Product">
            <img src={Logo} alt="logo" />
          </Link>
        </div>

        <div className="footer__sections">
          {footerSections.map((section, index) => (
            <div key={index} className="footer__section">
              <h3 className="footer__section-title">{section.title}</h3>
              <nav className="footer__nav">
                <ul className="footer__links-list" role="list">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="footer__link-item" role="listitem">
                      <Link
                        to={link.url}
                        className="footer__link"
                        target={link.url.startsWith("http") ? "_blank" : undefined}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                {section.socials && (
                  <div className="footer__socials">
                    {section.socials.map((social, socialIndex) => (
                      <a
                        key={socialIndex}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer__social-link"
                      >
                        <img src={social.icon} alt={social.alt} className="footer__social-icon" />
                      </a>
                    ))}
                  </div>
                )}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
