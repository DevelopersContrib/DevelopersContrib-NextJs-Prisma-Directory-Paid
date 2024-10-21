"use client"
import Nav from 'react-bootstrap/Nav';
import Logo from '@/components/includes/Logo';
import { useRouter } from 'next/navigation'
import { useState } from "react";
import Navbar from 'react-bootstrap/Navbar';
import { SlMagnifier } from "react-icons/sl";


const Navigation = ({domain,logo}) => {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      redirectToSearch();
    }
  };

  const redirectToSearch = () => {
    const url = `/search?key=${encodeURIComponent(inputValue)}`;
    router.push(url);
  };


  return (
    <>
      <Navbar expand="lg" className="tw-bg-[transparent!important] tw-mt-5">
        <div className='container'>
          <Logo domain={domain} logo={logo} />
        
          <Navbar.Toggle />
          <Navbar.Collapse >
            <div 
              className="d-flex tw-border tw-border-gray-200 tw-border-solid tw-bg-white tw-rounded-lg tw-items-center tw-max-w-[300px!important]"
            >
              <span className='tw-pl-2'>
                <SlMagnifier className='tw-text-gray-300' />
              </span>
              <input type="text" className="form-control tw-bg-[transparent] tw-border-[transparent!important] search-input" placeholder='Search domain' 
              onChange={handleInputChange} 
              onKeyDown={handleKeyDown}
              />
            </div>
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About Us</Nav.Link>
              <Nav.Link href="/contact">Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
    
  )
}

export default Navigation