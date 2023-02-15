import NavBar from "../NavBar/NavBar";

const Wrapper = ({ children }) => {
    return (
      <div className="flex">
        <div
          style={{
            
          }}
        >
          <NavBar  />
        </div>
        <div
          style={{
          }}
        >
          {children}
        </div>
      </div>
    );
  };
  
  export default Wrapper;