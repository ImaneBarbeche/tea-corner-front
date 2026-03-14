import teaCup from "~/assets/images/tea-cup-hue.png";

interface TeaTimerCupProps {
  isSteeping: boolean;
  brewingTime: number;
}

export const TeaTimerCup = ({ isSteeping, brewingTime }: TeaTimerCupProps) => {
  return (
    <div
      className="relative w-fullNOT h-full w-72 aspect-square bg-cover bg-center saturate-60

            after:content-['']
            after:absolute 
            after:inset-0
            after:bg-[var(--tea-color)] 
            after:opacity-40 
            after:mix-blend-color
            after:rounded-full 
            after:pointer-events-none
            after:z-20
            after:animate-[steepAnimation_var(--steep-duration)_linear_forwards]
            after:[animation-play-state:var(--steep-state)]
          "
      style={
        {
          backgroundImage: `url(${teaCup})`,
          "--steep-duration": `${brewingTime}s`, // Variable for duration
          "--steep-state": isSteeping ? "running" : "paused",
        } as React.CSSProperties
      }
    ></div>
  );
};
