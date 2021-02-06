import { useEffect, useState } from "react"

/** @type {(key: string, initialValue: any) => [any, (value: any) => void]} */
export function useLocalState(key, initialValue) {
  const [state, setState] = useState([])
  useEffect(() => {
    if (typeof window === "undefined") {
      setState(initialValue)
    } else {
      try {
        const item = window.localStorage.getItem(key)
        setState(item ? JSON.parse(item) : initialValue)
      } catch {}
    }
  }, [key, initialValue])
  return [
    state,
    (value) => {
      setState(value)
      try {
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch {}
    },
  ]
}
