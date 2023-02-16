import CategorySection from "../components/CategorySection/CategorySection";
import HeroSection from "../components/HeroSection/HeroSection";
import Products from "../components/Products/Products";

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
            <Products/>
        </div>
    </>
  );
};

export default Home;
