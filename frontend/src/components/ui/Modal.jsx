import { IoClose } from 'react-icons/io5'
import Button from './Button'

const fieldClass =
  'rounded-lg border border-white/10 bg-[var(--color-darkblue-soft)] px-3 py-2 text-[var(--color-white)] outline-none transition focus:border-[var(--color-gold)]'

const Modal = ({
  title,
  fields,
  formData,
  confirmTitle,
  cancelTitle = 'Cancelar',
  onChange,
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-xl rounded-lg border border-[var(--color-gold)] bg-[var(--color-darkblue)] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-[var(--color-gold)]">{title}</h2>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-gold)] transition-colors hover:bg-[var(--color-darkblue-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
          >
            <IoClose size={22} />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <label key={field.name} className="flex flex-col gap-2 text-sm font-semibold text-[var(--color-gold)]">
              {field.label}
              {field.type === 'select' ? (
                <select
                  value={formData[field.name] ?? ''}
                  onChange={(event) => onChange(field.name, event.target.value)}
                  className={fieldClass}
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <>
                  <input
                    type={field.type ?? 'text'}
                    value={formData[field.name] ?? ''}
                    onChange={(event) => onChange(field.name, event.target.value)}
                    placeholder={field.placeholder}
                    list={field.list}
                    min={field.min}
                    step={field.step}
                    className={fieldClass}
                  />
                  {field.options && field.list && (
                    <datalist id={field.list}>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value} />
                      ))}
                    </datalist>
                  )}
                </>
              )}
            </label>
          ))}
        </div>

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

export default Modal
