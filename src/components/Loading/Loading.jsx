import "./Loading.css";
import MaimImage from "../../assets/main_image.png";
import CloudImage from "../../assets/cloud.png";
export default function Loading() {
  return (
    <div className="loading-overlay">
      <img src={MaimImage} alt="Loading..." className="loading-image" />
      {/* <img src={CloudImage} alt="Loading..." className="loading-cloud-1" />
      <img src={CloudImage} alt="Loading..." className="loading-cloud-2" />
      <image src={CloudImage} alt="Loading..." className="loading-cloud-3" /> */}
    </div>
  );
}
