import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    malumot: String,
    turi: String,
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
