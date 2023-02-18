import CategorySection from "../components/CategorySection/CategorySection";
import HeroSection from "../components/HeroSection/HeroSection";
import ProductHomeSection from "../components/Products/ProductHomeSection";

const Home = () => {
  return (
    <>
        <div>
            <HeroSection/>
        </div>
        <div>
            <CategorySection/>
        </div>
        <div>
          <ProductHomeSection/>
        </div>
    </>
  );
};

export default Home;
