import { SignInButton } from "~/components/Buttons";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      Click the button below to sign in with Discord
      <SignInButton />
    </div>
  );
}
