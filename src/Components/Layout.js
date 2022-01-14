import React from "react";
import Sidebar from "./Sidebar";
import { SiDgraph } from "react-icons/si";

export default function Layout({ children }) {
  return (
    <div className="app">
      <div className="header">
        <SiDgraph className="icon" size="1.25rem" />
        <p>Visualizer</p>
      </div>
      <div className="content">
        <Sidebar />
        <div className="workspace">{children}</div>
      </div>
    </div>
  );
}
