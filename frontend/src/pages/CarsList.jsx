import { useState } from 'react'
import { useAppData } from '../context/useAppData'
import Button from '../components/ui/Button'
import ConfirmModal from '../components/ui/ConfirmModal'
import DataTable from '../components/ui/DataTable'
import Modal from '../components/ui/Modal'

const fields = [
  { name: 'car', label: 'Carro', placeholder: 'Ex: Serena' },
  { name: 'model', label: 'Modelo', placeholder: 'Ex: Nissan' },
  { name: 'year', label: 'Ano', placeholder: 'Ex: 2024' },
  { name: 'color', label: 'Cor', placeholder: 'Ex: Branco' },
  { name: 'status', label: 'Status', placeholder: 'Ex: Disponivel' },
]

const createEmptyForm = () => fields.reduce((form, field) => ({ ...form, [field.name]: '' }), {})

const CarsList = () => {
  const { cars, addCar, updateCar, deleteCar } = useAppData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [editingCar, setEditingCar] = useState(null)
  const [deletingCar, setDeletingCar] = useState(null)
  const [formData, setFormData] = useState(createEmptyForm)

  // table columns definition
  const columns = [
    { key: 'car', label: 'Carro' },
    { key: 'model', label: 'Modelo' },
    { key: 'year', label: 'Ano' },
    { key: 'color', label: 'Cor' },
    { key: 'status', label: 'Status' },
    {
      key: 'actions',
      label: 'Ações',
      render: (car) => (
        <div className="flex justify-start gap-2">
          <button
            type="button"
            aria-label={`Editar ${car.car}`}
            onClick={() => openEditModal(car)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-gold)] transition hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={`Excluir ${car.car}`}
            onClick={() => openDeleteModal(car)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-rose-400 transition hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
          </button>
        </div>
      ),
    },
  ]

  const handleChange = (field, value) => {
    setFormData((currentData) => ({ ...currentData, [field]: value }))
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setEditingCar(null)
    setFormData(createEmptyForm())
  }

  const openCreateModal = () => {
    setEditingCar(null)
    setFormData(createEmptyForm())
    setIsModalOpen(true)
  }

  const openEditModal = (car) => {
    setEditingCar(car)
    setFormData({ ...car })
    setIsModalOpen(true)
  }

  const openDeleteModal = (car) => {
    setDeletingCar(car)
    setIsConfirmOpen(true)
  }

  const handleConfirm = () => {
    if (editingCar) {
      updateCar(editingCar.id, formData)
    } else {
      addCar(formData)
    }
    handleClose()
  }

  const handleDelete = () => {
    if (deletingCar) {
      deleteCar(deletingCar.id)
    }
    setDeletingCar(null)
    setIsConfirmOpen(false)
  }

  return (
    <div className="flex h-full w-full flex-col gap-6 rounded-lg bg-[var(--color-darkblue)] p-6">
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[var(--color-gold)]">Lista de Carros</h1>
        <Button onClick={openCreateModal}>Registrar novo carro</Button>
      </div>

      <DataTable columns={columns} data={cars} />

      {isModalOpen && (
        <Modal
          title={editingCar ? 'Editar carro' : 'Registrar novo carro'}
          fields={fields}
          formData={formData}
          confirmTitle={editingCar ? 'Salvar alterações' : 'Adicionar carro'}
          cancelTitle="Cancelar cadastro"
          onChange={handleChange}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      )}

      {isConfirmOpen && (
        <ConfirmModal
          title="Remover carro"
          message={`Deseja remover o carro ${deletingCar?.car} da lista?`}
          confirmTitle="Remover"
          onConfirm={handleDelete}
          onClose={() => {
            setDeletingCar(null)
            setIsConfirmOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default CarsList
