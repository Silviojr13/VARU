import { useContext, createContext } from "react"

type Toast = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  [key: string]: any
}

type ToastContextType = {
  toasts: Toast[]
  addToast?: (toast: Toast) => void
  removeToast?: (id: string) => void
}

// Contexto fictício para exemplo
const ToastContext = createContext<ToastContextType>({ toasts: [] })

export function useToast() {
  return useContext(ToastContext)
}