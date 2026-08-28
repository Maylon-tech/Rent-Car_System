import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import Button from '../components/ui/Button'

const serviceOptions = [
  'Lavagem do carro',
  'Limpeza completa do interior',
  'Limpeza do motor',
]

const Settings = () => {
  const { isDark, toggleTheme } = useTheme()
  const [selectedServices, setSelectedServices] = useState([])

  const toggleService = (service) => {
    setSelectedServices((currentServices) =>
      currentServices.includes(service)
        ? currentServices.filter((item) => item !== service)
        : [...currentServices, service],
    )
  }

  return (
    <div className="flex h-full w-full flex-col gap-6 rounded-2xl border border-white/10 bg-[var(--bg-secondary)] p-6 shadow-xl" style={{ color: 'var(--text-primary)' }}>
      <div className="flex w-full items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-gold)' }}>
            Configurações
          </h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Gerencie preferências do sistema e serviços disponíveis.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Tema escuro</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Ative ou desative o modo escuro para toda a aplicação.
            </p>
          </div>

          <button
            type="button"
            aria-label="Toggle dark theme"
            onClick={toggleTheme}
            className="relative h-7 w-14 rounded-full transition-colors duration-300"
            style={{ backgroundColor: isDark ? 'var(--color-gold)' : 'var(--color-darkblue)' }}
          >
            <span
              className="absolute top-1 h-5 w-5 rounded-full bg-white transition-transform duration-300"
              style={{ transform: isDark ? 'translateX(0px)' : 'translateX(-22px)' }}
            />
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Criar novos serviços</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Selecione os serviços que desejam aparecer no catálogo.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {serviceOptions.map((service) => {
            const checked = selectedServices.includes(service)

            return (
              <label key={service} className="flex items-center gap-3 rounded-lg border border-white/10 px-3 py-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleService(service)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span>{service}</span>
              </label>
            )
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button>Salvar alterações</Button>
        <Button variant="secondary">Cancelar</Button>
      </div>
    </div>
  )
}

export default Settings
