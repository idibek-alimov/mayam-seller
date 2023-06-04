import { TooltipProps } from "recharts";
import "./MainDetail.css";
const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  // console.log("active", active);
  // console.log("payload", payload);
  // console.log("label", label);
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}
        <p className="label">{`Day ${label}`}</p>
        <div>
          {payload.map((pld) => (
            <div style={{ display: "inline-block", padding: 10 }}>
              <div>Amount: {"" + pld.value}</div>
              {/* <div>{pld.dataKey}</div> */}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
export default CustomTooltip;
