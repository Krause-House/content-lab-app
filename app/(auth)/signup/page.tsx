import AuthForm from "~/components/AuthForm";

export default function SignUp({
  searchParams,
}: {
  searchParams?: { creator?: string; referredBy?: string; redirectTo?: string };
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8 py-32">
      <AuthForm
        onlyMode="Sign Up"
        creatorIdToSubscribeTo={searchParams?.creator}
        referredByEmail={searchParams?.referredBy}
        redirectTo={searchParams?.redirectTo}
      />
    </div>
  );
}
