import { useState } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { MdPaid } from 'react-icons/md'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import Button from '../components/ui/Button'
import ConfirmModal from '../components/ui/ConfirmModal'
import DataTable from '../components/ui/DataTable'
import Modal from '../components/ui/Modal'
import { useAppData } from '../context/useAppData'

const createEmptyForm = () => ({
  carId: '',
  clientName: '',
  city: '',
  phone: '',
  mobile: '',
  rentDate: '',
  deliveryDate: '',
  price: '',
})

const RentCar = () => {
  const { cars, clients, rentCars, addRentCar, updateRentCar, deleteRentCar, toggleRentPayment } = useAppData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [editingRent, setEditingRent] = useState(null)
  const [deletingRent, setDeletingRent] = useState(null)
  const [formData, setFormData] = useState(createEmptyForm)

  const availableCars = [
    ...cars.filter((car) => car.status !== 'Alugado'),
    ...(editingRent ? cars.filter((car) => String(car.id) === String(editingRent.carId)) : []),
  ]

  const fields = [
    {
      name: 'carId',
      label: 'Carro',
      type: 'select',
      placeholder: 'Escolha um carro',
      options: availableCars.map((car) => ({
        value: String(car.id),
        label: `${car.car} - ${car.model}`,
      })),
    },
    {
      name: 'clientName',
      label: 'Cliente',
      placeholder: 'Digite ou escolha um cliente',
      list: 'registered-clients',
      options: clients.map((client) => ({ value: client.name })),
    },
    { name: 'city', label: 'Cidade', placeholder: 'Ex: Nishio-shi' },
    { name: 'phone', label: 'Telefone', placeholder: 'Ex: 0567 0000 000' },
    { name: 'mobile', label: 'Celular', placeholder: 'Ex: 090 0000 0000' },
    { name: 'rentDate', label: 'Data de aluguel', type: 'date' },
    { name: 'deliveryDate', label: 'Data de entrega', type: 'date' },
    { name: 'price', label: 'Valor em yen', type: 'number', placeholder: 'Ex: 85000', min: '0', step: '1000' },
  ]

  const handleChange = (field, value) => {
    const registeredClient = clients.find((client) => client.name.toLowerCase() === value.toLowerCase())

    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
      ...(field === 'clientName' && registeredClient
        ? {
            city: registeredClient.city,
            phone: registeredClient.phone,
            mobile: registeredClient.mobile,
          }
        : {}),
    }))
  }

  const handleClose = () => {
    setFormData(createEmptyForm())
    setEditingRent(null)
    setIsModalOpen(false)
  }

  const openCreateModal = () => {
    setEditingRent(null)
    setFormData(createEmptyForm())
    setIsModalOpen(true)
  }

  const openEditModal = (rentCar) => {
    setEditingRent(rentCar)
    setFormData({
      carId: rentCar.carId ?? '',
      clientName: rentCar.client ?? '',
      city: rentCar.city ?? '',
      phone: rentCar.phone ?? '',
      mobile: rentCar.mobile ?? '',
      rentDate: rentCar.rentDate ?? '',
      deliveryDate: rentCar.deliveryDate ?? '',
      price: rentCar.price ?? '',
    })
    setIsModalOpen(true)
  }

  const openDeleteModal = (rentCar) => {
    setDeletingRent(rentCar)
    setIsConfirmOpen(true)
  }

  const handleConfirm = () => {
    if (editingRent) {
      updateRentCar(editingRent.id, formData)
    } else {
      addRentCar(formData)
    }

    handleClose()
  }

  const handleDelete = () => {
    if (deletingRent) {
      deleteRentCar(deletingRent.id)
    }

    setDeletingRent(null)
    setIsConfirmOpen(false)
  }

  const formatYen = (value) => {
    const price = Number(value)

    if (!price) {
      return '-'
    }

    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const columns = [
    { key: 'car', label: 'Carro' },
    { key: 'model', label: 'Modelo' },
    { key: 'client', label: 'Cliente' },
    { key: 'rentDate', label: 'Data aluguel' },
    { key: 'deliveryDate', label: 'Data entrega' },
    {
      key: 'price',
      label: 'Valor',
      render: (rentCar) => formatYen(rentCar.price),
    },
    {
      key: 'available',
      label: 'Disponibilidade',
      render: (rentCar) => (
        <span
          className={`inline-flex items-center gap-2 font-semibold ${
            rentCar.available ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {rentCar.available ? <FaCheckCircle /> : <FaTimesCircle />}
          {rentCar.available ? 'Disponivel' : 'Em uso'}
        </span>
      ),
    },
    {
      key: 'paid',
      label: 'Pagamento',
      render: (rentCar) => (
        <button
          type="button"
          onClick={() => toggleRentPayment(rentCar.id)}
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] ${
            rentCar.paid
              ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
              : 'bg-red-500/15 text-red-300 hover:bg-red-500/25'
          }`}
        >
          {rentCar.paid ? <MdPaid size={18} /> : <RiMoneyDollarCircleLine size={18} />}
          {rentCar.paid ? 'Pago' : 'Nao pago'}
        </button>
      ),
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (rentCar) => (
        <div className="flex justify-start gap-2">
          <button
            type="button"
            aria-label={`Editar ${rentCar.client}`}
            onClick={() => openEditModal(rentCar)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-gold)] transition hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={`Excluir ${rentCar.client}`}
            onClick={() => openDeleteModal(rentCar)}
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

  return (
    <div className="flex h-full w-full flex-col gap-6 rounded-lg bg-[var(--color-darkblue)] p-6">
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-[var(--color-gold)]">Controle de Aluguel</h1>
        <Button onClick={openCreateModal}>Adicionar aluguel</Button>
      </div>

      <DataTable columns={columns} data={rentCars} />

      {isModalOpen && (
        <Modal
          title={editingRent ? 'Editar aluguel' : 'Novo aluguel'}
          fields={fields}
          formData={formData}
          confirmTitle={editingRent ? 'Salvar alterações' : 'Adicionar aluguel'}
          cancelTitle="Cancelar"
          onChange={handleChange}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      )}

      {isConfirmOpen && (
        <ConfirmModal
          title="Remover aluguel"
          message={`Deseja remover este aluguel da lista?`}
          confirmTitle="Remover"
          onConfirm={handleDelete}
          onClose={() => {
            setDeletingRent(null)
            setIsConfirmOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default RentCar
