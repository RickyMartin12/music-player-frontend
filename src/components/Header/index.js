import { searchIcon } from "../../assets";
import logo_play from '../Header/play.png';

const Header = (props) => {
  return (
    <header className="header flex justify-sb">
      <div className="logo">
        <img src={logo_play} alt="W" height="64px" />
      </div>
      <div>
        <img src={searchIcon} alt="Search" />
      </div>
    </header>
  );
};

export default Header;