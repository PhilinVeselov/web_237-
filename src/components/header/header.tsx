import './header.css'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const Header = () => {
  return (
    <header className="section__header">
        <a className="header__logo" href="/">237#</a>
          <nav className="header__menu">
            <a href="/about">О нас</a>
            <a href="/register">Войти</a>
          </nav>
      </header>
    )
}

export default Header;