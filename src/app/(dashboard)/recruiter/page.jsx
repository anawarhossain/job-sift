import { getUserSession } from "@/lib/core/session";
import React from "react";

const RecruiterDashboard = async () => {
  const user = await getUserSession();

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
    </div>
  );
};

export default RecruiterDashboard;
