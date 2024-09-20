import ConstitutionTreeGraph from "./ConstitutionTreeGraph";
import "./treeGraph.css";
import { useTheme } from "../ThemeToggle/ThemeToggle.jsx";

const ConstitutionSection = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme}-theme`}>
      <section className="constitution-section">
        <div className="constitution-content">
          <h1 className="title">
            Understanding <span>Constitution</span>
          </h1>
          <h2 className="subtitle">
            With संविधान <span className="highlight">Decoded</span>
          </h2>
          <h4 className="description">
            "The website provides a streamlined interface that presents
            simplified summaries of all the articles in the constitution, making
            it easy for users to understand{" "}
            <span className="highlight">complex legal texts!"</span>
          </h4>
          <ConstitutionTreeGraph />
        </div>
      </section>
    </div>
  );
};

export default ConstitutionSection;
