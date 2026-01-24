import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <span>Fetching account data...</span>
    </div>
  );
}
