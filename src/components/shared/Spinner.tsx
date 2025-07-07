import { cx } from "@/lib/utils";
import { RiLoader2Fill } from "@remixicon/react";

type Props = {
  className?: string;
  loadingText?: string;
};

function Spinner({ className, loadingText = "" }: Props) {
  return (
    <span
      className={cx(
        "pointer-events-none flex shrink-0 items-center justify-center gap-1.5",
        className
      )}
    >
      <RiLoader2Fill
        className="size-4 shrink-0 animate-spin"
        aria-hidden="true"
      />
      <span className="sr-only">{loadingText ? loadingText : "Loading.."}</span>
      {loadingText}
    </span>
  );
}

export default Spinner;
