import { X } from 'lucide-react'

type ModalProps = {
  title?: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal = ({
  title = 'Modal Title',
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center text-primary items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="!bg-transparent !p-2">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

export default Modal
