import HeroSection from "../ui/home/HeroSection";
import RentSection from "../ui/home/RentSection";
import WhyUs from "../ui/home/WhyUs";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="container">
        <RentSection />
      </div>
      <WhyUs />
    </>
  );
}
