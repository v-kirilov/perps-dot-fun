import PPTokenForm from "@/components/PPTokenForm";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <h2 className="text-3xl font-semibold">
        Sign in to access your profile information.
      </h2>
      <PPTokenForm />
    </div>
  );
}