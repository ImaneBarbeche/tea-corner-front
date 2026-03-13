import { useEffect, useState } from "react";
import { formatBrewTime } from "~/lib/teaFormatters";
import { Button } from "./Button";
import { Minus, Plus } from "lucide-react";

export const TeaTimer = ({ seconds }: { seconds: number }) => {
  const [time, setTime] = useState(seconds * 1000);
  const [isActive, setIsActive] = useState(false);
  const [refTime, setRefTime] = useState(Date.now());

  const ADJUST = 30000; // 30s in ms

  useEffect(() => {
    if (!isActive || time <= 0) return;

    const timeout = setTimeout(() => {
      const now = Date.now();
      setTime((prev) => Math.max(0, prev - (now - refTime)));
      setRefTime(now);
    }, 100);

    return () => clearTimeout(timeout);
  }, [isActive, time, refTime]);

  const toggle = () => {
    setRefTime(Date.now());
    setIsActive(!isActive);
  };

  return (
    <div className="flex flex-col w-fit items-center gap-1">
      <div>
        <Button
          variant="tertiary"
          icon={Minus}
          onClick={() => setTime((t) => Math.max(0, t - ADJUST))}
          disabled={isActive}
        ></Button>

        {/* Math.ceil ensures 02:00 doesn't flip to 01:59 immediately */}
        <span className=" tabular-nums mx-1">
          {formatBrewTime(Math.ceil(time / 1000))}
        </span>

        <Button
          variant="tertiary"
          icon={Plus}
          onClick={() => setTime((t) => Math.max(0, t + ADJUST))}
          disabled={isActive}
        ></Button>
      </div>

      <Button
        variant="secondary"
        className="!border-[var(--tea-color)]"
        onClick={toggle}
      >
        {isActive ? "Pause" : "Start"}
      </Button>
      {/* 
      <Button
        onClick={() => {
          setIsActive(false);
          setTime(seconds * 1000);
        }}
      >
        Reset
      </Button> */}
    </div>
  );
};
