export default function Button({
  onClick,
  className,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`px-5 py-1 bg-indigo-400 outline-none focus:ring-2 focus:ring-gray-200 hover:bg-indigo-700 transition-all text-white rounded-md font-medium mt-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
