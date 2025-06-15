import Feedback from "../models/feedback.model.js";

export const createFeedback = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const userId = req.id;

    if (!name || !email || !subject || !message)
      return res.status(400).json({
        message: "Required field(s) missing!",
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

export const deleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;

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

    await Feedback.findByIdAndDelete({ _id: feedbackId });
    return res.status(200).json({
      message: "feedback deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error in deletefeedback: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const deleteAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    if (!feedbacks)
      return res.status(404).json({
        message: "feedbacks not found.",
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