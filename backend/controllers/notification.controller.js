import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.id;
    const notifications = await Notification.find({ to: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "from",
        select: "username profile.profileImg",
      });

    await Notification.updateMany({ to: userId }, { read: true });
    return res.status(200).json({
      message: "Notifications fetched successfully.",
      notifications,
      success: true,
    });
  } catch (error) {
    console.log("Error in getNotifications: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.id.toString();

    if (!notificationId)
      return res.status(400).json({
        message: "Provide a valid Notification Id.",
        success: false,
      });
    const notification = await Notification.findById(notificationId);

    if (!notification)
      return res.status(404).json({
        message: "Notification not found.",
        success: false,
      });

    if (notification.to.toString() !== userId)
      return res.status(403).json({
        message: "Unauthorised to delete notification.",
        success: false,
      });

    await Notification.findByIdAndDelete({ _id: notificationId });
    return res.status(200).json({
      message: "Notification deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error in deleteNotification: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const deleteAllNotifications = async (req, res) => {
  try {
    const userId = req.id;
    const notifications = await Notification.find({ to: userId });
    if (!notifications)
      return res.status(404).json({
        message: "Notifications not found.",
        success: false,
      });

    const deleteNotifs = await Notification.deleteMany({ to: userId });
    await Promise.all(deleteNotifs);

    return res.status(200).json({
      message: "Notifications deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error in deleteAllNotifications: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};
