import { FaGoogle, FaFacebookF, FaTwitter, FaTiktok } from "react-icons/fa";
import footerMenu from "@/data/footerRoute.json";

const Footer = () => {
  const { features, contacts } = footerMenu;
  return (
    <footer className="py-5 px-2 md:px-32 bg-leaf mx-auto">
      <div className="flex justify-between items-center md:p-4">
        <h1 className="text-white font-bold text-lg md:text-2xl">Zen Zone</h1>
        <div className="flex gap-11">
          <div className="text-white">
            <h5 className="font-bold text-xl">Features</h5>
            {features.map((feature, index) => {
              return (
                <div className="text-xl" key={index}>
                  {feature.title}
                </div>
              );
            })}
          </div>
          <div className="text-white">
            <h5 className="font-bold text-xl">Contact Us</h5>
            {contacts.map((contact, index) => {
              return (
                <div className="text-xl" key={index}>
                  {contact.title}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex space-x-4">
          <FaGoogle className="text-white md:text-xl" aria-label="Google" />
          <FaFacebookF
            className="text-white md:text-xl"
            aria-label="Facebook"
          />
          <FaTwitter className="text-white md:text-xl" aria-label="Twitter" />
          <FaTiktok className="text-white md:text-xl" aria-label="TikTok" />
        </div>
      </div>
      <div className="p-2">
        <p className="text-center text-white">
          &#169; 2024 Zen Zone. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
