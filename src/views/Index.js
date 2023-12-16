import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import TranslationGPT from 'components/Footers/TranslationGPT.js';

// sections for this page
import About from "./index-sections/About.js";
import BattleSimulator from "./index-sections/BattleSimulator.js";
import Encyclopedia from "./index-sections/Encyclopedia.js";

function Index() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          <About />
          <TranslationGPT />
          <Encyclopedia />
          <BattleSimulator />
        </div>
      </div>
    </>
  );
}

export default Index;
