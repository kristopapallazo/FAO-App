import { LineChart, Line, ResponsiveContainer } from "recharts";
import { AGENCIES_CHART_DATA } from "../../../../data";

const AgenciesChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={AGENCIES_CHART_DATA}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--green)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AgenciesChart;
