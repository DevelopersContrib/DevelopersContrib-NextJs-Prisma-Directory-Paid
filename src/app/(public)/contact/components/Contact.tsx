import React from "react";
import Script from 'next/script';
import { getDomain } from "@/lib/data";

const Contact = () => {
  const domain = getDomain();
  return (
    <>
      <Script src={"https://tools.contrib.com/pages/contact?d="+domain+"&container=contactnew-script"}/>
      <div className="contactnew-script"></div>
    </>
   
  )
};

export default Contact;
