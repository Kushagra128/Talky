import { Link } from "react-router-dom";
import {
	MessageSquare,
	Globe,
	Volume2,
	Image,
	Mic,
	EyeOff,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const features = [
	{
		title: "Multilingual Support",
		description: "Chat in 11 different languages with seamless translation",
		icon: <Globe className="h-10 w-10 text-primary" />,
	},
	{
		title: "Text-to-Speech",
		description: "Have messages read aloud in your preferred language",
		icon: <Volume2 className="h-10 w-10 text-primary" />,
	},
	{
		title: "Media Sharing",
		description: "Share images and attachments with your contacts",
		icon: <Image className="h-10 w-10 text-primary" />,
	},
	{
		title: "Voice Messages",
		description: "Record and send voice messages when typing isn't convenient",
		icon: <Mic className="h-10 w-10 text-primary" />,
	},
	{
		title: "Private Messaging",
		description: "Secure one-on-one conversations with end-to-end encryption",
		icon: <EyeOff className="h-10 w-10 text-primary" />,
	},
	{
		title: "Global Chat",
		description: "Connect with users around the world in our global chat room",
		icon: <MessageSquare className="h-10 w-10 text-primary" />,
	},
];

const LandingPage = () => {
	const { authUser } = useAuthStore();

	return (
		<div className="min-h-[calc(100vh-16rem)] pt-20 mb-8">
			{/* Hero Section */}
			<section className="py-16 bg-gradient-to-b from-base-300 to-base-100">
				<div className="container mx-auto px-4 text-center">
					<div className="flex justify-center mb-6">
						<div className="size-20 rounded-2xl bg-primary/20 flex items-center justify-center">
							<MessageSquare className="h-10 w-10 text-primary" />
						</div>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-4">
						Welcome to <span className="text-primary">Talky</span>
					</h1>
					<p className="text-xl max-w-2xl mx-auto opacity-80 mb-8">
						The multilingual chat platform that brings people together across
						language barriers
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						{authUser ? (
							<Link to="/chat" className="btn btn-primary btn-lg">
								Go to Chat
							</Link>
						) : (
							<>
								<Link to="/login" className="btn btn-primary btn-lg">
									Sign In
								</Link>
								<Link to="/signup" className="btn btn-outline btn-lg">
									Create Account
								</Link>
							</>
						)}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						Features that <span className="text-primary">connect</span> you
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((feature, index) => (
							<div
								key={index}
								className="bg-base-200 p-6 rounded-xl border border-base-300 hover:shadow-md transition-all hover:border-primary/30"
							>
								<div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
									{feature.icon}
								</div>
								<h3 className="text-xl font-bold mb-2">{feature.title}</h3>
								<p className="opacity-80">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-base-200">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">
						Ready to start connecting?
					</h2>
					<p className="text-xl max-w-2xl mx-auto opacity-80 mb-8">
						Join thousands of users already enjoying Talky's seamless
						communication experience
					</p>
					{authUser ? (
						<Link to="/chat" className="btn btn-primary btn-lg">
							Go to Chat
						</Link>
					) : (
						<Link to="/signup" className="btn btn-primary btn-lg">
							Get Started for Free
						</Link>
					)}
				</div>
			</section>
		</div>
	);
};

export default LandingPage;
