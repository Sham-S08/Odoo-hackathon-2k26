import EmptyState from "./EmptyState";
import Loading from "./Loading";

export default function Table({ columns, data = [], loading, emptyMessage, onRowClick }) {
  if (loading) return <Loading />;
  if (!data.length) return <EmptyState message={emptyMessage || "No records found"} />;

  return (
    <div className="overflow-x-auto rounded-xl border border-royal-100 bg-white shadow-panel">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-royal-100 bg-royal-50/60">
            {columns.map((col) => (
              <th
                key={col.key}
                className="whitespace-nowrap px-4 py-3 font-medium text-royal-500"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id ?? idx}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-royal-50 last:border-0 ${
                onRowClick ? "cursor-pointer hover:bg-royal-50/70" : ""
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="whitespace-nowrap px-4 py-3 text-royal-800">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
