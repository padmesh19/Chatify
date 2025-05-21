import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);
  const [rightSidebarShow, setRightSidebarShow] = useState(false);

  return (
    <div className="w-full h-screen">
      <div
        className={`backdrop-blur-xl overflow-hidden h-[100%] grid grid-cols-1 relative ${
          selectedUser
            ? !rightSidebarShow
              ? "md:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_2.5fr]"
              : "md:grid-cols-[1fr_2fr_1fr] xl:grid-cols-[1fr_2.5fr_1fr]"
            : "md:grid-cols-2"
        }`}
      >
        <Sidebar />
        <ChatContainer
          rightSidebarShow={rightSidebarShow}
          setRightSidebarShow={setRightSidebarShow}
        />
        {rightSidebarShow && (
          <RightSidebar
            rightSidebarShow={rightSidebarShow}
            setRightSidebarShow={setRightSidebarShow}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
