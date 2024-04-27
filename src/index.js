import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function fetchData(image_container, data_output, link) {
  fetch(link)
    .then((response) => response.json()) // Parse JSON
    .then((data) => {
      console.log(JSON.stringify(data));

      // Process the data
      var item = data[0];

      data_output.render(
        <MyData id={item["id"]} width={item["width"]} height={item["height"]} />
      );

      image_container.render(<MyImage url={item["url"]} alt={item["id"]}/>);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function MyData(props) {
  return (
    <section>
      <p>Image ID: {props.id}</p>
      <p>Image Width: {props.width}</p>
      <p>Image Height: {props.height}</p>
    </section>
  );
}

function MyImage(props) {
  return <img src={props.url} alt={props.alt} />;
}

function MySelect(props) {
  const data_output = ReactDOM.createRoot(
    document.getElementById("data-output")
  );
  const image_container = ReactDOM.createRoot(
    document.getElementById("image-container")
  );

  const [selectedOption, setSelectedOption] = useState(props.cat);
  const [collectedOption, setCollectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = () => {
    setCollectedOption(selectedOption);
    console.log(selectedOption);
    fetchData(image_container, data_output, selectedOption);
  };

  return (
    <section>
      <label>
        Pick a Pet category and Refresh!
        <hr />
        <select
          value={selectedOption}
          onChange={handleChange}
          defaultValue={props.cat}
        >
          <option value={props.cat}>Cat</option>
          <option value={props.dog}>Dog</option>
        </select>
      </label>
      <br />
      <button className="button" onClick={handleButtonClick}>
        Refresh
      </button>
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById("select-container"));
root.render(
  <MySelect
    cat="https://api.thecatapi.com/v1/images/search"
    dog="https://api.thedogapi.com/v1/images/search"
  />
);
