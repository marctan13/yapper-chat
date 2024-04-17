import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";

function SearchUser() {
  const [isChannelToggle, setIsChannelToggle] = useState(true);

  const toggleChannel = () => {
    setIsChannelToggle((prev) => !prev);
  };

  return (
    <div className="chatroom">
      <div className="container">
        <Sidebar
          isChannelToggle={isChannelToggle}
          toggleChannel={toggleChannel}
        />
        <Search />
      </div>
    </div>
  );
}

export default SearchUser;
