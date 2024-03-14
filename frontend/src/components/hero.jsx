import { useNavigate } from "react-router-dom";
import React from "react";
import MainImg from "../assets/main.png";

const Hero = ({ setRegisterModalShow }) => {
  const navigate = useNavigate();

  const handleRecipe = () => {
    if (localStorage.getItem("token") === null) {
      alert("Please login to view recipes");
    } else {
      navigate("/recipes");
    }
  };
  return (
    <div className="flex justify-center items-center gap-20 mt-5">
      {/* LEFT SECTION */}
      <section className="ml-4">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold">
          Best Recipes
        </h1>
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold">
          In{" "}
          <span className="text-theme text-5xl md:text-6xl lg:text-8xl font-bold">
            Town.
          </span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-extralight">
          We provide best recipes in town, we provide home
        </p>
        <p className="text-lg md:text-xl lg:text-2xl font-extralight">
          delivery and dine in sevices
        </p>
        <div className="flex gap-8 mt-5">
          <button
            onClick={() => setRegisterModalShow(true)}
            className="bg-theme py-6 px-3 md:px-7 lg:px-12 rounded-xl text-lg font-medium text-white"
          >
            Register Now!
          </button>
          <button
            onClick={handleRecipe}
            className="bg-light-theme py-6 px-4 md:px-7 lg:px-12 rounded-xl text-lg font-medium"
          >
            Recipes
          </button>
        </div>
      </section>
      {/* RIGHT SECTION */}
      <section className="hidden md:block lg:block">
        <img width={600} src={MainImg} alt="Main" />
      </section>
    </div>
  );
};

export default Hero;
