"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import StoryItemCard from "./StoryItemCard"; // Import StoryItemCard component
import { useRouter } from "next/router";

export type Story = {

  id: number;
  storyTitle: string;
  storySubject: string;
  imageStyle: string;
  ageGroup: string;
  userName:string
};

function UserStoryList() {
  const { user } = useUser();
  const [stories, setStories] = useState<Story[]>([]);
 

  useEffect(() => {
    const fetchStories = async () => {
      try {
        if (!user?.primaryEmailAddress?.emailAddress) {
          console.error("User email not available.");
          return;
        }

        const email = user.primaryEmailAddress.emailAddress;
        const result:any = await db
          .select()
          .from(StoryData)
          .where(eq(StoryData.userEmail, email));

        console.log("Fetched stories:", result);
        setStories(result); // Store fetched stories in the state
      } catch (error) {
        console.error("Error fetching user stories:", error);
      }
    };

    if (user) fetchStories();
  }, [user]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
    {stories.length > 0 ? (
      stories.map((story) => (
        <div
          key={story.id}
          className="col-span-1 flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
          {/* @ts-ignore */}
          <StoryItemCard story={story} /> {/* Pass each story to StoryItemCard */}
        </div>
      ))
    ) : (
      <p className="col-span-full text-center text-2xl text-gray-600 font-semibold">No stories available.</p>
    )}
  </div>
  
  );
}

export default UserStoryList;
