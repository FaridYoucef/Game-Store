import { FaSquareFacebook } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoDiscord } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="mt-2 bg-slate-100">
      <div className="flex items-center gap-6 w-8 text-green-600 p-6 ml-4 ">
        <a href="">
          <FaSquareFacebook className="size-6 md:size-8 lg:size-10" />
        </a>
        <a href="">
          <BsInstagram className="size-6 md:size-8 lg:size-10" />
        </a>
        <a href="">
          <FaSquareXTwitter className="size-6 md:size-8 lg:size-10" />
        </a>
        <a href="">
          <IoLogoDiscord className="size-6 md:size-8 lg:size-10" />
        </a>
        <a href="">
          <FaYoutube className="size-6 md:size-8 lg:size-10" />
        </a>
        <a href="">
          <FaTwitch className="size-6 md:size-8 lg:size-10" />
        </a>
      </div>

      <div className="flex gap-20 p-4 mx-10 text-gray-500 text-xs md:text-sm lg:text-lg font-light">
        <div className="flex flex-col">
          <h5 className="font-bold">Costomer services</h5>
          <a href="">Help Home</a>
          <a href="">Contact Us</a>
          <a href="">Delivery & Collection</a>
          <a href="">Return Policy</a>
          <a href="">Track Order</a>
        </div>

        <div className="flex flex-col">
          <h5 className="font-bold">SUPPORT</h5>
          <a href="">Ask a qustion</a>
          <a href="">FAQ</a>
          <a href="">About US</a>
        </div>

        <div className="flex flex-col">
          <h5 className="font-bold">WORK WITH US</h5>
          <a href="">CEO</a>
          <a href="">Organizers</a>
          <a href="">Developers</a>
        </div>

        <div className="payment">
          <img src="/assets/images/paypal.avif" alt="" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
