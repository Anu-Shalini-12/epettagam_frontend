import React from 'react'
import { Dialog } from '@headlessui/react'

function CustomModal({ children, openModal, onClick }) {
  return (
    <Dialog
      as="div"
      className="relative z-10 w-full "
      open={openModal}
      onClose={onClick}
    >
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-full text-center">
          <Dialog.Panel className="w-full max-w-6xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <Dialog.Title className="flex justify-end">
              <button className="p-2 mx-2 font-bold" onClick={onClick}>
                X
              </button>
            </Dialog.Title>

            <div className="flex items-center justify-center mb-10 ">
              {children}
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}

export default CustomModal
