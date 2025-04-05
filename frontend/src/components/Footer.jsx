import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-base-300 text-base-content">
			<div className="container mx-auto py-10">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Branding */}
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
								<MessageSquare className="size-5 text-primary" />
							</div>
							<h2 className="text-2xl font-bold">Talky</h2>
						</div>
						<p className="text-base-content/70">
							Chat with flair, anytime, anywhere.
						</p>
					</div>

					{/* Explore */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold">Explore</h3>
						<ul className="space-y-2">
							<li>
								<Link to="/" className="hover:text-primary transition-colors">
									Home
								</Link>
							</li>
							<li>
								<Link to="/" className="hover:text-primary transition-colors">
									Features
								</Link>
							</li>
							<li>
								<Link to="/" className="hover:text-primary transition-colors">
									Support
								</Link>
							</li>
							<li>
								<Link to="/" className="hover:text-primary transition-colors">
									Privacy
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Us */}
					<div className="space-y-4">
						<h3 className="text-xl font-bold">Contact Us</h3>
						<address className="not-italic space-y-2">
							<p>Email: hello@talky.app</p>
							<p>Phone: +1 555 123 4567</p>
						</address>
						<div className="flex gap-4 mt-4">
							<a href="#" className="hover:text-primary transition-colors">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="size-5"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<path d="M12 8v8"></path>
									<path d="M8 12h8"></path>
								</svg>
							</a>
							<a href="#" className="hover:text-primary transition-colors">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="size-5"
								>
									<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
								</svg>
							</a>
							<a href="#" className="hover:text-primary transition-colors">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="size-5"
								>
									<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
									<rect width="4" height="12" x="2" y="9"></rect>
									<circle cx="4" cy="4" r="2"></circle>
								</svg>
							</a>
						</div>
					</div>
				</div>

				<div className="mt-10 pt-8 border-t border-base-content/20">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<h4 className="text-lg font-bold">Account Information</h4>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-sm text-base-content/70">Member Since</p>
									<p>6/4/2023</p>
								</div>
								<div>
									<p className="text-sm text-base-content/70">Account Status</p>
									<p className="text-green-500">Active</p>
								</div>
							</div>
						</div>
						<div className="md:text-right">
							<p className="text-sm text-base-content/70">
								© 2025 Talky. All rights reserved.
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
