import React from "react";
import DashboardHeader from "./_components/DashboardHeader";
import UserStoryList from "./_components/UserStoryList";

function DashboardPage() {
  return (
    <div className="p-10 md:px-20 lg:px-20 min-h-screen">
      <DashboardHeader />
      <UserStoryList /> {/* Render the UserStoryList which fetches and displays stories */}
    </div>
  );
}

export default DashboardPage;
