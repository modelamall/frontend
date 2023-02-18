import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const Wrapper = ({ children }) => {
  return (
    <>
      <div>
        <NavBar/>
      </div>
      <div>{children}</div>

      <Footer />
    </>
  );
};

export default Wrapper;
