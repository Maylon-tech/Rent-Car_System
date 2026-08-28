import { useEffect, useState } from 'react'
import { AppDataContext } from './appDataStore'

const initialCars = [
  { id: 1, car: 'Serena', model: 'Nissan', year: '2021', color: 'Prata', status: 'Alugado' },
  { id: 2, car: 'Move', model: 'Daihatsu', year: '2017', color: 'Preto', status: 'Alugado' },
  { id: 3, car: 'Voxy', model: 'Toyota', year: '2023', color: 'Prata', status: 'Parado' },
]

const initialClients = [
  { id: 1, name: 'Carlos Oliveira', city: 'Nishio-shi', phone: '0567 5467 231', mobile: '090 4533 6512' },
  { id: 2, name: 'Danilo Gomes', city: 'Takahama-shi', phone: '0567 5489 341', mobile: '090 4533 6512' },
  { id: 3, name: 'Emerson Silva', city: 'Anjo-shi', phone: '0567 5467 327', mobile: '090 4533 6512' },
]

const initialServices = [
  {
    id: 1,
    service: 'Polimento e Higienizacao',
    car: 'Daihatsu Move',
    client: 'Robson',
    startDate: '01/2026',
    endDate: '02/2026',
    status: 'Andamento',
  },
  {
    id: 2,
    service: 'Polimento',
    car: 'Mira',
    client: 'Leandro',
    startDate: '01/2026',
    endDate: '02/2026',
    status: 'Terminado',
  },
  {
    id: 3,
    service: 'Higienizacao e Limpeza do farois',
    car: 'Toyota Prius',
    client: 'Maria',
    startDate: '01/2026',
    endDate: '02/2026',
    status: 'Andamento',
  },
]

const initialRentCars = [
  {
    id: 1,
    car: 'Serena',
    model: 'Nissan',
    client: 'Carlos Oliveira',
    rentDate: '2026-01-10',
    deliveryDate: '2026-01-20',
    price: '85000',
    available: false,
    paid: true,
  },
  {
    id: 2,
    car: 'Move',
    model: 'Daihatsu',
    client: 'Danilo Gomes',
    rentDate: '2026-02-01',
    deliveryDate: '2026-02-12',
    price: '72000',
    available: false,
    paid: false,
  },
  {
    id: 3,
    car: 'Voxy',
    model: 'Toyota',
    client: 'Disponivel',
    rentDate: '-',
    deliveryDate: '-',
    price: '0',
    available: true,
    paid: false,
  },
]

const getStoredValue = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallback
  } catch {
    return fallback
  }
}

