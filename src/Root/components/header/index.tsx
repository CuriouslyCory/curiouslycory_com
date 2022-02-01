import './index.scss';
import logo from '../../../assets/images/cc-logo.svg';

export default function Header() {
    return (
      <div className="header-wrapper">
        <div className="logo-wrapper">
            <img className="logo-img" src={logo}/>
        </div>
      </div>
    );
  }