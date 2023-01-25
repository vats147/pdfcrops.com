import Image from 'next/image'
import React, { useState } from 'react'
import contactOne from "../../public/images/contactOne.png"
import Link from 'next/link';

const Index = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");



    const submitForm = async (e) => {
        e.preventDefault();

        fetch(`https://formcarry.com/s/EfFhKhMi0k`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ name: name, email: email, message: message })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.code === 200) {
                    setSubmitted(true);
                } else {
                    setError(res.message);
                }
            })
            .catch((error) => setError(error));
    }

    if (error) {
        return <div className='fixed inset-0 w-full h-screen flex flex-col justify-center items-center bg-[#F7FBFE] space-y-5 text-center'>
            <p className='font-semibold text-brandPrimaryColor text-2xl'> {error} </p>
            <Link href="/"> Navigate to home </Link>
        </div>
    }

    if (submitted) {
        return (
            <div className='fixed inset-0 w-full h-screen flex flex-col justify-center items-center bg-[#F7FBFE] space-y-5 text-center'>
                <p className='font-semibold text-brandPrimaryColor text-2xl'> We've received your message, thank you for contacting us! </p>
                <Link href="/"> Navigate to home </Link>
            </div>
        )
    }


    return (
        <main className='w-full h-full mt-[10vh] bg-gray-100 flex flex-col items-center justify-start pb-32'>

            <section className='w-full flex flex-col justify-start items-center lg:flex-row lg:items-center lg:justify-center bg-[#F7FBFE]'>

                {/*  ---- Hero Image ----  */}
                <div className='hidden lg:inline-flex w-full h-full lg:w-[40%] justify-center items-center'>
                    <Image
                        draggable="false"
                        quality={100}
                        unoptimized
                        src={contactOne}
                        alt="hero-image"
                        width={30}
                        height={30}
                        className="w-full lg:w-[90%] 2xl:w-[70%] aspect-square" />

                </div>

                {/* ---- Text ---- */}
                <div className='w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] flex flex-col justify-start lg:justify-center items-center lg:pt-20'>
                    <div className='w-full lg:text-left flex flex-col items-center justify-start text-center space-y-2 lg:space-y-3 '>

                        <section className="text-gray-600 body-font">
                            <div className="container px-5 py-24 mx-auto">
                                <div className="flex flex-col text-center w-full mb-12">
                                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium title-font mb-4 text-gray-900">Contact Us</h1>
                                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base"> If you have any question or suggestion for us, please feel free to send :) </p>
                                </div>

                                <form className="lg:w-1/2 md:w-2/3 mx-auto" onSubmit={submitForm}>
                                    <div className="flex flex-wrap -m-2">
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-2 w-full">
                                            <div className="relative">
                                                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="p-2 w-full">
                                            <button type='submit' className="flex mx-auto text-white bg-brandPrimaryColor border-0 py-2 px-8 focus:outline-none hover:bg-[#156BA9] rounded text-lg"> Send </button>
                                        </div>



                                    </div>
                                </form>
                            </div>
                        </section>

                    </div>
                </div>


            </section>

        </main>
    )
}

export default Index