import UserStatistic from "./maindetal/UserStatistic";
import OrderedAndBought from "./maindetal/OrderedAndBought";
import "./Main.css";
const Main = () => {
  return (
    <div
      className="main-div"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#D4D4D4",
        margin: 0,
        borderColor: "white",
      }}
    >
      <UserStatistic />
      <OrderedAndBought />
    </div>
  );
};

export default Main;
