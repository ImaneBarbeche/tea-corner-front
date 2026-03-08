import type { Tea } from "~/types/tea";
import { NavLink } from "react-router";
import { TEA_TYPE_COLORS } from "~/routes/app/enums/teaType.enum";

export function TeaCard({ tea }: { tea: Tea }) {
  //   let color: string;

  //   if (tea.custom_color) {
  //     color = tea.custom_color;
  //   }

  //   if (tea.style?.color) {
  //     color = tea.style.color;
  //   }

  const color =
    tea.custom_color || tea.style?.color || TEA_TYPE_COLORS[tea.type];

  //   const bgStyle = `bg-[${color}]`;

  return (
    <article
      className="p-2 rounded-3xl bg-[var(--tea-color)]"
      style={{ "--tea-color": color } as React.CSSProperties}
    >
      <header>
        <h3>{tea.name}</h3>
        <p>
          {/* {tea.type}  */}
          tea
        </p>
        <NavLink to={`tea/${tea.id}`}>view</NavLink>
      </header>
    </article>
  );
}
