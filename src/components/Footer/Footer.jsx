import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gradient-to-r from-blue-900 via-blue-800 to-black border-t-2 border-t-gray-700">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
                <h3 className="text-white text-3xl font-bold ml-2">DraftCloud</h3>
              </div>
              <div>
                <p className="text-sm text-gray-300">
                  &copy; {new Date().getFullYear()}. All Rights Reserved by Rishubh Dixit.
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Developed by Rishubh Dixit
                </p>
                <div className="flex items-center mt-2 space-x-4">
                  <a
                    href="https://github.com/rishubhdixt"
                    className="text-gray-300 hover:text-gray-100"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                      alt="GitHub"
                      className="w-6 h-6"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rishubh-dixit-0269801a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    className="text-blue-400 hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Linkedin_icon.svg"
                      alt="LinkedIn"
                      className="w-6 h-6"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">Company</h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">Support</h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">Legals</h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Terms & Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-300 hover:text-gray-200" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;

