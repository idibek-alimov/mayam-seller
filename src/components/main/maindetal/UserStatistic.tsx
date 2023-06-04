import React, { useEffect, useState } from "react";
import "./MainDetail.css";
import Axios, { url } from "../../../extra/axios";
import {
  SellerStatistics,
  emptySellerStatistics,
} from "../../../extra/types/user/SellerStatistics";

const UserStatistic = () => {
  const [sellerInfo, setSellerInfo] = useState<SellerStatistics>(
    emptySellerStatistics
  );
  const axios = Axios();
  useEffect(() => {
    axios
      .get(url + "/api/user/seller/properties")
      .then((res) => setSellerInfo(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="user-statistic-box">
      <div className="balance-box">
        <span>Balance</span>
        <div>{sellerInfo.balance} somoni</div>
      </div>
      <div></div>
      <div>
        <div className="balance-box">
          <span>Products in storage</span>
          <div>{sellerInfo.products_in_storage}</div>
        </div>
        <div className="balance-box">
          <span>Products sold</span>
          <div>{sellerInfo.products_sold}</div>
        </div>
      </div>
    </div>
  );
};

export default UserStatistic;
