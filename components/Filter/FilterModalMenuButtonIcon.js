import React from "react";
//FontAwesome; Icons are pased by objects
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FilterModalMenuButtonIcon({
  type,
  value,
  property,
  setProperty,
  icon,
}) {
  return (
    <div
      className={`flex-1 flex flex-col p-4 gap-8 border rounded-lg hover:border-black hover:cursor-pointer ${
        value === property ? "bg-black text-white" : ""
      } `}
      onClick={(e) => setProperty(value)}
    >
      <div>
        <FontAwesomeIcon className="w-8 h-8" icon={icon} />
      </div>
      <div>
        <span className="font-semibold">{type}</span>
      </div>
    </div>
  );
}
