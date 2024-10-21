import Image from "next/image";
import Navbar from "react-bootstrap/Navbar";

export default function Logo({ domain, logo }) {
  if (logo != null && logo != "") {
    return (
      <Image
        src={logo}
        width={120}
        height={120}
        alt=""
        className="d-inline-flex img-fluid mb-3 tw-pr-3"
      />
    );
  } else {
    return <Navbar.Brand href="#home">{domain}</Navbar.Brand>;
  }
}
