import React from "react";
import { FaPlayCircle } from "react-icons/fa";

interface StoryPagesProps {
  storyChapter: {
    chapterTitle: string;
    text: string;
    chapterNumber: number;
    pageNumber: number;
  };
}

let isSpeaking = false;
let currentUtterance = null;

const playSpeech = (text:string) => {
  const synth = window?.speechSynthesis;

  if (!synth) {
    console.error("Speech Synthesis not supported in this browser.");
    return;
  }

  if (isSpeaking) {
    // Stop speech if it's currently speaking
    synth.cancel();
    isSpeaking = false;
  } else {
    // Start speech
    currentUtterance = new SpeechSynthesisUtterance(text);
    synth.speak(currentUtterance);
    isSpeaking = true;

    // Reset isSpeaking once the utterance is done
    currentUtterance.onend = () => {
      isSpeaking = false;
    };
  }
};

function StoryPages({ storyChapter }: StoryPagesProps) {
  return (
    <div className="flex flex-col justify-between w-[500px] h-[500px] bg-gray-100 p-6 rounded-lg shadow-lg">
      {/* Chapter Header */}
      <span className="text-sm text-gray-600 italic p-5">Click here to play</span>
      <div>
        <h2 className="text-4xl font-bold text-primary text-center mb-4 border-b-1 flex justify-between">
        <span className="cursor-pointer" onClick={()=>playSpeech(storyChapter?.text)}><FaPlayCircle /></span>
          Chapter {storyChapter?.chapterNumber}: {storyChapter?.chapterTitle}
          
        </h2>
        <p className="text-xl text-gray-800 bg-gray-200 p-4 rounded-md shadow-inner leading-relaxed">
          {storyChapter?.text}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">Page {storyChapter?.pageNumber}</span>
      
      </div>
    </div>
  );
}

export default StoryPages;
