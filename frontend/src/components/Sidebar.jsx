import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
	const {
		getUsers,
		users,
		selectedUser,
		setSelectedUser,
		isUsersLoading,
		toggleSidebar,
		isSidebarOpen,
	} = useChatStore();

	const { onlineUsers } = useAuthStore();
	const [showOnlineOnly, setShowOnlineOnly] = useState(false);

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	const filteredUsers = showOnlineOnly
		? users.filter((user) => onlineUsers.includes(user._id))
		: users;

	if (isUsersLoading) return <SidebarSkeleton />;

	return (
		<aside className="h-full w-full border-r border-base-300 flex flex-col transition-all duration-200">
			<div className="border-b border-base-300 w-full p-5">
				<div className="flex items-center gap-2">
					<Users className="size-6" />
					<span className="font-medium hidden sm:block lg:block">Contacts</span>
				</div>
				{/* Online filter toggle */}
				<div className="mt-3 hidden sm:flex lg:flex items-center gap-2">
					<label className="cursor-pointer flex items-center gap-2">
						<input
							type="checkbox"
							checked={showOnlineOnly}
							onChange={(e) => setShowOnlineOnly(e.target.checked)}
							className="checkbox checkbox-sm"
						/>
						<span className="text-sm">Show online only</span>
					</label>
					<span className="text-xs text-zinc-500">
						({onlineUsers.length - 1} online)
					</span>
				</div>
			</div>

			<div className="overflow-y-auto w-full py-3">
				{filteredUsers.map((user) => (
					<button
						key={user._id}
						onClick={() => {
							setSelectedUser(user);
							toggleSidebar(); // Close sidebar on small screens after selection
						}}
						className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${
								selectedUser?._id === user._id
									? "bg-base-300 ring-1 ring-base-300"
									: ""
							}
            `}
					>
						<div className="relative flex-shrink-0">
							<img
								src={user.profilePic || "./src/assets/prof.jpg"}
								alt={user.fullName}
								className="size-10 object-cover rounded-full"
							/>
							{onlineUsers.includes(user._id) && (
								<span
									className="absolute bottom-0 right-0 size-4 bg-green-500 
                  rounded-full ring-2 ring-base-100"
								/>
							)}
						</div>

						{/* User info - visible when sidebar is open on small screens or on larger screens */}
						<div
							className={`${
								isSidebarOpen ? "block" : "hidden"
							} sm:hidden lg:block text-left min-w-0 flex-1`}
						>
							<div className="font-medium truncate text-base">
								{user.fullName}
							</div>
							<div className="text-sm text-base-content/60">
								{onlineUsers.includes(user._id) ? "Online" : "Offline"}
							</div>
						</div>
					</button>
				))}

				{filteredUsers.length === 0 && (
					<div className="text-center text-zinc-500 py-4">
						No users available
					</div>
				)}
			</div>
		</aside>
	);
};

export default Sidebar;
