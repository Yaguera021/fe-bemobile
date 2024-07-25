import Logo from "../../assets/images/beLogo.png";

import "./Header.css";

const Header: React.FC = () => {
  return (
    <div className='header-container'>
      <img src={Logo} alt='Logo' />
    </div>
  );
};

export default Header;
