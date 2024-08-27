import React from "react";
import Card from "@/components/common/card";
const Dashboard = () => {
  return (
    <div className="flex bg-slate-200 flex-col items-center justify-center border-2 border-green-900 flex-1">
      <div className="flex flex-col space-y-16 w-3/4 border">
        <div className="flex justify-center space-x-16">
          <Card totalItems={5} title="Total Inentory Items"/>
          <Card totalItems={10} title="Total Medical Stores"/>
        </div>
        <div className="flex justify-center space-x-16">
          <Card totalItems={5} title="Total Inentory Items"/>
          <Card totalItems={10} title="Total Medical Stores"/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
