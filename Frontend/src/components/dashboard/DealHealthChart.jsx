import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function DealHealthChart({ data = [] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F4EEFC" />
          <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#AD7DE8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#AD7DE8" }} axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#7B3FC7" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
