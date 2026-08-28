import Button from './Button'

const ConfirmModal = ({ title, message, confirmTitle = 'Confirmar', cancelTitle = 'Cancelar', onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-lg border border-[var(--color-gold)] bg-[var(--color-darkblue)] p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-[var(--color-gold)]">{title}</h2>
        <p className="mt-3 text-sm text-[var(--color-white)]">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            {cancelTitle}
          </Button>
          <Button onClick={onConfirm}>{confirmTitle}</Button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
