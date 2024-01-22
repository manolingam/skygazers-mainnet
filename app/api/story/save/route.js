import mongoose from 'mongoose';
import pinataSDK from '@pinata/sdk';
import { NextResponse } from 'next/server';

import Story from '@/models/story';

const PINATA = new pinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataSecretApiKey: process.env.PINATA_API_SECRET
});
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_COLLECTION}.egk9ihs.mongodb.net/?retryWrites=true&w=majority`;

export async function POST(request) {
  const { storyData } = await request.json();

  let client;

  try {
    const pinataData = {
      gazer: `#${storyData.gazer_id.toString()}`,
      title: storyData.story.title,
      intro: storyData.story.intro,
      body: storyData.story.body,
      status: storyData.story.status
    };

    const res = await PINATA.pinJSONToIPFS(pinataData, {
      pinataMetadata: { name: `Gazer #${storyData.gazer_id}` }
    });

    client = await mongoose.connect(MONGO_URI);

    let storyRecord = await Story.findOne({
      gazer_id: storyData.gazer_id
    });

    if (!storyRecord) {
      await Story.create({
        gazer_id: storyData.gazer_id,
        owner: storyData.owner,
        story: {
          title: storyData.story.title,
          intro: storyData.story.intro,
          status: storyData.story.status
        },
        ipfs_hash_history: [res.IpfsHash]
      });
    } else {
      await Story.updateOne(
        { gazer_id: storyData.gazer_id },
        {
          $set: {
            gazer_id: storyData.gazer_id,
            owner: storyData.owner,
            story: {
              title: storyData.story.title,
              intro: storyData.story.intro,
              status: storyData.story.status
            },
            ipfs_hash_history: [...storyRecord.ipfs_hash_history, res.IpfsHash]
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: 'error' }), {
      headers: { 'content-type': 'application/json' }
    });
  }

  return new NextResponse(JSON.stringify({ message: storyData }), {
    headers: { 'content-type': 'application/json' }
  });
}
