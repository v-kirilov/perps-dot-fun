import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center flex-col space-y-2 h-screen">
      <Spinner/>
      <span className="text-xl font-semibold text-gray-800">Fetching account data...</span>
    </div>
  );
}