import React from "react";
import { MdSpaceDashboard } from "react-icons/md";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <p cursor="pointer">
        <MdSpaceDashboard size="2rem" />
        Dashboard
      </p>
    </div>
  );
}
