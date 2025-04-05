import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export async function getUsersForSidebar(req, res) {
	try {
		const currentUserId = req.user._id;

		const users = await User.find({ _id: { $ne: currentUserId } }).select(
			"-password"
		);

		res.status(200).json(users);
	} catch (error) {
		console.error("Error in getUsersForSidebar controller:", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function getMessages(req, res) {
	try {
		const { id: userToChatWith } = req.params;
		const senderId = req.user._id;

		const messages = await Message.find({
			$or: [
				{ senderId, receiverId: userToChatWith },
				{ senderId: userToChatWith, receiverId: senderId },
			],
		}).sort({ createdAt: 1 });

		res.status(200).json(messages);
	} catch (error) {
		console.error("Error in getMessages controller:", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
}

export async function sendMessage(req, res) {
	try {
		const { text, image, voiceMessage, isVoice, language } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;

		// Validate that at least one content type is provided
		if (!text && !image && !voiceMessage) {
			return res.status(400).json({ message: "Message content is required" });
		}

		// Handle image upload if using cloudinary
		let imageUrl = image;
		if (image && process.env.CLOUDINARY_CLOUD_NAME) {
			try {
				// Upload base64 image to cloudinary if configured
				const cloudinary = await import("../lib/cloudinary.js");
				const uploadResponse = await cloudinary.default.uploader.upload(image);
				imageUrl = uploadResponse.secure_url;
			} catch (error) {
				console.error("Error uploading image:", error);
				// Continue with the original image data if cloudinary fails
			}
		}

		// Get the user's language if not provided in the message
		let messageLanguage = language;
		if (!messageLanguage) {
			const sender = await User.findById(senderId);
			messageLanguage = sender.language || "en";
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			text,
			image: imageUrl,
			voiceMessage,
			isVoice: isVoice || false,
			language: messageLanguage,
		});

		await newMessage.save();

		// ONLINE MESSAGING
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to is used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.error("Error in sendMessage controller:", error.message);
		res.status(500).json({ message: "Internal server error" });
	}
}
