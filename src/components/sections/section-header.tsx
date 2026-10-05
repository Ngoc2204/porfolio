import { cn } from "@/lib/utils"
import Link from "next/link"
import { BoxReveal } from "../reveal-animations"
import { ReactNode } from "react"

export const SectionHeader = ({ id, title, desc, className }: { id: string, title: string | ReactNode, desc?: string, className?: string }) => {
  return (

    <div className={cn("relative mb-12 px-4 md:mb-20", className)}>
      <Link href={`#${id}`}>
        <BoxReveal width="100%">
          <h2
            className={cn(
              "mx-auto w-fit max-w-full rounded-xl border border-border bg-background px-5 py-2",
              "text-4xl text-center leading-tight md:text-6xl font-bold text-foreground shadow-lg"
            )}
          >
            {title}
          </h2>
        </BoxReveal>
      </Link>
      <p className="mx-auto mt-2 w-fit max-w-3xl rounded-lg bg-background px-3 py-1 text-center text-base font-normal text-muted-foreground">
        {desc}
      </p>
    </div>
  )
}
