import "./Loading.css";
import MaimImage from "../../assets/main_image.png";
import CloudImage from "../../assets/cloud.png";
import { motion } from "framer-motion";

export default function Loading() {
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
        initial={{ x: "25vw", y: "8vh" }}
        animate={{ x: "-25vw", y: "8vh" }}
        transition={{ duration: 2, ease: "easeIn" }}
        exit={{ x: "-50vw", y: "8vh" }}
      >
        <img src={CloudImage} alt="Cloud" className="cloud-image" />
      </motion.div>
      <motion.div
        className="loading-cloud"
        initial={{ x: "65vw", y: "12vh" }}
        animate={{ x: "150vw", y: "12vh" }}
        transition={{ duration: 2, ease: "easeIn" }}
        exit={{ x: "150vw", y: "10vh" }}
      >
        <img src={CloudImage} alt="Cloud" className="cloud-image" />
      </motion.div>
      <div className="main-Image">
        <img src={MaimImage} alt="Loading..." className="loading-image" />
      </div>
    </motion.div>
  );
}
