import { signin, signup } from "../services/AuthService";
import Form from "./Form";

export default function SignInUp() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (form.id === "sign-in") return signin(email, password);
    signup(email, password);
  }
  return (
    <div className="grid grid-cols-2 gap-20 max-md:grid-cols-1">
      <Form id="sign-up" handleSubmit={handleSubmit} />
      <Form id="sign-in" handleSubmit={handleSubmit} />
    </div>
  );
}
