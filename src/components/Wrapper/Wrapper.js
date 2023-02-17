import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const Wrapper = ({ children }) => {
    return (
      <>
      <div>
        <div>
          <NavBar  />
        </div>
        <div>
          {children}
        </div>
      </div>
      <Footer/>
      </>
    );
  };
  
  export default Wrapper;