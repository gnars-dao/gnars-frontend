import clsx from "clsx"

export default function Button({ children, className, ...props }) {
  return (
    <button
      className={clsx(
        "flex flex-row justify-center items-center px-3 height rounded-xl h-10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
