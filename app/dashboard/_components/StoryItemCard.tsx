        
import React from 'react';
import { Card, CardHeader, CardFooter, Image, Button, Avatar, CardBody } from "@nextui-org/react";
import Link from 'next/link';

type StoryItemType = {
  story: {
    id: number;
    storyTitle: string;
    storySubject: string;
    imageStyle: string;
    ageGroup: string;
    storyId:string;
    userName: string;
  };
};

  


function StoryItemCard({ story }: StoryItemType) {
  const {id, storyTitle, storySubject, ageGroup,userName,storyId } = story;

  return (
    <Link href={'/view-story/'+story?.storyId}>
    <Card className="max-w-[340px]">
    <CardHeader className="justify-between">
      <div className="flex gap-5">
        <Avatar
          isBordered
          radius="full"
          size="md"
          src="https://nextui.org/avatars/avatar-1.png"
        />
        <div className="flex flex-col gap-1 items-start justify-center">
          <h4 className="text-small font-semibold leading-none text-default-600">By: {userName}</h4>
          <h5 className="text-small tracking-tight text-default-400">Age Group: {ageGroup}</h5>
        </div>
      </div>
        <Button>
          Read-Me
        </Button>
    </CardHeader>
    <CardBody className="px-3 py-0 text-bold text-small uppercase text-primary">
      <div className='flex justify-center items-center'>
        <h1 className='border-b-1'>Story-Title:</h1>
      <p className=''>{storyTitle}</p>
      <p>{storySubject}</p>
      </div>
      <span className="pt-2">
        #AI-Story-Generated
        <span aria-label="computer" className="py-2" role="img">
          💻
        </span>
      </span>
    </CardBody>
  
  
  </Card>
  </Link>

  );
}

export default StoryItemCard;
