import React, { useState, useEffect } from "react";
import Odom from "./Odom";

function App() {
  const [count, setCount] = useState<string>("");

  useEffect(() => {
    const timeId = setInterval(() => {
      setCount(count === "12312312" ? "1231234" : "12312312");
    }, 4000);
    return () => {
      clearInterval(timeId);
    };
  }, [count]);

  return <Odom num={count} />;
}

export default App;
