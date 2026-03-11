import React, {} from "react";
import {
  Candy,
  CircleOff,
  Citrus,
  Leaf,
  Nut,
  PillBottle,
  Sprout,
  type LucideIcon,
} from "lucide-react";

const iconTag: Record<string, LucideIcon> = {
  leaf: Leaf,
  sprout: Sprout,
  candy: Candy,
  fruit: Citrus,
  nut: Nut,
  spice: PillBottle,
  none: CircleOff,
};

type TagProps = {
  content: string;
  icon?: string;
  color?: string;
};

export function Tag({ content, icon, color, ...props }: TagProps) {
  let Icon: LucideIcon | null = null;

  if (icon) {
    Icon = iconTag[icon.toLowerCase()];
  }

  return (
    <div className="flex bg-primary-beige p-1.5 gap-1.5 rounded-full w-fit">
      <div
        className="flex items-center rounded-full p-1 bg-(--tag-color) min-w-6 aspect-square"
        style={
          {
            "--tag-color": color,
          } as React.CSSProperties
        }
      >
        {Icon && (
          <Icon color="var(--color-primary-dark)" strokeWidth={1.5} size={16} opacity={0.5} />
        )}
      </div>
      <p className="font-display">
        {content}
      </p>
    </div>
  );
}
