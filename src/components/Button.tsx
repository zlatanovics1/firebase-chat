export default function Button({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className="px-5 py-1 bg-indigo-400 text-white rounded-md font-medium mt-4"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