const useStoredState = (key, initialValue) => {
  const [state, setState] = useState(() => getStoredValue(key, initialValue))

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

export const AppDataProvider = ({ children }) => {
  const [cars, setCars] = useStoredState('rentcar-cars', initialCars)
  const [clients, setClients] = useStoredState('rentcar-clients', initialClients)
  const [services, setServices] = useStoredState('rentcar-services', initialServices)
  const [rentCars, setRentCars] = useStoredState('rentcar-rentals', initialRentCars)

  const addCar = (car) => {
    setCars((currentCars) => [...currentCars, { id: Date.now(), ...car }])
  }

  const addClient = (client) => {
    setClients((currentClients) => [...currentClients, { id: Date.now(), ...client }])
  }

  const updateCar = (carId, updatedCar) => {
    setCars((currentCars) =>
      currentCars.map((car) => (car.id === carId ? { ...car, ...updatedCar } : car)),
    )
  }

  const deleteCar = (carId) => {
    setCars((currentCars) => currentCars.filter((car) => car.id !== carId))
    setRentCars((currentRentCars) => currentRentCars.filter((rentCar) => String(rentCar.carId) !== String(carId)))
  }

  const updateClient = (clientId, updatedClient) => {
    setClients((currentClients) =>
      currentClients.map((client) => (client.id === clientId ? { ...client, ...updatedClient } : client)),
    )
  }

  const deleteClient = (clientId) => {
    setClients((currentClients) => currentClients.filter((client) => client.id !== clientId))
  }

  const addService = (service) => {
    setServices((currentServices) => [...currentServices, { id: Date.now(), ...service }])
  }

  const updateService = (serviceId, updatedService) => {
    setServices((currentServices) =>
      currentServices.map((service) => (service.id === serviceId ? { ...service, ...updatedService } : service)),
    )
  }

  const deleteService = (serviceId) => {
    setServices((currentServices) => currentServices.filter((service) => service.id !== serviceId))
  }

  const addRentCar = (rentCar) => {
    const selectedCar = cars.find((car) => String(car.id) === String(rentCar.carId))
    const clientName = rentCar.clientName.trim()
    const clientExists = clients.some((client) => client.name.toLowerCase() === clientName.toLowerCase())

    if (!selectedCar || !clientName) {
      return
    }

    if (!clientExists) {
      setClients((currentClients) => [
        ...currentClients,
        {
          id: Date.now(),
          name: clientName,
          city: rentCar.city,
          phone: rentCar.phone,
          mobile: rentCar.mobile,
        },
      ])
    }

    setCars((currentCars) =>
      currentCars.map((car) => (car.id === selectedCar.id ? { ...car, status: 'Alugado' } : car)),
    )

    setRentCars((currentRentCars) => {
      const nextRentCar = {
        id: Date.now(),
        carId: selectedCar.id,
        car: selectedCar.car,
        model: selectedCar.model,
        client: clientName,
        rentDate: rentCar.rentDate,
        deliveryDate: rentCar.deliveryDate,
        price: rentCar.price,
        available: false,
        paid: false,
      }

      const hasAvailableCarRow = currentRentCars.some(
        (currentRentCar) => currentRentCar.car === selectedCar.car && currentRentCar.available,
      )

      if (hasAvailableCarRow) {
        return currentRentCars.map((currentRentCar) =>
          currentRentCar.car === selectedCar.car && currentRentCar.available ? nextRentCar : currentRentCar,
        )
      }

      return [...currentRentCars, nextRentCar]
    })
  }

  const updateRentCar = (rentCarId, updatedRentCar) => {
    const selectedCar = cars.find((car) => String(car.id) === String(updatedRentCar.carId))
    const clientName = (updatedRentCar.clientName || updatedRentCar.client || '').trim()

    if (!selectedCar || !clientName) {
      return
    }

    setClients((currentClients) => {
      const clientExists = currentClients.some((client) => client.name.toLowerCase() === clientName.toLowerCase())

      if (clientExists) {
        return currentClients
      }

      return [
        ...currentClients,
        {
          id: Date.now(),
          name: clientName,
          city: updatedRentCar.city,
          phone: updatedRentCar.phone,
          mobile: updatedRentCar.mobile,
        },
      ]
    })

    setRentCars((currentRentCars) =>
      currentRentCars.map((rentCar) =>
        rentCar.id === rentCarId
          ? {
              ...rentCar,
              carId: selectedCar.id,
              car: selectedCar.car,
              model: selectedCar.model,
              client: clientName,
              rentDate: updatedRentCar.rentDate,
              deliveryDate: updatedRentCar.deliveryDate,
              price: updatedRentCar.price,
            }
          : rentCar,
      ),
    )
  }

  const deleteRentCar = (rentCarId) => {
    setRentCars((currentRentCars) => currentRentCars.filter((rentCar) => rentCar.id !== rentCarId))
  }

  const toggleRentPayment = (rentCarId) => {
    setRentCars((currentRentCars) =>
      currentRentCars.map((rentCar) =>
        rentCar.id === rentCarId ? { ...rentCar, paid: !rentCar.paid } : rentCar,
      ),
    )
  }

  return (
    <AppDataContext.Provider
      value={{
        cars,
        clients,
        services,
        rentCars,
        addCar,
        updateCar,
        deleteCar,
        addClient,
        updateClient,
        deleteClient,
        addService,
        updateService,
        deleteService,
        addRentCar,
        updateRentCar,
        deleteRentCar,
        toggleRentPayment,
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}
