"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-warm-cream group-[.toaster]:text-saddle-brown group-[.toaster]:border-saddle-brown/20 group-[.toaster]:shadow-lg font-lato",
          description: "group-[.toast]:text-saddle-brown/70",
          actionButton:
            "group-[.toast]:bg-saddle-brown group-[.toast]:text-warm-cream",
          cancelButton:
            "group-[.toast]:bg-warm-cream group-[.toast]:text-saddle-brown group-[.toast]:border-saddle-brown/20",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

