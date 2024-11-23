import VKIcon from '../../assets/vk.svg';
import InstagramIcon from '../../assets/instagram.svg';
import TelegramIcon from '../../assets/telegram.svg';

import '../../styles/Footer.scss';
import { Link } from "react-router-dom";

const Footer = () => {
    const footerLinks = [
        'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ',
        'ДОГОВОР ОФЕРТЫ',
        'ДОСТАВКА',
        'ВОЗВРАТ',
        'ПОДДЕРЖКА',
        'РЕКВИЗИТЫ',
    ];

    const socialIcons = [
        { icon: TelegramIcon, alt: 'Telegram' },
        { icon: InstagramIcon, alt: 'Instagram' },
        { icon: VKIcon, alt: 'VK' },
    ];

    return (
        <footer className='footer'>
            <div className='footer__container container'>
                <div className='footer__container-subscribe'>
                    <input className="subscribe-input" type='email' placeholder='Введите E-mail' />
                    <button className='btn-reset subscribe-button' type='submit' aria-label='Подписаться'>Подписаться</button>
                </div>
                <nav>
                    <ul className='footer__doc-list' role="list">
                        {footerLinks.map((link, index) => (
                            <li key={index} className='footer__doc-item' role="listitem">
                                <Link to='#' style={{ color: '#141414' }}>{link}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <ul className='footer__social-list' role="list">
                    {socialIcons.map(({ icon, alt }, index) => (
                        <li key={index} className='social__list-item' role="listitem">
                            <img src={icon} alt={alt} />
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;