import Navbar from "../components/common/Navbar";
import DonationForm from "../components/DonationForm";
import AboutSection from "../components/sections/AboutSection";
import FooterSection from "../components/sections/FooterSection";
import HeroSections from "../components/sections/HeroSections";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import TransactionsSection from "../components/sections/TransactionsSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FEF3E2] font-poppins">
      <div className="w-full max-w-[1550px] mx-auto">
        {/* <Button
          type="button"
          text="Contribute"
          icon={<img src="/Two Hearts.webp" width={"30px"} alt="Love Icon" />}
          className="bg-brown text-sm font-semibold hover:bg-yellow text-dark-brown !rounded-full"
          onClick={() => alert("Clicked")}
        /> */}
        <Navbar />
        <HeroSections />
        <HowItWorksSection />
        <TransactionsSection />
        <AboutSection />
        <FooterSection />
        <DonationForm />
      </div>
    </div>
  );
};

export default Home;
