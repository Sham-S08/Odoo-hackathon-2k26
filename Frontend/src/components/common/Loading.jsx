import Spinner from "./Spinner";

export default function Loading({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-400">
      <Spinner className="h-6 w-6 text-blue-500" />
      <p className="text-sm">{label}</p>
    </div>
  );
}