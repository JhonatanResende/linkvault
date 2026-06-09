import { useEffect } from 'react'
import './Toast.css'

// Que tipos de toast existem
export type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  onClose: () => void
}

// Ícone de acordo com o tipo
const ICONS = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
}

export default function Toast({ message, type, onClose }: ToastProps) {
  // Fecha automaticamente depois de 3 segundos
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    // "limpeza" — cancela o timer se o componente sumir antes
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">{ICONS[type]}</span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  )
}