import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { HiLink } from "react-icons/hi";

const Footer = () => {
  return (
    <>
      <footer className="flex flex-col  items-center justify-around w-full py-16 text-sm  mt-15   ">
        <h1 className="text-4xl max-sm:ml-3 md:text-6xl footer-font font-extrabold">
          <span className="text-6xl footer-font  font-extrabold text-violet-600 ">
            Developed
          </span>{" "}
          by Developer of WebInFloo ...
        </h1>

        <div className="flex items-center gap-4 mt-10">
          <a
            href="https://linkedin.com/in/saichaitanyakoduri"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-4 rounded-full hover:text-blue-800 cursor-pointer hover:shadow hover:scale-105 transition duration-300 flex items-center"
          >
            <FaLinkedin size={30} />
            <span className="ml-2">Linkedin</span>
          </a>
          <a
            href="https://webinfloo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-4 rounded-full hover:text-green-800 cursor-pointer hover:shadow hover:scale-105 transition duration-300 flex items-center"
          >
            <HiLink size={30} />
            <span className=" ml-2">Visit webinfloo</span>
          </a>
        </div>
        <p className="mt-8 text-center">
          Copyright © {new Date().getUTCFullYear()}
          {"  "} WebInFloo. All rights reservered.
        </p>
        <div>
          <button></button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
