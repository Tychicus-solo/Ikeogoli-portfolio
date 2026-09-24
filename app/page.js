import HeroSection from "./HeroSection/page";
import SelectedWorks from "./SelectedWorks/Page";
import StackTools from "./StackTools/page";
import Experience from "./Experience/page";
import UIGallery from "./UIGallery/page";
import Testimonials from "./Testimonials/page";
import AboutMe from "./AboutMe/page";
import Contact from "./Contact/page";
import { Footer } from "../components";
import LandingMotion from "../components/LandingMotion";
import MainNav from "../components/MainNav";
import HeroNavigation from "../components/HeroNavigation";

export default function Home() {
  return (
    <LandingMotion>
      <div>
        <HeroNavigation mobile />
        <HeroSection />
        <MainNav />
        <SelectedWorks />
        <StackTools />
        <Experience />
        <UIGallery />
        <Testimonials />
        <AboutMe />
        <Contact />
        <Footer />
      </div>
    </LandingMotion>
  );
}
