import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

import Story from '@/models/story';

export async function POST(request) {
  const { storyData } = await request.json();
  const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_COLLECTION}.egk9ihs.mongodb.net/?retryWrites=true&w=majority`;

  let client;

  try {
    client = await mongoose.connect(MONGO_URI);

    let storyRecord = await Story.findOne({
      gazer_id: storyData.gazer_id
    });

    if (!storyRecord) {
      await Story.create({
        gazer_id: storyData.gazer_id,
        story: {
          title: storyData.story.title,
          intro: storyData.story.intro,
          body: storyData.story.body,
          status: storyData.story.status
        },
        ipfs_hash_history: [storyData.ipfs_hash]
      });
    } else {
      await Story.updateOne(
        { gazer_id: storyData.gazer_id },
        {
          $set: {
            gazer_id: storyData.gazer_id,
            story: {
              title: storyData.story.title,
              intro: storyData.story.intro,
              body: storyData.story.body,
              status: storyData.story.status
            },
            ipfs_hash_history: [
              ...storyRecord.ipfs_hash_history,
              storyData.ipfs_hash
            ]
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }

  return new NextResponse(JSON.stringify({ message: storyData }), {
    headers: { 'content-type': 'application/json' }
  });
}
