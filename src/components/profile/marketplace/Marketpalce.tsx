import React, { useEffect, useState } from "react";
import "./Marketplace.css";
import SellerProductList from "./SellerProductList/SellerProductList";
import Axios, { url } from "../../../extra/axios";
import { SellerOrderItem } from "../../../extra/types/user/SellerOrderItem";
interface StatusProp {
  name: "queue" | "shipping" | "arrived" | "delivered";
}

const Marketplace = () => {
  const [status, setStatus] = useState<StatusProp>({ name: "queue" });
  const [sellerOrderItems, setSellerOrderItems] = useState<SellerOrderItem[]>(
    []
  );
  const axios = Axios();
  useEffect(() => {
    axios
      .get(url + "/api/inventory/get/seller/" + status.name)
      .then((res) => setSellerOrderItems(res.data))
      .catch((err) => console.log(err));
  }, [status]);
  return (
    <div className="market-box">
      <div className="market-wrapper">
        <div className="orders">Orders</div>
        <div className="options">
          <span
            className={status.name == "queue" ? "chosen" : ""}
            onClick={() => setStatus({ name: "queue" })}
          >
            InQueue
          </span>
          <span
            className={status.name == "shipping" ? "chosen" : ""}
            onClick={() => setStatus({ name: "shipping" })}
          >
            Shipping
          </span>
          <span
            className={status.name == "arrived" ? "chosen" : ""}
            onClick={() => setStatus({ name: "arrived" })}
          >
            Arrived
          </span>
          <span
            className={status.name == "delivered" ? "chosen" : ""}
            onClick={() => setStatus({ name: "delivered" })}
          >
            Delivered
          </span>
        </div>
        <div className="order-list">
          {sellerOrderItems && sellerOrderItems.length != 0 ? (
            <SellerProductList items={sellerOrderItems} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
