import ConstitutionTreeGraph from "./ConstitutionTreeGraph";
import "./treeGraph.css";

const ConstitutionSection = () => {
  return (
    <section className="constitution-section">
      <div className="constitution-content">
        <h1 className="title">
          Understanding <span>Constitution</span>
        </h1>
        <h2 className="subtitle">With संविधान Decoded</h2>
        <h4 className="description">
          "The website provides a streamlined interface that presents simplified
          summaries of all the articles in the constitution, making it easy for
          users to understand complex legal texts!"
        </h4>
        <ConstitutionTreeGraph />
      </div>
    </section>
  );
};

export default ConstitutionSection;
