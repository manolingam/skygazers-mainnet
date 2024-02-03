import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

import Story from '@/models/story';

export async function POST(request) {
  const { address } = await request.json();

  const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_COLLECTION}.tgpcgzx.mongodb.net/?retryWrites=true&w=majority`;

  let client;
  let storyRecords;

  try {
    client = await mongoose.connect(MONGO_URI);

    if (address) {
      storyRecords = await Story.find({ owner: address });
    } else {
      storyRecords = await Story.find({});
    }
  } catch (err) {
    console.log(err);
  }

  return new NextResponse(JSON.stringify({ message: storyRecords }), {
    headers: { 'content-type': 'application/json' }
  });
}
