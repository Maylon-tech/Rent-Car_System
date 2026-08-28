import { useState } from 'react'
import { useAppData } from '../context/useAppData'
import Button from '../components/ui/Button'
import ConfirmModal from '../components/ui/ConfirmModal'
import DataTable from '../components/ui/DataTable'
import Modal from '../components/ui/Modal'

const fields = [
  { name: 'service', label: 'Servico', placeholder: 'Ex: Polimento' },
  { name: 'car', label: 'Carro', placeholder: 'Ex: Toyota Voxy' },
  { name: 'client', label: 'Cliente', placeholder: 'Ex: Carlos Oliveira' },
  { name: 'startDate', label: 'Data entrada', placeholder: 'Ex: 03/2026' },
  { name: 'endDate', label: 'Data entrega', placeholder: 'Ex: 04/2026' },
  { name: 'status', label: 'Status', placeholder: 'Ex: Andamento' },
]

const createEmptyForm = () => fields.reduce((form, field) => ({ ...form, [field.name]: '' }), {})

const Services = () => {
  const { services, addService, updateService, deleteService } = useAppData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [deletingService, setDeletingService] = useState(null)
  const [formData, setFormData] = useState(createEmptyForm)

  const columns = [
    { key: 'service', label: 'Servico' },
    { key: 'car', label: 'Carro' },
    { key: 'client', label: 'Cliente' },
    { key: 'startDate', label: 'Data Entrada' },
    { key: 'endDate', label: 'Data Entrega' },
    { key: 'status', label: 'Status' },
    {
      key: 'actions',
      label: 'Ações',
      render: (service) => (
        <div className="flex justify-start gap-2">
          <button
            type="button"
            aria-label={`Editar ${service.service}`}
            onClick={() => openEditModal(service)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-gold)] transition hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={`Excluir ${service.service}`}
            onClick={() => openDeleteModal(service)}
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
    setEditingService(null)
    setFormData(createEmptyForm())
  }

  const openCreateModal = () => {
    setEditingService(null)
    setFormData(createEmptyForm())
    setIsModalOpen(true)
  }

  const openEditModal = (service) => {
    setEditingService(service)
    setFormData({ ...service })
    setIsModalOpen(true)
  }

  const openDeleteModal = (service) => {
    setDeletingService(service)
    setIsConfirmOpen(true)
  }

  const handleConfirm = () => {
    if (editingService) {
      updateService(editingService.id, formData)
    } else {
      addService(formData)
    }

    handleClose()
  }

  const handleDelete = () => {
    if (deletingService) {
      deleteService(deletingService.id)
    }

    setDeletingService(null)
    setIsConfirmOpen(false)
  }

  return (
    <div className="flex h-full w-full flex-col gap-6 rounded-lg bg-[var(--color-darkblue)] p-6">
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[var(--color-gold)]">Servicos Disponiveis</h1>
        <Button onClick={openCreateModal}>Registrar novo servico</Button>
      </div>

      <DataTable columns={columns} data={services} />

      {isModalOpen && (
        <Modal
          title={editingService ? 'Editar servico' : 'Registrar novo servico'}
          fields={fields}
          formData={formData}
          confirmTitle={editingService ? 'Salvar alterações' : 'Adicionar servico'}
          cancelTitle="Cancelar cadastro"
          onChange={handleChange}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      )}

      {isConfirmOpen && (
        <ConfirmModal
          title="Remover servico"
          message={`Deseja remover o servico ${deletingService?.service} da lista?`}
          confirmTitle="Remover"
          onConfirm={handleDelete}
          onClose={() => {
            setDeletingService(null)
            setIsConfirmOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default Services
