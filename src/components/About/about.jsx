import React from "react";
import "./about.css";
import rudrImage from "../../assets/rudr_image.png";
import krishtiaImage from "../../assets/krishita_image.png";
import atishayaImage from "../../assets/atishaya_image.png";
import anushreeImage from "../../assets/anushree_image.png";
import dheerajImage from "../../assets/dheeraj_image.png";
import kritiImage from "../../assets/kriti_image.png";

const teamMembers = [
  {
    name: "Rudr Pratap Singh",
    role: "AI Developer",
    description: "I give life to machines, cuz low key humans are overrated!",
    image: rudrImage,
    linkedin: "https://linkedin.com/in/rudr-pratap-singh",
    github: "https://github.com/rzzdr",
    instagram: "https://instagram.com/rudrninikarra",
    gmail: "mailto:rudrpsingh@proton.me",
  },
  {
    name: "Krishita Garg",
    role: "Frontend Developer",
    description:
      "I believe in taking charge of destiny — coding the future and transforming visions into reality.",
    image: krishtiaImage,
    linkedin: "https://www.linkedin.com/in/krishita-garg/",
    github: "https://github.com/KrishitaGarg",
    instagram: "https://www.instagram.com/krishita.garg",
    gmail: "mailto:krishitagarg@gmail.com",
  },
  {
    name: "Atishaya Jain",
    role: "Backend Developer",
    description: "Innovating backend solutions with precision.",
    image: atishayaImage,
    linkedin: "http://linkedin.com/in/atishayj2202",
    github: "http://github.com/atishayj2202",
    instagram: "https://www.instagram.com/atishayj2202",
    gmail: "mailto:atishayj2202@gmail.com",
  },
  {
    name: "Anushree Roy",
    role: "UI/UX Designer",
    description:
      "I believe good design is like a good joke- if you have to explain it, it's not working!",
    image: anushreeImage,
    linkedin: "https://www.linkedin.com/in/anushree-roy-082370204",
    github: "#",
    instagram: "https://www.instagram.com/anushree_royyy",
    gmail: "mailto:royanushree29@gmail.com",
  },
  {
    name: "Dheeraj Sharma",
    role: "Frontend Developer",
    description:
      "Full Stack Developer with expertise in building scalable web applications, blending front-end creativity with back-end efficiency and performance.",
    image: dheerajImage,
    linkedin: "https://www.linkedin.com/in/greatnerve/",
    github: "https://github.com/greatnerve",
    instagram: "https://www.instagram.com/greatnerve/",
    gmail: "mailto:dheeraj@greatnerve.com",
  },
  {
    name: "Kriti Singh",
    role: "Presentation Designer",
    description: "Created PPT",
    image: kritiImage,
    linkedin: "https://www.linkedin.com/in/kriti-singh-402866290",
    github: "https://github.com/kritiug23",
    instagram: "https://www.instagram.com/kriti08._",
    gmail: "mailto:kritisingh0823@gmail.com",
  },
];

const Team = () => {
  return (
    <div className="page-container">
      <div className="team-container">
        <div className="team-header">
        </div>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div className="team-member-card" key={index}>
              <img
                src={member.image}
                alt={member.name}
                className="team-member-image"
              />
              <div className="team-member-info">
                <h3>{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
                <p className="team-member-description">{member.description}</p>
                <div className="team-member-social">
                  <a href={member.linkedin} target="_blank" rel="noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href={member.github} target="_blank" rel="noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href={member.instagram} target="_blank" rel="noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href={member.gmail}>
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
