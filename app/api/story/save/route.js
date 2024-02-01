import mongoose from 'mongoose';
import pinataSDK from '@pinata/sdk';
import { NextResponse } from 'next/server';
import { verifyMessage, createPublicClient, http } from 'viem';
import { goerli } from 'viem/chains';

import { SKYGAZERS_NFT_CONTRACTS } from '@/utils/constants';
import SKYGAZERS_ABI from '@/abi/SkyGazer.json';
import Story from '@/models/story';

const publicClient = createPublicClient({
  chain: goerli,
  transport: http()
});

const PINATA = new pinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataSecretApiKey: process.env.PINATA_API_SECRET
});

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_COLLECTION}.egk9ihs.mongodb.net/?retryWrites=true&w=majority`;

export async function POST(request) {
  const { storyData, address, signature, tokenId } = await request.json();

  let client;

  try {
    const valid = await verifyMessage({
      address: address,
      message: `I authorize my wallet ${address} to save my story for Gazer #${tokenId}.`,
      signature
    });

    const data = await publicClient.readContract({
      address: SKYGAZERS_NFT_CONTRACTS[5],
      abi: SKYGAZERS_ABI,
      functionName: 'ownerOf',
      args: [Number(tokenId)]
    });

    const ownerAddress = data;

    if (valid && ownerAddress.toLowerCase() === address.toLowerCase()) {
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
              ipfs_hash_history: [
                ...storyRecord.ipfs_hash_history,
                res.IpfsHash
              ]
            }
          }
        );
      }
    } else {
      return new NextResponse(JSON.stringify({ message: 'error' }), {
        headers: { 'content-type': 'application/json' }
      });
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
