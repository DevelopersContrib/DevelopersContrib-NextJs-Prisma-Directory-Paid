"use client";

import { useState, useEffect } from "react";
import Image from "next/image"


const Learn = ({domain}) => {

    const initialValues = {
        domain: domain,
        email: ""
    }

    const initialErrors = {
		validate:false,
		emailError: "",
	};

    const [data, setData] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);

    useEffect(() => {
		const validateErrors = () => {
			const dataErrors = {
				emailError: (data.email?'':"Email is required") || (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? "":"Invalid Email"),
			}
			setErrors(dataErrors);
		}
		validateErrors()
	}, [data]);

    const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
		
	};

    const handleSubmit = async(event) => {
		event.preventDefault();

		const isValid = !Object.values(errors).some(v => v);
		setErrors({ ...errors, ['validate']: true })
        console.log(isValid);
        if(isValid ){
         
            try {
                console.log('submit')
                const response = await fetch("/api/lead", {
                method: "POST",
                body: JSON.stringify(data),
                });

              
                
                if (response.ok) {
                const res = await response.json()
                console.log(res.lead.success);
                if(res.lead.success == "success"){
                   
                    console.log('done....')
                    alert('Email successfully sent! We will get in touch with you soon...');
                }else{
                    alert('Email Already Exists')
                }
                
                }else{
                    alert('An error occurred')
                }
            } catch (error) {
                console.log(error);
            } finally {
                //set
            }
		}else{
            alert(errors.emailError);
        }
	}



    return (
        <section className="tw-py-12 tw-bg-gray-100/50">
            <div className="container">
            <div className="row tw-justify-center">
                <div className="col-xl-9">
                <div className="row tw-justify-center tw-items-center">
                    <div className="col-xl-4">
                    <div className="tw-w-1/2 tw-m-auto xl:tw-w-full">
                        <Image 
                        src="https://vnoc.com/assets/lander/assets/images/envelope.png"
                        height={0}
                        width={0}
                        alt=""
                        sizes="100vw"
                        className="tw-w-full img-fluid"
                        />
                    </div>
                    </div>
                    <div className="col-xl-8 tw-flex tw-flex-col">
                    <h2 className="tw-font-bold tw-text-3xl tw-text-[#020E1E] mb-3">
                    Learn more about us
                    </h2>
                    <p className="tw-text-gray-400">
                    Join the Network of Professionals and Digital Asset Owners.
                    </p>
                    <div className="row">
                        <div className="col-lg-9 tw-mb-3 sm:tw-mb-auto">
                        <input type="text" name="email" onChange={handleChange} className="form-control form-control-lg" placeholder="Email Address" />
                        </div>
                        <div className="col-lg-3">
                        <div className="d-grid">
                            <button  onClick={handleSubmit} className="btn btn-primary btn-lg px-4">
                            Submit
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    )
}
export default Learn