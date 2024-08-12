import { BiUserPlus } from "react-icons/bi";

export default function renderContent(data: any): JSX.Element {
  const name = data.notification.body.split(" ").at(0);
  const rest = data.notification.body.slice(name.length);
  return (
    <div className="grid grid-rows-2 grid-cols-[auto,1fr] items-center gap-x-5 p-4">
      <div className="row-span-2 content-center">
        <BiUserPlus className="w-6 h-6 text-green-500" />
      </div>
      <p className="text-lg">
        <span className="font-semibold text-green-500">{name}</span>
        <span>{rest}</span>
      </p>
      <span>{data.data.followedAt}</span>
    </div>
  );
}
