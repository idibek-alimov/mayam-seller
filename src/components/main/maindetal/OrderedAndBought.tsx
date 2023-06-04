import React, { useEffect, useState } from "react";
import "./MainDetail.css";
import Axios, { url } from "../../../extra/axios";
import { Article } from "../../../extra/types/Article";
import { DayOrderType, EmptyDayOrder } from "../../../extra/types/DayOrderType";
import { WeekOrderType } from "../../../extra/types/WeekOrderType";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ComposedChart,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
export type StatusProp = {
  itemStatus: "shipping" | "delivered";
  timeStamp: "today" | "week";
};
const OrderedAndBought = () => {
  const [status, setStatus] = useState<StatusProp>({
    itemStatus: "shipping",
    timeStamp: "week",
  });
  const [data, setData] = useState<DayOrderType[] | WeekOrderType[]>();
  const axios = Axios();

  const dayOrderToData = (dayOrder: DayOrderType[]) => {
    const EmptyData: DayOrderType[] = [];
    for (let i = 0; i < 24; i++) {
      EmptyData.push({ ...EmptyDayOrder, time: String(i) });
    }
    // console.log("EMpty data before", EmptyData);
    dayOrder.map((item: DayOrderType) => {
      EmptyData[Number(item.time)] = item;
    });
    //console.log("EMpty data after", EmptyData);
    setData(EmptyData);
  };

  useEffect(() => {
    let date = new Date();
    //console.log("date", date.getDay());
    axios
      .get(
        url + "/api/order/owner/" + status.timeStamp + "/" + status.itemStatus
      )
      .then((res) => {
        //console.log("response", res);
        if (status.timeStamp == "week") {
          setData(res.data);
        } else {
          dayOrderToData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [status]);
  const countFunction = () => {
    let count = 0;
    data?.map((item) => {
      count += item.count;
    });
    return count;
  };
  const priceFunction = () => {
    let price = 0;
    data?.map((item) => {
      price += item.price;
    });
    return price;
  };
  return (
    <div className="order-and-bought-box">
      <div className="buttons-box">
        <div className="left-buttons">
          <button
            className="left"
            onClick={() => setStatus({ ...status, itemStatus: "shipping" })}
            style={
              status.itemStatus == "shipping"
                ? { backgroundColor: "blueviolet", color: "white" }
                : {}
            }
          >
            shipping
          </button>
          <button
            className="right"
            onClick={() => setStatus({ ...status, itemStatus: "delivered" })}
            style={
              status.itemStatus == "delivered"
                ? { backgroundColor: "blueviolet", color: "white" }
                : {}
            }
          >
            delivered
          </button>
        </div>
        <div className="right-buttons">
          <button
            className="left"
            onClick={() => setStatus({ ...status, timeStamp: "today" })}
            style={
              status.timeStamp == "today"
                ? { backgroundColor: "blueviolet", color: "white" }
                : {}
            }
          >
            today
          </button>
          <button
            className="right"
            onClick={() => setStatus({ ...status, timeStamp: "week" })}
            style={
              status.timeStamp == "week"
                ? { backgroundColor: "blueviolet", color: "white" }
                : {}
            }
          >
            week
          </button>
        </div>
      </div>
      <div className="chart-div">
        <div className="chart-summery">
          <div className="report">{status.timeStamp + " "}report</div>
          <div className="amount">Amount</div>
          <div className="pieces">
            {countFunction()} {" pieces"}
          </div>
          <div className="sum">Sum</div>
          <div className="somoni">
            {priceFunction()} {" somoni"}
          </div>
        </div>
        <div className="chart-box">
          <LineChart width={600} height={400} data={data}>
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
            />
            <CartesianGrid
              stroke="#ccc"
              strokeDasharray="5 5"
              vertical={false}
            />
            <XAxis
              dataKey={status.timeStamp == "today" ? "time" : "dayOfTheWeek"}
            />
            <YAxis dataKey="price" orientation="right" />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default OrderedAndBought;
