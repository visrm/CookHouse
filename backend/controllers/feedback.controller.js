import Feedback from "../models/feedback.model.js";
import User from "../models/user.model.js";

export const createFeedback = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const userId = req.id;

    if (!name || !email || !subject || !message)
      return res.status(400).json({
        message: "Required field(s) missing!",
        success: false,
      });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const newFeedback = await Feedback.create({
      from: userId,
      name,
      email,
      subject,
      message,
    });

    if (!newFeedback)
      return res.status(404).json({
        message: "Feedback NOT created",
        success: false,
      });

    return res.status(201).json({
      message: "Feedback sent successfully!",
      newFeedback,
      success: true,
    });
  } catch (error) {
    console.log("Error in createFeedback: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).populate({
      path: "from",
      select: "-password",
    });

    await Feedback.updateMany({}, { read: true });
    return res.status(200).json({
      message: "feedbacks fetched successfully.",
      feedbacks,
      success: true,
    });
  } catch (error) {
    console.log("Error in getFeedbacks: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const feedback = await Feedback.findById(feedbackId)
      .sort({ createdAt: -1 })
      .populate({
        path: "from",
        select: "-password",
      });

    await Feedback.updateOne({ _id: feedbackId }, { read: true });
    return res.status(200).json({
      message: "feedbacks fetched successfully.",
      feedback,
      success: true,
    });
  } catch (error) {
    console.log("Error in getFeedbackBYId: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    if (!feedbackId)
      return res.status(400).json({
        message: "Provide a valid feedback Id.",
        success: false,
      });

    const feedback = await Feedback.findById(feedbackId);
    if (!feedback)
      return res.status(404).json({
        message: "feedback not found.",
        success: false,
      });

    let cantDeleteFeedback =
      feedback.from.toString() !== userId.toString() && user.role !== "admin";
    if (cantDeleteFeedback)
      return res.status(401).json({
        message: "Unauthorized to delete feedback.",
        success: false,
      });

    await Feedback.findByIdAndDelete({ _id: feedbackId });
    return res.status(200).json({
      message: "feedback deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error in deleteFeedback: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const deleteAllFeedbacks = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const feedbacks = await Feedback.find();
    if (!feedbacks)
      return res.status(404).json({
        message: "feedbacks not found.",
        success: false,
      });

    let cantDeleteFeedbacks = user.role !== "admin";
    if (cantDeleteFeedbacks)
      return res.status(401).json({
        message: "Unauthorized to delete feedbacks.",
        success: false,
      });

    const deleteFeedbacks = await Feedback.deleteMany({});
    await Promise.all(deleteFeedbacks);

    return res.status(200).json({
      message: "feedbacks deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error in deleteAllFeedbacks: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};
