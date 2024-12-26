"use client"
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { desc } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
/**@ts-ignore*/
import { Story } from '../dashboard/_components/UserStoryList'
import StoryItemCard from '../dashboard/_components/StoryItemCard'

// Define Story type
interface Story {
  id: number;
  storyTitle: string;
  storySubject: string;
  imageStyle: string;
  ageGroup: string;
  storyId: string;  // Added storyId to the type
  userName: string;
}

function ExploreMore() {
  const [offset, setOffset] = useState(0)
  const [storyList, setStoryList] = useState<Story[]>([])  // Correctly type storyList as an array of Story objects

  useEffect(() => {
    GetAllStories(0)
  }, [])

  // Fetch stories with offset and ensure storyId is included
  const GetAllStories = async (offset: number) => {
    const result:any = await db
      .select()
      .from(StoryData)
      .orderBy(desc(StoryData.id))
      .limit(8)
      .offset(offset)

    // Ensure that the storyId is added in case it's missing
    //@ts-ignore
    const storiesWithStoryId = result.map(story => ({
      ...story,
      storyId: story.id.toString(),  // Convert id to string for storyId
    }))

    console.log(storiesWithStoryId)
    setStoryList(storiesWithStoryId)  // Set the stories with storyId
  }

  return (
    <div className="min-h-screen p-10 md:px-20 lg:px-40">
      <h2 className="font-bold text-4xl text-primary text-center">
        Explore More Stories
      </h2>
      <div>
        {storyList.length > 0 ? (
          storyList.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Pass each story object to StoryItemCard */}
              <StoryItemCard story={item} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No stories available.</p>
        )}
      </div>
    </div>
  )
}

export default ExploreMore
