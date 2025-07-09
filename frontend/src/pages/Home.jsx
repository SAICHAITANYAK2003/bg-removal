import React from "react";
import HeroSection from "../components/HeroSection";
import Steps from "../components/Steps";
import BgSlider from "../components/BgSlider";
import Testimonials from "../components/Testimonials";
import MagicSection from "../components/MagicSection";

const Home = () => {
  return (
    <>
      <main className="md:px-24 w-full">
        <section>
          <HeroSection />
        </section>
        <section>
          <Steps />
        </section>
        <section>
          <BgSlider />
        </section>
        <section>
          <Testimonials />
        </section>
        <section>
          <MagicSection />
        </section>
      </main>
    </>
  );
};

export default Home;
