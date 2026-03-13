import type { Tea } from "~/types/tea";
// import { phonemize } from "phonemize";

export function TeaHeader({ tea }: { tea: Tea }) {
  const showType = tea.name.toLowerCase() !== tea.type.toLowerCase();
  return (
    <header>
      <h1>
        <span className=" capitalize text-5xl text-[var(--tea-color)] text-transparent [-webkit-text-stroke:0.043rem_var(--color-primary-dark)] [text-shadow:0.12rem_0.12rem_var(--tea-color)]">
          {tea.name}
        </span>
      </h1>
      <span className="inline-block mt-1">
        {showType && <span>{tea.type}</span>} tea
      </span>
      {/* <p className="phonetic">{phonetic}</p> */}
    </header>
  );
}
