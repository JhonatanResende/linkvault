import './Spinner.css'

interface SpinnerProps {
  text?: string
}

export default function Spinner({ text = 'Carregando...' }: SpinnerProps) {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  )
}