import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { receiverId } = req.params;
    const senderId = req.id;

    let receiver = await User.findById(receiverId);
    if (!receiver)
      return res.status(404).json({
        message: "Reciever not required.",
        success: false,
      });

    if (!message)
      return res.status(400).json({
        message: "Message content required.",
        success: false,
      });

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY WILL GO HERE

    return res.status(201).json({
      message: "Message sent successfully!",
      newMessage,
      success: true,
    });
  } catch (error) {
    console.log("Error in sendMessage: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.id;

    let receiver = await User.findById(userToChatId);
    if (!receiver)
      return res.status(404).json({
        message: "Reciever not required.",
        success: false,
      });

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation)
      return res.status(200).json({
        message: "Messages fetched successfully",
        messages: [],
        success: true,
      });

    const messages = conversation.messages;

    return res.status(200).json({
      message: "Messages fetched successfully",
      messages,
      success: true,
    });
  } catch (error) {
    console.log("Error in getMessages: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const deleteMessageById = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findById(messageId);

    if (!message)
      return res.status(404).json({
        message: "Message not found.",
        success: false,
      });

    if (message.media_url) {
      const imgId = post.media_url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await Conversation.updateOne(
      { messages: { $in: messageId } },
      { $pull: { messages: messageId } }
    );

    await Message.findByIdAndDelete(messageId);
    return res.status(200).json({
      message: "Message deleted successfully!",
      success: true,
    });
  } catch (error) {
    console.log("Error in deleteMessageById: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};
