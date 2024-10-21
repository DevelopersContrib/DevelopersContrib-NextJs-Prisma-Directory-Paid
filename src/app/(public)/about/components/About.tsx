import React from "react";
import Script from 'next/script';
import { getDomain } from "@/lib/data";

const About = () => {
  const domain = getDomain();
  return (
    <>
      <Script src={"https://tools.contrib.com/pages/aboutnew?d="+domain+"&container=aboutnew-script"}/>
      <div className="aboutnew-script"></div>
    </>
   
  )
};

export default About;
