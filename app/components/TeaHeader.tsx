import type { Tea } from "~/types/tea";

export function TeaHeader({ tea }: { tea: Tea }) {
  return (
    <header>
      <h1>
        <span className=" capitalize text-5xl text-[var(--tea-color)] text-transparent [-webkit-text-stroke:0.043rem_var(--color-primary-dark)] [text-shadow:0.12rem_0.12rem_var(--tea-color)]">
          {tea.name}
        </span>
        <span className="font-sans text-2xl ml-2">tea</span>
      </h1>
      <p className="phonetic">/ˈpɛpəˌmɪnt/</p>
    </header>
  );
}
