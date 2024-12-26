const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
  export  const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "CREATE kids story on description for 5-8 years kids educational story and all images in paper cut style : story of boy and magic school , give me 5 chapter, with detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"storyTitle\": \"Leo and the Whispering Willow Academy\",\n  \"cover\": {\n    \"imagePrompt\": \"Paper cut illustration: A bright, whimsical scene of a young boy, Leo, with big curious eyes and messy brown hair, standing in front of a magical school built around a giant, ancient willow tree with glowing leaves. The school has colorful, quirky windows and doors. Above, the title 'Leo and the Whispering Willow Academy' is written in playful, rounded letters. Include friendly looking birds flying around the willow, and a smiling sun in the background. The style is layered paper cut with soft, pastel colors.\",\n        \"altText\": \"Cover illustration of Leo and the Whispering Willow Academy\"\n\n  },\n  \"chapters\": [\n    {\n      \"chapterNumber\": 1,\n      \"chapterTitle\": \"The Lost Book\",\n      \"text\": \"Leo loved exploring. One sunny afternoon, while rummaging in his grandma's attic, he found a dusty old book. It wasn't just any book; its pages glowed faintly, and tiny symbols danced across them. As Leo touched the book, he heard a faint whisper, 'The Whispering Willow awaits you...' Confused but excited, Leo knew he had to find this Whispering Willow.\",\n       \"imagePrompt\": \"Paper cut illustration: A cozy attic scene with light coming through a small window. A young boy, Leo, with messy brown hair, kneels on the floor holding an open book that's glowing slightly. Dusty furniture and other knick-knacks are scattered around. The style is layered paper cut with warm, muted colors. Focus on the magic book.\",\n         \"altText\": \"Illustration of Leo finding the magic book in the attic\"\n    },\n    {\n      \"chapterNumber\": 2,\n      \"chapterTitle\": \"A Winding Path\",\n      \"text\": \"Following the faint whispers, Leo ventured into the woods behind his house. The path twisted and turned, leading him deeper into the trees. Strange glowing mushrooms popped up from the forest floor, and friendly squirrels peeked from behind the thick trunks. Finally, through the trees, he saw it - a giant willow tree, its leaves shimmering like emeralds, with a quirky, colorful school nestled amongst its branches.\",\n      \"imagePrompt\": \"Paper cut illustration: A winding path through a lush green forest. Leo, with his backpack, is walking along the path. The path is lined with large glowing mushrooms, and squirrels peek from behind trees. In the distance, the magical willow tree and its school can be seen. Use bright, cheerful colors and layered paper cut style.\",\n       \"altText\": \"Illustration of Leo following the path through the forest to the school\"\n    },\n    {\n      \"chapterNumber\": 3,\n       \"chapterTitle\": \"The Floating Classrooms\",\n      \"text\": \"The school was unlike anything Leo had ever seen! Classrooms floated amongst the willow branches, connected by spiraling staircases made of vines. Inside, he saw children learning to mix colors that sparkled, playing musical instruments made of leaves, and even talking to friendly animals. A kind, old owl with spectacles greeted him, 'Welcome, Leo, to the Whispering Willow Academy!'\",\n      \"imagePrompt\": \"Paper cut illustration: A whimsical view of the Whispering Willow Academy. Classrooms float between the willow's branches. Children are inside the classrooms learning different magical things, such as mixing colorful paints and playing musical leaves. An owl with glasses is greeting Leo. Use bright, playful colors in a layered paper cut style.\",\n      \"altText\": \"Illustration of the floating classrooms in Whispering Willow Academy\"\n    },\n    {\n      \"chapterNumber\": 4,\n      \"chapterTitle\": \"Learning to Whisper\",\n      \"text\": \"Leo's first lesson was learning to whisper to the willow tree. The owl explained that the tree held all the magic of the academy.  Leo closed his eyes, listened to the rustling leaves, and then whispered a wish. To his surprise, a tiny, friendly firefly appeared, lighting up his face.  He had started to connect with the magic!\",\n      \"imagePrompt\": \"Paper cut illustration: Leo is standing under the willow tree, his eyes closed, whispering to the tree.  The owl is perched on a branch nearby, observing him. A firefly is coming out of the tree, illuminating Leo's face. Use soft pastel colors in a layered paper cut style. Show a connection between Leo, the tree, and the firefly.\",\n        \"altText\": \"Illustration of Leo whispering to the Whispering Willow Tree\"\n    },\n    {\n      \"chapterNumber\": 5,\n      \"chapterTitle\": \"Friendships and Magic\",\n      \"text\": \"Leo spent his days exploring the school and learning from his new friends. He learned to paint with stardust, make music with chirping crickets, and understand the secrets of the forest.  He realized that the Whispering Willow Academy wasn't just about magic; it was about friendship and exploring the wonders around you. And as the sun set, casting golden light on the school, Leo knew his adventures were just beginning.\",\n      \"imagePrompt\": \"Paper cut illustration: Leo is laughing and playing with his new friends inside the school. The children are playing musical instruments made of leaves, holding glowing orbs and painting with stardust.  The sun sets in the background, casting a golden light on the tree and the school. Use vibrant and warm colors with a layered paper cut style. Show the happy connection between the kids.\",\n        \"altText\": \"Illustration of Leo and his new friends playing together at the academy\"\n    }\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
