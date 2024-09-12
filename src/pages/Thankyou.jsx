import { useNavigate } from "react-router";
import HeaderComponent from "../components/HeaderComponent";
import snapFinderLogo from "../assets/images/ty.png";
import startBtn from "../assets/images/home.png";
import SocialMediaComponent from "../components/SocialMedia";

function Thankyou() {
  const navigate = useNavigate();

  return (
    <>
      <HeaderComponent />
      <div className="homeContentContainer">
        <div className="prodLogo">
          <img src={snapFinderLogo} alt="snapFinderLogo" />
        </div>
        <div className="btnContainer">
          <img
            src={startBtn}
            alt="startBtn"
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      </div>
      <div className="homeSocialMediaContainer">
        <SocialMediaComponent />
      </div>
    </>
  );
}

export default Thankyou;
