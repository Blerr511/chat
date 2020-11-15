const { Schema, model, SchemaTypes } = require("mongoose");
const MessageSchema = new Schema(
  {
    data: { type: String, required: true },
    sender: { type: SchemaTypes.ObjectId, ref: "user" },
  },
  {
    timestamps: {
      createdAt: true,
      currentTime: () => Date.now(),
      updatedAt: true,
    },
  }
);

const Message = model("message", MessageSchema);

module.exports.MessageModel = Message;
module.exports.MessageSchema = MessageSchema;
