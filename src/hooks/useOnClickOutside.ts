import { RefObject, useEffect } from "react"

type Event = MouseEvent | TouchEvent

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref.current
      if (!el || el.contains((event.target as Node) || null)) {
        return
      }

      callback(event) // Call the callback only if the click is outside of the element passed.
    }
    document.addEventListener("mousedown", listener, { passive: false })
    document.addEventListener("touchstart", listener, { passive: false })

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, callback]) // Reload only if ref or callback changes
}

export default useOnClickOutside
