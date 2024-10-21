import Image from "next/image"
import {FaFacebookF, FaTwitter, FaLinkedinIn} from "react-icons/fa"

const Footer = ({domain, twitter_url, fb_url, linkedin_url}) => {
  return (
    <footer className="tw-bg-[#020E1E] tw-py-12 tw-text-white">
        <div className="container">
        <div className="row">
            <div className="col-xl-4">
            <h4 className="tw-font-semibold mb-3">{domain}</h4>
            <p className="small">
            Join a vibrant community of developers, influencers, and entrepreneurs on {domain}, all using the versatile CONTRIB token to power their token economies!
            </p>
            </div>
            <div className="col-xl-8 tw-flex tw-justify-between xl:tw-pl-[10rem!important]">
            <div className="col">
                <h4 className="tw-font-bold mb-3">
                Get Started
                </h4>
                <ul className="list-unstyled">
                <li className="mb-3">
                    <a href="/partner" className="tw-no-underline tw-text-white tw-inline-block">
                    Partner
                    </a>
                </li>
                <li className="mb-3">
                    <a href="/staffing" className="tw-no-underline tw-text-white tw-inline-block">
                    Apply Now
                    </a>
                </li>
                <li className="mb-3">
                    <a href="/referral" className="tw-no-underline tw-text-white tw-inline-block">
                    Referral
                    </a>
                </li>
                <li className="mb-3">
                    <a href="/developers" className="tw-no-underline tw-text-white tw-inline-block">
                    Developers
                    </a>
                </li>
                <li className="mb-3">
                    <a href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className="tw-no-underline tw-text-white tw-inline-block">
                    Build
                    </a>
                </li>
                <li className="mb-3">
                    <a href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className="tw-no-underline tw-text-white tw-inline-block">
                    Invest
                    </a>
                </li>
                <li className="mb-3">
                    <a href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className="tw-no-underline tw-text-white tw-inline-block">
                    Manage
                    </a>
                </li>
                <li className="mb-3">
                    <a href={`https://domaindirectory.com/servicepage/?domain=${domain}`} className="tw-no-underline tw-text-white tw-inline-block">
                    Monetize
                    </a>
                </li>
                </ul>
            </div>
            <div className="col">
                <h4 className="tw-font-bold mb-3">
                Company
                </h4>
                <ul className="list-unstyled">
                <li className="mb-3">
                    <a href="/about" className="tw-no-underline tw-text-white tw-inline-block">
                    About Us
                    </a>
                </li>
                <li className="mb-3">
                    <a href="/contact" className="tw-no-underline tw-text-white tw-inline-block">
                    Contact Us
                    </a>
                </li>
                <li className="mb-3">
                    <a href="/terms" className="tw-no-underline tw-text-white tw-inline-block">
                    Terms
                    </a>
                </li>
                <li className="mb-3">
                    <a href="/privacy" className="tw-no-underline tw-text-white tw-inline-block">
                    Privacy
                    </a>
                </li>
                </ul>
            </div>
            <div className="col">
                <h4 className="tw-font-bold mb-3">
                Partners
                </h4>
                <ul className="list-unstyled">
                <li className="mb-3">
                    <a href="https://www.contrib.com/" className="tw-no-underline tw-text-white tw-inline-block">
                    <Image 
                        src="https://s3.amazonaws.com/assets.zipsite.net/images/jayson/logo/logo-new-contrib-06-wyt.png"
                        width={129}
                        height={40}
                        alt=""
                        className="img-fluid"
                    />
                    </a>
                </li>
                </ul>
                <h4 className="tw-font-bold mb-3">
                Socials
                </h4>
                <ul className="list-inline">
                <li className="mb-3 list-inline-item">
                    <a href={fb_url} className="tw-no-underline tw-text-white tw-inline-block">
                    <FaFacebookF/>
                    </a>
                </li>
                <li className="mb-3 list-inline-item">
                    <a href={twitter_url} className="tw-no-underline tw-text-white tw-inline-block">
                    <FaTwitter />
                    </a>
                </li>
                <li className="mb-3 list-inline-item">
                    <a href={linkedin_url} className="tw-no-underline tw-text-white tw-inline-block">
                    <FaLinkedinIn />
                    </a>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    </footer>
  )
}
export default Footer