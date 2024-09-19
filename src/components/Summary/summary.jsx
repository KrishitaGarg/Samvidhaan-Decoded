import React, {useEffect, useState} from "react";
import "./summary.css";
import {useParams} from 'react-router-dom'

// import { useSearchParams } from "react-router-dom";
import Markdownrender from "../markdownrender";
//
import { useSearchParams } from 'react-router-dom';




const DetailsPage = () => {

  const parmas = useParams()
  const [loading, setLoading] = useState(false)
  const [ name , setName ] = useState("")
  const [description, setDescription] = useState("")
  const [searchParams] = useSearchParams();
   console.log(searchParams.get("category"))

  let category_id =   searchParams.get("category") || "bc0276d3-1df1-4639-9bf0-592309710ed5"


useEffect(() => {
  feathArticle(category_id)
}, []);

const feathArticle = async  (category) => {
  setLoading(true)
  try {
    const response = await fetch(`https://sih-main-hackathon.yellowbush-cadc3844.centralindia.azurecontainerapps.io/user/${category_id}/get-category/`)
    const data = await response.json()
    console.log(data)
    setDescription(data.description)
    setName(data.name)
    setLoading(false)
  } catch (e) {
    setLoading(false)
    console.log(e.message)
  }
}



return (
    <div className="details-page">
      <section className="content">
        <div className="title-section">
          {/*<h1>{*/}
          {/*  name || "Officers Of The State"*/}
          {/*}</h1>*/}

          <Markdownrender content={description}/>
        </div>
        <div>

        </div>

        {/*<div className="content-details">*/}
        {/*  <ul className="list">*/}
        {/*    <li>Subtitle</li>*/}
        {/*    <li>Overview</li>*/}
        {/*    <li>Article 178</li>*/}
        {/*    <li>*/}
        {/*      Decoded Version:{" "}*/}
        {/*      <span className="highlight">*/}
        {/*        Choosing The Speaker And Deputy Speaker*/}
        {/*      </span>*/}
        {/*    </li>*/}
        {/*  </ul>*/}

        {/*  <div className="description">*/}
        {/*    <p>*/}
        {/*      Each State's Legislative Assembly Must Choose Two Of Its Members*/}
        {/*      To Be The Speaker And Deputy Speaker.*/}
        {/*    </p>*/}

        {/*    <p>*/}
        {/*      <span className="highlight-role">Speaker:</span> The Main Person*/}
        {/*      Who Leads The Assembly Meetings.*/}
        {/*    </p>*/}

        {/*    <p>*/}
        {/*      <span className="highlight-role">Deputy Speaker:</span> The Person*/}
        {/*      Who Helps The Speaker And Takes Over When The Speaker Is Absent.*/}
        {/*    </p>*/}

        {/*    <p>*/}
        {/*      When Either Position Becomes Vacant, The Assembly Must Choose New*/}
        {/*      Members To Fill These Roles.*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </section>
    </div>
  );
};

export default DetailsPage;
