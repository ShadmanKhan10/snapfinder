import { useNavigate } from "react-router";
import HeaderComponent from "../components/HeaderComponent";
import snapFinderLogo from "../assets/images/logo.png";
import startBtn from "../assets/images/start.png";
import SocialMediaComponent from "../components/SocialMedia";

function Home() {
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
              navigate("click-selfie");
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

export default Home;
