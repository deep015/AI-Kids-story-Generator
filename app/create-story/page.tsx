"use client"
import React, { useState } from 'react'
import StorySubjectInput from './_components/StorySubjectInput'
import StoryType from './_components/StoryType'
import AgeGroup from './_components/AgeGroup'

import { Button } from '@nextui-org/button'
import { chatSession } from '@/config/GeminiAi'
import { db } from '@/config/db'
import { StoryData } from '@/config/schema'
import { v4 as uuidv4 } from 'uuid';
import CustomLoader from './_components/CustomLoader'
import { useUser } from '@clerk/nextjs'
import { toast } from 'react-toastify'
import {  useRouter } from 'next/navigation'

const CREATE_STORY_PROMPT=process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

export interface fieldData{
  fieldName:string,
  fieldValue:string
}
export interface formDataType{
  storySubject:string,
  storyType:string,
  AgeGroup:string
}
function CreateStory() {

  const[formData,setFormData]=useState<formDataType>();
  const[loading,setLoading]=useState(false);
  const {user}=useUser();
  const notify=(msg:string)=>toast(msg)
  const notifyError=(msg:string)=>toast.error(msg)
  const router=useRouter()

  /**
   * used to add data form 
   * @param data 
   * 
   */
  const onHandleUserSelection=(data:fieldData)=>{
  
      setFormData((prev:any)=>({
        ...prev,
        [data.fieldName]:data.fieldValue
      }));
      console.log(formData)
  }

  const GenerateStory=async()=>{
        setLoading(true)
        const FINAL_PROMPT=CREATE_STORY_PROMPT
        ?.replace('{AgeGroup}',formData?.AgeGroup??'')
        .replace('{storyType}',formData?.storyType??'')
        .replace('{storySubject}',formData?.storySubject??'')
        //generate AI story
          try{
           const result=await chatSession.sendMessage(FINAL_PROMPT);
           console.log(result?.response.text());
           const resp= await SaveInDB(result?.response.text())
           console.log(resp);
           notify("story Generated!")
             // Ensure 'storyId' exists before routing
            if (resp?.[0]?.storyId) {
              router?.replace('/view-story/' + resp[0].storyId);
            } else {
              throw new Error("Story ID missing in response.");
            }
           setLoading(false);
          }catch(e){
            console.log(e);
            notifyError('Server Error,Try Again')
            setLoading(false);
          }
        //save in DB

        //Generate Image
  }

  const SaveInDB=async(output:string)=>{
    const recordId=uuidv4();
    setLoading(true)
    try{
    
      const result=await db.insert(StoryData).values({
        storyId:recordId,
        ageGroup:formData?.AgeGroup,
        storySubject:formData?.storySubject,
        storyType:formData?.storyType,
        output:JSON.parse(output),
        userEmail:user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName

      }).returning({storyId:StoryData?.storyId})
      setLoading(false)
      return result;
    }
    catch(e){
      setLoading(false)
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-40'>
      
      <h2 className='font-extrabold text-[70px] text-primary text-center'>
        CREATE YOUR STORY
      </h2>
      <p className='text-2xl text-primary text-center'>
        Unlock your creativity with AI: Craft stories like never before ! Let our AI bring
        your imagination to life,one story at a time
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
      {/*story subject*/}
       <StorySubjectInput userSelection={onHandleUserSelection}/>

      {/*story type*/}
      <StoryType userSelection={onHandleUserSelection}/>

      {/*age group*/}
      <AgeGroup userSelection={onHandleUserSelection}/>
      {/*img style*/}
   
      </div>
      <div className='flex justify-end my-10'>
  
      <Button color='primary' 
      disabled={loading}
      className='p-10 text-2xl '
      onPress={GenerateStory}
      >
        Generate Story
      </Button>
    </div>

    <CustomLoader isLoading={loading}/>
    </div>

    
  )
}

export default CreateStory