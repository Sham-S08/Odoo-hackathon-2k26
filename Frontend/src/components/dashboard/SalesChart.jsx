import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function SalesChart({ data = [] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3A46D1" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#3A46D1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#EEF0FD" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#8C97F0" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#8C97F0" }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#3A46D1" fill="url(#salesFill)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
