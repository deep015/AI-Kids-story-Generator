import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./config/schema.tsx",
  dbCredentials: {
    url: 'postgresql://AI-Story-generator_owner:XHLkCGg2YxR4@ep-patient-shape-a5npjmr1.us-east-2.aws.neon.tech/AI-Kids-story-generator?sslmode=require',
  },
  strict: true,
  verbose: true,
});