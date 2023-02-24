import clsx from "clsx"
import { ButtonHTMLAttributes } from "react"
import Svg from "react-inlinesvg"

import Button from "./Button"

type IconType = "bids" | "book" | "people" | "play" | "tick"

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  icon: IconType
  design: "transparent" | "primary"
}

export const IconButton = ({
  text,
  icon,
  design,
  ...props
}: IconButtonProps) => {
  const iconData = () => {
    switch (icon) {
      case "bids":
        return "/images/bids.svg"
      case "book":
        return "/images/book.svg"
      case "people":
        return "/images/people.svg"
      case "play":
        return "/images/play.svg"
      case "tick":
        return "/images/tick.svg"
    }
  }

  return (
    <Button
      className={clsx(
        design === "primary" ? "bg-primary" : "border border-borderColor",
        "hover:bg-hoverLight w-full lg:w-auto"
      )}
      {...props}
    >
      <div className="flex flex-row items-center gap-1 max-w-20px">
        <Svg
          className={clsx(
            design === "transparent" && "opacity-50 dark:text-white",
            "w-5",
            "max-h-4",
            "max-w-[20px]"
          )}
          src={iconData()}
        />
        <div
          className={clsx(
            "flex font-medium",
            design === "transparent" && "dark:text-white"
          )}
        >
          {text}
        </div>
      </div>
    </Button>
  )
}
