import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

import Story from '@/models/story';

export async function POST(request) {
  const { gazer_id } = await request.json();

  const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_COLLECTION}.tgpcgzx.mongodb.net/?retryWrites=true&w=majority`;

  let client;
  let storyRecord;

  try {
    client = await mongoose.connect(MONGO_URI);

    storyRecord = await Story.findOne({
      gazer_id: gazer_id
    });
  } catch (err) {
    console.log(err);
  }

  return new NextResponse(JSON.stringify({ message: storyRecord }), {
    headers: { 'content-type': 'application/json' }
  });
}
