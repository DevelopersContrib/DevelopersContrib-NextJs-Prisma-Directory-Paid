import React from "react";
import Script from 'next/script';
import { getDomain } from "@/lib/data";

const Terms = () => {
  const domain = getDomain();
  return (
    <>
      <Script src={"https://tools.contrib.com/pages/terms?d="+domain+"&container=terms-script"}/>
      <div className="terms-script"></div>
    </>
   
  )
};

export default Terms;
