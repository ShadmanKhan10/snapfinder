import { useNavigate } from "react-router";
import "./HeaderComponent.css";
import chandigarhLogo from "../assets/images/chandigarhLogo.png";
function HeaderComponent() {
  const navigate = useNavigate();

  return (
    <>
      <div className="headLogoContainer">
        <img className="headImg" src={chandigarhLogo} alt="logo" />
      </div>
    </>
  );
}

export default HeaderComponent;
