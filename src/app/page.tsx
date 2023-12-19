import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup, faShieldCat, faPersonChalkboard } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div>
      <Header />
      
      <div className="section section__content">
        <div className="content__text">
          <h1>Lorem ipsum dolor sit</h1>
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </h2>
        </div>
        <img className="content__img" src="/images/image1.png" alt="" />
      </div>

      <div className="section section__about">
        <div className="about__card">
          <FontAwesomeIcon className="card__icon" icon={faPeopleGroup}></FontAwesomeIcon>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div className="about__card">
          <FontAwesomeIcon className="card__icon" icon={faShieldCat}></FontAwesomeIcon>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
        <div className="about__card">
          <FontAwesomeIcon className="card__icon" icon={faPersonChalkboard}></FontAwesomeIcon>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
      </div>


      <Footer />
    </div>
  )
}
