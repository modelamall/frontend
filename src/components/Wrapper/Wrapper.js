import NavBar from "../NavBar/NavBar";

const Wrapper = ({ children }) => {
    return (
      <div>
        <div>
          <NavBar  />
        </div>
        <div>
          {children}
        </div>
      </div>
    );
  };
  
  export default Wrapper;