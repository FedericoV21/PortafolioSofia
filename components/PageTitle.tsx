type PageTitleProps = {
  children: string;
  className?: string;
};

export function PageTitle({ children, className = "" }: PageTitleProps) {
  return (
    <h1
      className={`font-display text-5xl leading-[0.85] font-normal tracking-tight text-ink uppercase sm:text-7xl lg:text-[7.5rem] ${className}`}
    >
      {children}
    </h1>
  );
}
