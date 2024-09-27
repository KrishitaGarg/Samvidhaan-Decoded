import "./Loading.css";
import MaimImage from "../../assets/main_image.png";
import CloudImage from "../../assets/cloud.png";
import { motion } from "framer-motion";
import useWindowSize from "react-use/lib/useWindowSize";

export default function Loading() {
  const { width } = useWindowSize();

  return (
    <motion.div
      className="loading-overlay"
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
      initial={{ top: 0 }}
      animate={{ top: "-100%" }}
      exit={{ top: "-100%" }}
    >
      <motion.div
        className="loading-cloud"
        key="cloud-1"
        initial={{
          x: width < 768 ? "40vw" : "30vw",
          y: width < 768 ? "30vh" : "10vh",
        }}
        animate={{ x: "-50vw", y: width < 768 ? "30vh" : "8vh" }}
        transition={{ duration: 2, ease: "easeIn" }}
        exit={{ x: "-50vw", y: width < 768 ? "30vh" : "8vh" }}
      >
        <img src={CloudImage} alt="Cloud" className="cloud-image" />
      </motion.div>
      <motion.div
        className="loading-cloud"
        key="cloud-2"
        initial={{
          x: width < 768 ? "0vw" : "60vw",
          y: width < 768 ? "20vh" : "16vh",
        }}
        animate={{ x: "150vw", y: width < 768 ? "20vh" : "12vh" }}
        transition={{ duration: 2, ease: "easeIn" }}
        exit={{ x: "150vw", y: width < 768 ? "20vh" : "12vh" }}
      >
        <img src={CloudImage} alt="Cloud" className="cloud-image" />
      </motion.div>
      <div className="main-Image">
        <img src={MaimImage} alt="Loading..." className="loading-image" />
      </div>
    </motion.div>
  );
}
