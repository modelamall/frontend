import CategorySection from "../components/CategorySection/CategorySection";
import CompanyLogoSection from "../components/CompanyLogoSection/CompanyLogoSection";
import HeroSection from "../components/HeroSection/HeroSection";
import Incentive from "../components/Incentive/Incentive";
import ProductHomeSection from "../components/Products/ProductHomeSection";

const Home = () => {
  return (
    <>
      <div>
        <HeroSection />
      </div>
      <div>
        <CategorySection />
      </div>
      <div>
        <ProductHomeSection />
      </div>
      <div>
        <CompanyLogoSection />
      </div>
      <div>
        <Incentive />
      </div>
    </>
  );
};

export default Home;
