import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function DashboardHome() {
  const value = 0.12;
  const percentage = 66;

  return (
    <>
    
      <div className="grid grid-rows-1 grid-cols-5 blur-sm ">
        <div className="px-2">
          <CircularProgressbar
            value={value}
            maxValue={1}
            text={`${value * 100}`}
          />
          <p className="text-center text-lg text-gray-700 ">Orders</p>
        </div>
        <div className="px-2">
          <CircularProgressbar value={percentage} text={`${percentage}`} />
          <p className="text-center text-lg text-gray-700 ">returns</p>
        </div>
      </div>
      <div className="text-7xl text-[#701cdb]  text-center "><h2>Coming soon!!</h2></div>
    </>
  );
}

export default DashboardHome;
