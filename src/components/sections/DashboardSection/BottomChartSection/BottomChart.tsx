import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BOTTOM_SECTION_DUMMY_CHART_DATA } from "../../../../data";

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          padding: "8px 12px",
          borderRadius: "12px",
          border: "1px solid #0F172A33",
          backgroundColor: "#0F172AB2",
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p
          style={{
            fontFamily: "Urbanist, sans-serif",
            fontWeight: 500,
            fontSize: "10px",
            lineHeight: "160%",
            letterSpacing: "0px",
            margin: 0,
            color: "#E2E8F0",
          }}
        >
          {payload[0].name}
        </p>
        <p
          style={{
            fontFamily: "Urbanist, sans-serif",
            fontWeight: 700,
            fontSize: "12px",
            lineHeight: "160%",
            letterSpacing: "0px",
            margin: 0,
            color: "#fff",
          }}
        >
          {`${(payload[0].value as number) / 1000}K`}
        </p>
      </div>
    );
  }
  return null;
};

const BottomChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={BOTTOM_SECTION_DUMMY_CHART_DATA}
        margin={{ top: 5, right: 0, left: -10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="name"
          tick={{ fill: "#64748b", fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: "#e2e8f0" }}
        />
        <YAxis
          width={40}
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
    </ResponsiveContainer>
  );
};

export default BottomChart;
