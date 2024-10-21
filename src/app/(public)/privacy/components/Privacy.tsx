import React from "react";
import Script from 'next/script';
import { getDomain } from "@/lib/data";

const Privacy = () => {
  const domain = getDomain();
  return (
    <>
      <Script src={"https://tools.contrib.com/pages/privacy?d="+domain+"&container=privacy-script"}/>
      <div className="privacy-script"></div>
    </>
   
  )
};

export default Privacy;
