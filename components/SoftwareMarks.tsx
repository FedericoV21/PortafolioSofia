import Image from "next/image";

type SoftwareMarksProps = {
  tools: { name: string; src: string }[];
};

export function SoftwareMarks({ tools }: SoftwareMarksProps) {
  return (
    <ul className="flex flex-wrap items-center gap-3" aria-label="Herramientas">
      {tools.map((tool) => (
        <li key={tool.name}>
          <Image
            src={tool.src}
            alt={tool.name}
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
            title={tool.name}
          />
        </li>
      ))}
    </ul>
  );
}
