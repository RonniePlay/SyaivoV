import "./footerStyles.scss";
import { Link, NavLink } from "react-router-dom";
import mailIcon from "../../assets/img/footer/email.png";
import callIconFooter from "../../assets/img/footer/phone.png";
import geo_point from "../../assets/img/footer/point.png";
import instagram from "../../assets/img/footer/instagram.png";
import avatar from "../../assets/img/avatar.svg";
import { useMemo } from "react";

const Footer = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer>
      <div className="container f-top">
        <div className="f-info">
          <div className="company-info">
            <NavLink to="/">
              <img draggable="false" src={avatar} alt="avatar" />
              <div>СЯЙВО-В</div>
            </NavLink>
            <div>
              Спецодяг, господарчі товари, логотипи, взуття, засоби захисту від
              вітчизняного та зарубіжного виробника та супутні товари
              господарської групи.
            </div>
          </div>
          <div className="creator">
            Створив сайт:
            <Link to="https://github.com/RonniePlay" target="_blank">
              RonniePlay
            </Link>
          </div>
        </div>
        <div className="f-pages">
          <NavLink to="/">Головна</NavLink>
          <NavLink to="/catalog">Каталог</NavLink>
          <NavLink to="/size">Розміри</NavLink>
          <NavLink to="/company">Компанія</NavLink>
          <NavLink to="/contact">Контакти</NavLink>
        </div>
        <div className="f-contact">
          <div className="phone">
            <img draggable="false" src={callIconFooter} alt="call" />
            <div>
              <div>(096) 328-28-89</div>
              <div>
                <Link to="tel:+380963282889">(096) 328-28-89</Link>
                <Link to="tel:+380677336594">(067) 733-65-94</Link>
                <Link to="tel:+380503219592">(050) 321-95-92</Link>
              </div>
            </div>
          </div>
          <div className="mail">
            <img draggable="false" src={mailIcon} alt="mail" />
            <Link to="mailto:ppsyaivo-v@ukr.net">ppsyaivo-v@ukr.net</Link>
          </div>
          <div className="insta">
            <img draggable="false" src={instagram} alt="instagram" />
            <Link to="https://www.instagram.com/syaivo_v/" target="_blank">
              syaivo_v
            </Link>
          </div>
          <div className="geo_point">
            <img draggable="false" src={geo_point} alt="geolocation" />
            <div>м. Рівне, Рівненська обл., вул. Відінська, 39б.</div>
          </div>
          <button>
            <div>&#127760;</div>
            <Link to="https://goo.gl/maps/xQsmmbz55W9QEn5B6" target="_blank">
              Відкрити карту
            </Link>
          </button>
        </div>
      </div>
      <hr />
      <div className="container f-bottom">
        Сяйво-В {year} © <span>Всі права захищені</span>
      </div>
    </footer>
  );
};

export default Footer;
