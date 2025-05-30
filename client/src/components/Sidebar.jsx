import React, { useContext, useEffect, useState } from "react";
import assets from "./../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = ({ setChatLoader }) => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;
  useEffect(() => {
    getUsers();
  }, [onlineUsers]);
  return (
    <div
      className={`bg-gray-900 h-full p-5 overflow-y-scroll text-white ${
        selectedUser ? "max-md:hidden" : ""
      }`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img src={assets.logo_icon} alt="logo" className="max-w-7" />
            <span className="text-xl tracking-wider text-violet-100 font-medium">
              Chatify
            </span>
          </div>
          <div className="relative py-2 group">
            <img
              onClick={() => setMenuOpen(!menuOpen)}
              src={assets.menu_icon}
              alt="Menu"
              className="max-h-5 cursor-pointer"
            />
            {menuOpen && (
              <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-gray-800 border vorder-gray-600 text-gray-100">
                <p
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/profile");
                  }}
                  className="cursor-pointer text-sm"
                >
                  Edit Profile
                </p>
                <hr className="my-2 border-t border-gray-500" />
                <p
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="cursor-pointer text-sm"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-violet-500/50 rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <img src={assets.search_icon} alt="search" className="w-3" />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-gray-300 flex-1"
            placeholder="Search User"
          />
        </div>
      </div>

      <div className="flex flex-col">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            onClick={() => {
              setChatLoader(true);
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
              selectedUser?._id === user._id && "bg-violet-800/50"
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className="w-[35px] aspect-[1/1] rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p>{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">Offilne</span>
              )}
            </div>
            {unseenMessages[user._id] > 0 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
