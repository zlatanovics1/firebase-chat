import Button from "./Button";

export default function Form({
  handleSubmit,
  id,
}: {
  id: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 border-2 rounded-md p-5 border-indigo-100"
    >
      <h2 className="text-2xl font-bold text-center text-gray-600">
        {id
          .split("-")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")}
      </h2>
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="px-3 py-1 rounded-md text-gray-400 border-2 border-gray-200 focus:outline-none focus:border-indigo-400"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="px-3 py-1 rounded-md text-gray-400 border-2 border-gray-200 focus:outline-none focus:border-indigo-400"
      />
      <Button>
        {" "}
        {id
          .split("-")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" ")}
      </Button>
    </form>
  );
}
