import React, {} from "react";
import "./home.scss";
import DropDownField from "./Common/Input/DropDown/DropDownField.tsx";

const Home: React.FC = () => {

  const fakeOptions = [
    {
      value: "opt1",
      label: "option 1",
    },
    {
      value: "opt2",
      label: "option 2",
    },

    {
      value: "opt3",
      label: "option 3",
    },
    {
      value: "opt1",
      label: "option 1",
    }, {
      value: "opt1",
      label: "option 1",
    }, {
      value: "opt1",
      label: "option 1",
    }, {
      value: "opt1",
      label: "option 1",
    }, {
      value: "opt1",
      label: "option 1",
    }, {
      value: "opt1",
      label: "option 1",
    }, {
      value: "opt1",
      label: "option 1",
    }, {
      value: "opt1",
      label: "option 1",
    }, {
      value: "opt1",
      label: "option 1",
    }, {
      value: "opt1",
      label: "option 1",
    }, {
      value: "opt1",
      label: "option 1",
    }, {
      value: "opt1",
      label: "option 1",
    }, {
      value: "opt1",
      label: "option 1",
    },
  ];

  return (
    <main className="home">
      <DropDownField options={fakeOptions} />
    </main>
  );
};

export default Home;