import BlogsSection from "../ui/about/BlogsSection";
import OurParteners from "../ui/about/OurParteners";
import DownloadApp from "../ui/home/DownloadApp";
import HeroSection from "../ui/home/HeroSection";
import RentSection from "../ui/home/RentSection";
import WhyUs from "../ui/home/WhyUs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RentSection />
      <WhyUs />
      <OurParteners />
      <BlogsSection />
      <DownloadApp />
    </>
  );
}
