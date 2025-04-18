import { useState, useEffect, useRef } from "react";
import { Spin } from "antd";

const Loader = () => {
  const auto = false;
  const [percent, setPercent] = useState(-50);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPercent((v) => {
        const nextPercent = v + 5;
        return nextPercent > 150 ? -50 : nextPercent;
      });
    }, 100);
    return () => clearTimeout(timerRef.current);
  }, [percent]);

  const mergedPercent = auto ? "auto" : percent;

  return <Spin percent={mergedPercent} size="large" />;
};
export default Loader
