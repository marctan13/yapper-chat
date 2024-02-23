import React, { useState } from "react";
import ReactSwitch from "react-switch";

function Toggle() {
  const [isChannel, setIsChannel] = useState(true);
  console.log('test')
  const handleChange = (val) => {
    setIsChannel(val);
  };
  return (
    <div className="switch" style={{ textAlign: "center" }}>
      <ReactSwitch checked={isChannel} onChange={handleChange} />
    </div>
  );
}

export default Toggle;
