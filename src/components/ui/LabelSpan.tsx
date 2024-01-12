import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = {};

export default function LabelSpan({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} className={cn("font-semibold ", className)} />;
}
