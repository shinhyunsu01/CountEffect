import { motion, useCycle } from "framer-motion";
import React, { useEffect, useState } from "react";

const characters = "1234567890";
const generateString = (length: number) => {
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

interface Iprops {
  num: string;
}

const Odom: React.FC<Iprops> = ({ num }) => {
  const [cycleSpin, setCycleSpin] = useCycle("initial", "spin");
  const [odometerLetters, setOdometerLetters] = useState<string[]>([]);
  const [odomNumber, setOdomNumber] = useState<string>(num);

  const variants = {
    spin: {
      y: "calc(-100% + 24px)",
    },
    initial: {
      y: "calc(0% + 0px)",
    },
  };

  useEffect(() => {
    setCycleSpin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [odomNumber]);

  useEffect(() => {
    setOdomNumber(num);

    //console.log(cycleSpin, "sdfsf");
    const letterArray = odomNumber.split("");
    const odometerArray: string[] = [];

    letterArray.forEach((letter, index) => {
      if (letter !== ",") {
        let letters = letter + generateString((index + 1) * 3) + letter;

        odometerArray.push(letters);
      } else {
        let letters = (index + 1) * 3,
          lettersArr = [];
        for (let i = 0; i < letters - 1; i++) lettersArr[i] = ",";

        lettersArr.push(",");
        odometerArray.push(lettersArr.join());
      }
    });

    setOdometerLetters(odometerArray);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num, odomNumber]);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
      <div style={{ overflow: "hidden", height: "32px" }}>
        {odometerLetters.map((letter, index) => {
          return (
            <motion.div
              key={index}
              variants={variants}
              initial="initial"
              animate={cycleSpin}
              style={{ display: "inline-block", writingMode: "vertical-rl", textOrientation: "upright", verticalAlign: "top", fontSize: "24px" }}
              transition={{
                duration: 2,
              }}
            >
              {letter}
            </motion.div>
          );
        })}
      </div>
      <div style={{ marginLeft: "10px" }}>Count</div>
    </div>
  );
};

export default Odom;
