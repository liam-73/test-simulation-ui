import { useState } from 'react'
import Modal from '../ui/Modal'
import { FileText, MonitorPlay } from 'lucide-react'

export const Sidebar = () => {
  const [modalContent, setModalContent] = useState<'video' | 'text' | null>(
    null
  )

  const openModal = (type: 'video' | 'text') => setModalContent(type)
  const closeModal = () => setModalContent(null)

  return (
    <>
      <aside className="h-full w-[20%] bg-white flex flex-col items-center text-primary p-4 space-y-4">
        <button
          onClick={() => openModal('video')}
          className="p-2 hover:bg-gray-200 w-full flex justify-center rounded !bg-transparent"
        >
          <MonitorPlay className="w-6 h-6 text-primary" />
        </button>
        <button
          onClick={() => openModal('text')}
          className="p-2 hover:bg-gray-200 w-full flex justify-center rounded !bg-transparent"
        >
          <FileText className="w-6 h-6 text-primary" />
        </button>
      </aside>

      <Modal isOpen={modalContent !== null} onClose={closeModal}>
        {modalContent === 'video' && (
          <div className="w-full h-[400px]">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&start=0"
              title="Never Gonna Give You Up"
              allowFullScreen
            />
          </div>
        )}

        {modalContent === 'text' && (
          <p className="text-gray-700 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius
            urna nec sapien gravida, at tempus purus dignissim. In hac habitasse
            platea dictumst. Suspendisse potenti. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed varius urna nec sapien gravida, at
            tempus purus dignissim. In hac habitasse platea dictumst.
            Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed varius urna nec sapien gravida, at tempus purus
            dignissim. In hac habitasse platea dictu.
          </p>
        )}
      </Modal>
    </>
  )
}
