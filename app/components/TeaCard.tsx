import type { Tea } from "~/types/tea";
import { NavLink } from "react-router";
import wavePattern from "../assets/images/wave-pattern-old.png";
import { getTeaColor } from "~/lib/teaFormatters";

export function TeaCard({ tea }: { tea: Tea }) {
  const color = getTeaColor(tea);

  const showType = tea.name.toLowerCase() !== tea.type.toLowerCase();

  return (
    <article
      className="flex-1 w-full min-w-46 min-h-60 p-2 rounded-xl grid 
      md:min-w-46 md:max-w-64 bg-[var(--tea-color)] bg-size-[260%]NOT bg-size-[150%] relative"
      style={
        {
          "--tea-color": color,
          backgroundImage: `url(${wavePattern})`,
        } as React.CSSProperties
      }
    >
      <header className="bg-primary-beige w-40 min-h-28 self-end justify-self-end grid rounded-xl p-2.5">
        <div className="self-end">
          <h3 className="text-2xl mt-auto  hyphens-auto">{tea.name}</h3>
          <p className=" font-display">
            {showType && <span>{tea.type}</span>} tea
          </p>
        </div>
      </header>
      <NavLink to={`tea/${tea.id}`} className="absolute inset-0 text-[0rem]">
        view
      </NavLink>
    </article>
  );
}
