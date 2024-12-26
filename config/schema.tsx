
import { serial,pgTable, text, varchar, json, integer } from "drizzle-orm/pg-core";

export const StoryData=pgTable('storyData',{
    id:serial('id').primaryKey(),
    storyId:varchar('storyId'),
    storySubject:text('storySubject'),
    storyType:varchar('storyType'),
    ageGroup:varchar('AgeGroup'),
    output:json('output'),
    userEmail:varchar('userEmail'),
    userName:varchar('userName'),


})

