import React, { useRef } from "react";
import NavBar from "../Component/NavBar";
import banner from "../assets/images/banner.png"
import Contribute from "../Component/Contribute";

function AboutUs() {
  const dialogRef = useRef();
  const toggleDialogRef = () => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.hasAttribute("open") ?
      dialogRef.current.close() :
      dialogRef.current.show();
    console.log("clicked");
  }
  
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <NavBar />

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
          Empowering Knowledge Through Community
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
          We're building a calm, reliable space where people share practical insights
          and discover resources across CS, AI, Design, Leadership, and Product.
        </p>
        <img
          src={banner}
          alt="abstract"
          className="mx-auto rounded-xl sm:rounded-2xl shadow-lg w-full max-w-sm sm:max-w-xl object-cover"
        />
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Our goal is simple: help anyone learn faster through community. We curate and
            organize high-quality resources so contributors can share what works, and learners
            can find what matters. Trust and openness guide every decision — from transparent
            curation to respectful discussions — so knowledge remains accessible and
            community-driven.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 sm:mb-12 text-center">
            Core Values
          </h2>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <div className="bg-white shadow-md rounded-xl sm:rounded-2xl p-5 sm:p-6">
              <h3 className="font-semibold text-base sm:text-lg mb-2">Trust</h3>
              <p className="text-gray-600 text-sm">
                We prioritize authenticity and credibility so everyone can rely on what
                they read and share.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl sm:rounded-2xl p-5 sm:p-6">
              <h3 className="font-semibold text-base sm:text-lg mb-2">Openness</h3>
              <p className="text-gray-600 text-sm">
                Transparent practices, open access, and clarity in how content is curated and improved.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl sm:rounded-2xl p-5 sm:p-6">
              <h3 className="font-semibold text-base sm:text-lg mb-2">Collaboration</h3>
              <p className="text-gray-600 text-sm">
                We learn better together. Contributions, reviews, and feedback shape the platform.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-xl sm:rounded-2xl p-5 sm:p-6">
              <h3 className="font-semibold text-base sm:text-lg mb-2">Growth</h3>
              <p className="text-gray-600 text-sm">
                Personal and collective growth through thoughtful curation and practice-ready resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 bg-white rounded-xl sm:rounded-2xl shadow-md p-6 sm:p-8">
          <div className="text-center md:text-left">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Join the community</h2>
            <p className="text-gray-600 text-sm">
              Share a resource or start exploring curated knowledge — your perspective helps others learn.
            </p>
          </div>
          <div className='flex justify-center mt-4 md:mt-0'>
            <button 
              onClick={toggleDialogRef} 
              className="border-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition whitespace-nowrap"
            >
              Contribute ++
            </button>
          </div>
          <dialog 
            ref={dialogRef}
            className="fixed inset-0 m-0 p-0 w-full h-full max-w-none max-h-none bg-black/50 backdrop-blur-sm border-none" 
          >
            <div className='flex flex-col items-center justify-center h-full p-5 gap-5'>
              <Contribute onClick={toggleDialogRef} />
            </div>
          </dialog>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;