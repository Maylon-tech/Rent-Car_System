import { useState } from 'react'
import { useAppData } from '../context/useAppData'
import Button from '../components/ui/Button'
import ConfirmModal from '../components/ui/ConfirmModal'
import DataTable from '../components/ui/DataTable'
import Modal from '../components/ui/Modal'

const fields = [
  { name: 'name', label: 'Nome completo', placeholder: 'Ex: Maria Silva' },
  { name: 'city', label: 'Cidade', placeholder: 'Ex: Anjo-shi' },
  { name: 'phone', label: 'Telefone', placeholder: 'Ex: 0567 0000 000' },
  { name: 'mobile', label: 'Celular', placeholder: 'Ex: 090 0000 0000' },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'Selecione o tipo',
    options: [
      { value: 'Serviço', label: 'Serviço' },
      { value: 'Aluguel', label: 'Aluguel' },
    ],
  },
]

const createEmptyForm = () => fields.reduce((form, field) => ({ ...form, [field.name]: '' }), {})

const ClientList = () => {
  const { clients, addClient, updateClient, deleteClient } = useAppData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [deletingClient, setDeletingClient] = useState(null)
  const [formData, setFormData] = useState(createEmptyForm)

  const columns = [
    { key: 'name', label: 'Nome Completo' },
    { key: 'city', label: 'Cidade' },
    { key: 'phone', label: 'Telefone' },
    { key: 'mobile', label: 'Celular' },
    {
      key: 'status',
      label: 'Status',
      render: (client) => (
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
            client.status === 'Aluguel' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-[var(--color-gold)]/15 text-[var(--color-gold)]'
          }`}
        >
          {client.status || 'Sem status'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (client) => (
        <div className="flex items-center justify-start gap-2">
          <button
            type="button"
            aria-label={`Editar ${client.name}`}
            onClick={() => openEditModal(client)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-gold)] transition hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={`Excluir ${client.name}`}
            onClick={() => openDeleteModal(client)}
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
    setEditingClient(null)
    setFormData(createEmptyForm())
  }

  const openCreateModal = () => {
    setEditingClient(null)
    setFormData(createEmptyForm())
    setIsModalOpen(true)
  }

  const openEditModal = (client) => {
    setEditingClient(client)
    setFormData({ ...client })
    setIsModalOpen(true)
  }

  const openDeleteModal = (client) => {
    setDeletingClient(client)
    setIsConfirmOpen(true)
  }

  const handleConfirm = () => {
    if (editingClient) {
      updateClient(editingClient.id, formData)
    } else {
      addClient(formData)
    }

    handleClose()
  }

  const handleDelete = () => {
    if (deletingClient) {
      deleteClient(deletingClient.id)
    }

    setDeletingClient(null)
    setIsConfirmOpen(false)
  }

  return (
    <div className="flex h-full w-full flex-col gap-6 rounded-lg bg-[var(--color-darkblue)] p-6">
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[var(--color-gold)]">Lista de Clientes</h1>
        <Button onClick={openCreateModal}>Registrar novo cliente</Button>
      </div>

      <DataTable columns={columns} data={clients} />

      {isModalOpen && (
        <Modal
          title={editingClient ? 'Editar cliente' : 'Registrar novo cliente'}
          fields={fields}
          formData={formData}
          confirmTitle={editingClient ? 'Salvar alterações' : 'Adicionar cliente'}
          cancelTitle="Cancelar cadastro"
          onChange={handleChange}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      )}

      {isConfirmOpen && (
        <ConfirmModal
          title="Remover cliente"
          message={`Deseja remover o cliente ${deletingClient?.name} da lista?`}
          confirmTitle="Remover"
          onConfirm={handleDelete}
          onClose={() => {
            setDeletingClient(null)
            setIsConfirmOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default ClientList
