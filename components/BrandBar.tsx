export function BrandBar() {
  return (
    <div
      className="flex h-[5px] w-full shrink-0 tablet:h-[7px] xl:h-3"
      aria-hidden="true"
    >
      <div className="h-full w-1/2 bg-sage" />
      <div className="h-full w-1/2 bg-coral" />
    </div>
  );
}
