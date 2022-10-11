import clsx from "clsx"

export default function RoundButton(props) {
  const { children, className } = props
  return (
    <button
      className={clsx(
        "text-lg text-primaryText bg-primary hover:bg-hoverLight font-bold rounded-full w-32px h-32px text-center",
        className
      )}
    >
      {children}
    </button>
  )
}
