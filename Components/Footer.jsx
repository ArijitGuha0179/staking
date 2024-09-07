import React from "react";
import { TiSocialFacebook, TiSocialTwitter, TiSocialLinkedin } from "./ReactICON/index";

const Footer = () => {
  const social = [
    {
      link: "#",
      icon: <TiSocialFacebook />,
    },
    {
      link: "#",
      icon: <TiSocialTwitter />,
    },
    {
      link: "#",
      icon: <TiSocialLinkedin />,
    },
  ];

  const footerLinks = [
    {
      title: "Services & features",
      items: ["Invest", "Token", "Affiliate", "Contest", "Safety", "Automatization", "Analytics", "Reports"],
    },
    {
      title: "Company",
      items: ["About Centure", "Our news", "License", "Contacts"],
    },
    {
      title: "Support",
      items: ["Help center", "How it works", "Privacy policy", "Terms & conditions"],
    },
  ];

  return (
    <footer className="footer bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row mb-8">
          {/* Logo and description */}
          <div className="lg:w-1/4 mb-8 lg:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              {/* Placeholder for logo */}
              <div className="bg-purple-500 p-2 rounded-full">
                <div className="text-white text-3xl font-bold">C</div>
              </div>
              <div className="text-xl font-bold text-white">Centure</div>
            </div>
            <p className="text-sm text-white mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vero fugiat exercitationem dignissimos totam nihil quas similique odio.
            </p>
          </div>
          
          {/* Footer Links in a row with white text */}
          <div className="lg:w-3/4 flex justify-between">
            {footerLinks.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col">
                <h3 className="text-white font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <span className="text-white cursor-pointer hover:text-gray-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer bottom section */}
        <div className="pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm mb-4 sm:mb-0">
            © Centure, {new Date().getFullYear()}. Created by @ArijitGuha0179
          </div>
          {/* Social Icons */}
          <div className="flex space-x-4">
            {social.map((item, index) => (
              <a key={index} href={item.link} className="hover:text-white text-xl text-gray-400">
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
