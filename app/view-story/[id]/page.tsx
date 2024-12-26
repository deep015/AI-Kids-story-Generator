"use client";

import React, { useEffect, useRef, useState } from "react";
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { eq } from "drizzle-orm";
import HTMLFlipBook from "react-pageflip";
import StoryPages from "./_components/StoryPages";
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";

interface Chapter {
  chapterTitle: string;
  text: string;
}

interface Story {
  output: {
    storyTitle: string;
    chapters: Chapter[];
  };
}

function ViewStory({ params }: { params: Promise<{ id: string }> }) {
  const [story, setStory] = useState<Story | null>(null);
  const [error, setError] = useState<string | null>(null);
  const bookRef = useRef<any>(null);
  const [count, setCount] = useState<number>(0);
  const [storyId, setStoryId] = useState<string | null>(null);

  useEffect(() => {
    async function resolveParams() {
      if (params) {
        const resolvedParams = await params;
        setStoryId(resolvedParams?.id || null);
      }
    }
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (storyId) {
      getStory();
    }
  }, [storyId]);

  const getStory = async () => {
    try {
      const result:any = await db
        .select()
        .from(StoryData)
        .where(eq(StoryData.storyId, storyId!));
      if (result.length > 0) {
        setStory(result[0]);
      } else {
        setError("Story not found.");
      }
    } catch (err) {
      console.error("Error fetching story:", err);
      setError("An error occurred while fetching the story.");
    }
  };

  const handlePrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
      setCount(count - 1);
    }
  };

  const handleNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
      setCount(count + 1);
    }
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!story) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner" /> {/* Replace with an actual spinner component */}
        <p>Loading story...</p>
      </div>
    );
  }

  return (
    <div className="p-10 md:px-20 lg:px-40">
      <h2 className="bg-primary font-bold text-4xl text-center p-10 text-white">
        Story Title: {story.output.storyTitle || "Loading..."}
      </h2>
      <div className="relative">
        {/**@ts-ignore */}
        <HTMLFlipBook
          width={500}
          height={600}
          className="mt-10 shadow-lg"
          showCover={true}
          useMouseEvents={false}
          ref={bookRef}
        >
          {story.output.chapters.map((chapter, index) => (
            <div key={index} className="bg-white p-10 border">
              <StoryPages
                storyChapter={{
                  chapterTitle: chapter.chapterTitle,
                  text: chapter.text,
                  chapterNumber: index + 1,
                  pageNumber: index + 1,
                }}
              />
            </div>
          ))}
        </HTMLFlipBook>

        {count !== 0 && (
          <div
            className="absolute left-[35px] top-[250px]"
            onClick={handlePrevPage}
          >
            <IoIosArrowDropleftCircle className="text-[40px] text-primary cursor-pointer" />
          </div>
        )}
        {count !== story.output.chapters.length - 1 && (
          <div
            className="absolute right-[195px] top-[250px]"
            onClick={handleNextPage}
          >
            <IoIosArrowDroprightCircle className="text-[40px] text-primary cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewStory;
