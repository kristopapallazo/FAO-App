import { AlertCircle } from "../../../../icons";
import { IconOnlyBttn } from "../../../ui/button";
import MainCard from "../../../ui/Cards/MainCard/MainCard";
import Select, { type SelectOption } from "../../../ui/form/select/Select";
import BottomChart from "./BottomChart";
import classes from "./BottomChartSection.module.css";

const BottomChartSection = () => {
  const selectOptions: SelectOption[] = [
    { value: "website_clicks", label: "Website Clicks" },
    { value: "app_downloads", label: "App Downloads" },
    { value: "user_signups", label: "User Signups", disabled: true },
  ];

  return (
    <MainCard style={{ padding: "24px 21px" }} className={classes.section}>
      <div className={classes.top_section}>
        <span
          className="section_header_title"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          Activity <IconOnlyBttn icon={<AlertCircle />} />
        </span>
        <Select
          options={selectOptions}
          className={classes.select}
          placeholder="Website Clicks"
          // labelStyle={{ color: "black" }}
          // wrapperStyle={{ width: 124 }}
          // width="124"
        />
      </div>
      <div className={classes.chart_wrapper}>
        <BottomChart />
        {/* <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              tickFormatter={(value) => `${value / 1000}K`}
              domain={[0, 50000]}
              ticks={[10000, 20000, 30000, 40000, 50000]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--orange)"
              strokeWidth={2}
              dot={{ fill: "var(--orange)", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer> */}
      </div>
    </MainCard>
  );
};

export default BottomChartSection;
