import { useNavigate } from "react-router";
import fb from "../assets/images/fb.png";
import insta from "../assets/images/insta.png";
import linkedin from "../assets/images/linkdin.png";
import fourBrainsLogo from "../assets/images/fourBrainsLogo.png";
function SocialMediaComponent() {
  const openLink = (id) => {
    if (id === "fb") {
      window.open("https://www.facebook.com/4BrainsTech/", "_blank");
    } else if (id === "insta") {
      window.open("https://www.instagram.com/4brains_tech/", "_blank");
    } else {
      window.open(
        "https://www.linkedin.com/company/4brains-technologies-private-limited/?originalSubdomain=in",
        "_blank"
      );
    }
  };
  return (
    <>
      <div className="footerContainer">
        <div className="followUsText">Immersive Technology Partner</div>
        <div className="footerLogoContianer">
          <img className="footerLogo" src={fourBrainsLogo} alt="logo" />
        </div>
        <div className="socialMediaBox">
          <img src={fb} alt="fb" onClick={() => openLink("fb")} />
          <img src={insta} alt="insta" onClick={() => openLink("insta")} />
          <img
            src={linkedin}
            alt="linkedin"
            onClick={() => openLink("linkedin")}
          />
        </div>
      </div>
    </>
  );
}

export default SocialMediaComponent;
