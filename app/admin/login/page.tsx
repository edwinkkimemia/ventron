import LoginForm from "./LoginForm";

// Never statically prerender the login page — always render at request time.
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return <LoginForm />;
}
