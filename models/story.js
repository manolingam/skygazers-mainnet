import mongoose from 'mongoose';

const STORY_STATUS_ENUM = ['draft', 'submitted'];

const storySchema = new mongoose.Schema(
  {
    gazer_id: Number,
    story: {
      title: String,
      intro: String,
      body: String,
      status: {
        type: String,
        enum: STORY_STATUS_ENUM
      }
    },
    ipfs_hash_history: [String]
  },
  { timestamps: true }
);

const Story = mongoose.models.Story || mongoose.model('Story', storySchema);

export default Story;
