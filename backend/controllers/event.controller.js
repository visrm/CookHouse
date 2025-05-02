import Community from "../models/community.model.js";
import Event from "../models/event.model.js";
import User from "../models/user.model.js";

// for community owner
export const createEvent = async (req, res) => {
  try {
    const { title, startDate, endDate, location } = req.body;
    let { description } = req.body;
    const userId = req.id;
    const { communityId } = req.params;

    if (!title || !startDate || !endDate || !location)
      return res.status(400).json({
        message: "Required fields missing!",
        success: false,
      });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const community = await Community.findById(communityId);
    if (!community)
      return res.status(404).json({
        message: "Community not found.",
        success: false,
      });

    var memberId = user._id.toString();
    if (community.owner.toString() !== memberId)
      return res.status(401).json({
        message: "Unauthorised Community Event creation.",
        success: false,
      });

    const newEvent = await Event.create({
      organiser: userId,
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location,
      community: communityId,
    });

    await newEvent.save();

    if (!newEvent)
      return res.status(404).json({
        message: "Event NOT created",
        success: false,
      });

    let eventId = newEvent._id;
    await Community.updateOne(
      { _id: communityId },
      { $push: { events: eventId } }
    );

    return res.status(201).json({
      message: "Event created successfully!",
      newEvent,
      success: true,
    });
  } catch (error) {
    console.log("Error in createEvent: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    if (!id)
      return res.status(400).json({
        message: "Provide a valid Event Id.",
        success: false,
      });

    const event = await Event.findById(id);
    if (!event)
      return res.status(404).json({
        message: "event not found.",
        success: false,
      });

    let cantDeleteEvent =
      event.organiser.toString() !== userId.toString() && user.role !== "admin";
    if (cantDeleteEvent)
      return res.status(401).json({
        message: "Unauthorized to delete event.",
        success: false,
      });

    await Community.updateOne(
      { _id: event.community },
      { $pull: { events: id } }
    );

    await Event.findByIdAndDelete(id);
    return res.status(200).json({
      message: "Event deleted successfully!",
      success: true,
    });
  } catch (error) {
    console.log("Error in deleteEvent: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getCommunityEvents = async (req, res) => {
  try {
    const { communityId } = req.params;

    const community = await Community.findById(communityId);
    if (!community)
      return res.status(404).json({
        message: "Community not found.",
        success: false,
      });

    const events = await Event.find({ community: communityId })
      .sort({ createdAt: -1 })
      .populate({
        path: "organiser",
        select: "-password -profile.communities",
      })
      .populate("community");

    return res.status(200).json({
      message: "Events fetched successfully",
      events,
      success: true,
    });
  } catch (error) {
    console.log("Error in getCommunityEvents: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const events = await Event.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "organiser",
        select: "-password -profile.communities",
      })
      .populate("community");

    if (events.length === 0)
      return res.status(200).json({
        message: "No Recipes",
        events: [],
        success: true,
      });

    return res.status(200).json({
      message: "events fetched successfully",
      events,
      success: true,
    });
  } catch (error) {
    console.log("Error in getAllEvents: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};

export const getUserCommunitiesEvents = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });

    const query = {
      $or: [{ members: { $in: user._id } }, { owner: user._id }],
    };
    const communities = await Community.find(query).populate("events");

    var Arr = [];

    communities.map((community) => Arr.push(...community.events));

    const communityEvents = Arr.map(async (event) => {
      const eventId = event._id;
      const events = await Event.findById(eventId)
        .sort({ createdAt: -1 })
        .populate({
          path: "organiser",
          select: "-password",
        });

      if (!events)
        return res.status(404).json({
          message: "event not found.",
          success: false,
        });

      return events;
    });

    const events = await Promise.all(communityEvents);

    if (events.length === 0)
      return res.status(200).json({
        message: "events fetched successfully",
        events: [],
        success: true,
      });

    return res.status(200).json({
      message: "events fetched successfully",
      events,
      success: true,
    });
  } catch (error) {
    console.log("Error in getUserCommunitiesEvents: ", error.message);
    res.status(500).json({
      message: "Internal Server Error.",
      success: false,
    });
  }
};