import Image from "next/image";

type SoftwareMarksProps = {
  tools: { name: string; src: string }[];
};

export function SoftwareMarks({ tools }: SoftwareMarksProps) {
  return (
    <ul className="flex flex-wrap items-center gap-3 tablet-portrait:gap-2.5" aria-label="Herramientas">
      {tools.map((tool) => (
        <li key={tool.name}>
          <Image
            src={tool.src}
            alt={tool.name}
            width={58}
            height={58}
            className="h-11 w-11 rounded-[10px] object-contain tablet-portrait:h-[52px] tablet-portrait:w-[52px] tablet-landscape:h-[58px] tablet-landscape:w-[58px] xl:h-12 xl:w-12"
            title={tool.name}
          />
        </li>
      ))}
    </ul>
  );
}
