import { FaFacebook, FaTiktok, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

export default function ShareArticle() {
  return (
    <>
      <h3 className="text-2xl px-2">Share Article</h3>
      <div className="flex justify-center items-start p-2 gap-2 ">
        <button>
          <IoLogoWhatsapp size={24} />
        </button>
        <button>
          <FaFacebook size={24} />
        </button>
        <button>
          <FaTwitter size={24} />
        </button>
        <button>
          <FaTiktok size={24} />
        </button>
      </div>
    </>
  );
}
