import { useAppData } from '../context/useAppData'
import DataTable from '../components/ui/DataTable'

const carColumns = [
  { key: 'car', label: 'Carro' },
  { key: 'year', label: 'Ano' },
  { key: 'model', label: 'Modelo' },
  { key: 'status', label: 'Situacao' },
]

const clientColumns = [
  { key: 'name', label: 'Cliente' },
  { key: 'city', label: 'Cidade' },
  { key: 'mobile', label: 'Celular' },
]

const Home = () => {
  const { cars, clients, rentCars, services } = useAppData()

  // Calculate most used cars this month
  const carUsageCount = rentCars.reduce(
    (acc, rent) => {
      const existing = acc.find((item) => item.car === rent.car)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ car: rent.car, count: 1 })
      }
      return acc
    },
    [],
  )

  const maxCarUsage = Math.max(...carUsageCount.map((item) => item.count), 1)

  // Calculate client service flow
  const serviceCount = services.reduce(
    (acc, service) => {
      const existing = acc.find((item) => item.type === service.service)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ type: service.service, count: 1 })
      }
      return acc
    },
    [],
  )

  const maxServiceCount = Math.max(...serviceCount.map((item) => item.count), 1)

  return (
    <div className="flex h-full w-full flex-col gap-6 rounded-lg p-6" style={{ color: 'var(--text-primary)' }}>
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-gold)' }}>
          Painel Geral
        </h1>
      </div>

      <div className="grid w-full gap-6 xl:grid-cols-2">
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--color-gold)' }}>
            Resumo de Carros
          </h2>
          <DataTable columns={carColumns} data={cars.slice(0, 6)} />
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--color-gold)' }}>
            Resumo de Clientes
          </h2>
          <DataTable columns={clientColumns} data={clients.slice(0, 6)} />
        </section>
      </div>

      <div className="grid w-full gap-6 xl:grid-cols-2">
        <section className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[var(--bg-secondary)] p-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--color-gold)' }}>
            Desempenho de Aluguel de Carros
          </h2>

          {carUsageCount.length > 0 ? (
            <svg width="100%" height="200" viewBox="0 0 400 200" className="overflow-visible">
              <defs>
                <linearGradient id="carGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="40" y1="150" x2="380" y2="150" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
              <line x1="40" y1="100" x2="380" y2="100" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
              <line x1="40" y1="50" x2="380" y2="50" stroke="white" strokeOpacity="0.1" strokeWidth="1" />

              {/* Y-axis */}
              <line x1="40" y1="20" x2="40" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="2" />

              {/* X-axis */}
              <line x1="40" y1="160" x2="380" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="2" />

              {/* Y-axis labels */}
              <text x="35" y="165" fontSize="10" fill="var(--text-secondary)" textAnchor="end">
                0
              </text>
              <text x="35" y="107" fontSize="10" fill="var(--text-secondary)" textAnchor="end">
                {Math.ceil(maxCarUsage / 2)}
              </text>
              <text x="35" y="57" fontSize="10" fill="var(--text-secondary)" textAnchor="end">
                {maxCarUsage}
              </text>

              {/* Line path */}
              {carUsageCount.length > 0 && (
                <>
                  <polyline
                    points={carUsageCount
                      .map((item, idx) => {
                        const x = 50 + (idx * 340) / (carUsageCount.length - 1 || 1)
                        const y = 160 - (item.count / maxCarUsage) * 140
                        return `${x},${y}`
                      })
                      .join(' ')}
                    fill="none"
                    stroke="var(--color-gold)"
                    strokeWidth="2"
                  />

                  {/* Area under line */}
                  <polygon
                    points={`50,160 ${carUsageCount
                      .map((item, idx) => {
                        const x = 50 + (idx * 340) / (carUsageCount.length - 1 || 1)
                        const y = 160 - (item.count / maxCarUsage) * 140
                        return `${x},${y}`
                      })
                      .join(' ')} 370,160`}
                    fill="url(#carGradient)"
                  />

                  {/* Data points */}
                  {carUsageCount.map((item, idx) => {
                    const x = 50 + (idx * 340) / (carUsageCount.length - 1 || 1)
                    const y = 160 - (item.count / maxCarUsage) * 140
                    return (
                      <g key={idx}>
                        <circle cx={x} cy={y} r="4" fill="var(--color-gold)" />
                        <circle cx={x} cy={y} r="2" fill="var(--bg-secondary)" />
                        <text
                          x={x}
                          y={y - 15}
                          fontSize="11"
                          fill="var(--color-gold)"
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          {item.count}
                        </text>
                        <text
                          x={x}
                          y={180}
                          fontSize="10"
                          fill="var(--text-secondary)"
                          textAnchor="middle"
                          className="truncate"
                        >
                          {item.car}
                        </text>
                      </g>
                    )
                  })}
                </>
              )}
            </svg>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>Sem dados de aluguel este m\u00eas.</p>
          )}
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[var(--bg-secondary)] p-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--color-gold)' }}>
            Fluxo de Serviços
          </h2>

          {serviceCount.length > 0 ? (
            <svg width="100%" height="200" viewBox="0 0 400 200" className="overflow-visible">
              <defs>
                <linearGradient id="serviceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="40" y1="150" x2="380" y2="150" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
              <line x1="40" y1="100" x2="380" y2="100" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
              <line x1="40" y1="50" x2="380" y2="50" stroke="white" strokeOpacity="0.1" strokeWidth="1" />

              {/* Y-axis */}
              <line x1="40" y1="20" x2="40" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="2" />

              {/* X-axis */}
              <line x1="40" y1="160" x2="380" y2="160" stroke="white" strokeOpacity="0.2" strokeWidth="2" />

              {/* Y-axis labels */}
              <text x="35" y="165" fontSize="10" fill="var(--text-secondary)" textAnchor="end">
                0
              </text>
              <text x="35" y="107" fontSize="10" fill="var(--text-secondary)" textAnchor="end">
                {Math.ceil(maxServiceCount / 2)}
              </text>
              <text x="35" y="57" fontSize="10" fill="var(--text-secondary)" textAnchor="end">
                {maxServiceCount}
              </text>

              {/* Line path */}
              {serviceCount.length > 0 && (
                <>
                  <polyline
                    points={serviceCount
                      .map((item, idx) => {
                        const x = 50 + (idx * 340) / (serviceCount.length - 1 || 1)
                        const y = 160 - (item.count / maxServiceCount) * 140
                        return `${x},${y}`
                      })
                      .join(' ')}
                    fill="none"
                    stroke="var(--color-gold)"
                    strokeWidth="2"
                  />

                  {/* Area under line */}
                  <polygon
                    points={`50,160 ${serviceCount
                      .map((item, idx) => {
                        const x = 50 + (idx * 340) / (serviceCount.length - 1 || 1)
                        const y = 160 - (item.count / maxServiceCount) * 140
                        return `${x},${y}`
                      })
                      .join(' ')} 370,160`}
                    fill="url(#serviceGradient)"
                  />

                  {/* Data points */}
                  {serviceCount.map((item, idx) => {
                    const x = 50 + (idx * 340) / (serviceCount.length - 1 || 1)
                    const y = 160 - (item.count / maxServiceCount) * 140
                    return (
                      <g key={idx}>
                        <circle cx={x} cy={y} r="4" fill="var(--color-gold)" />
                        <circle cx={x} cy={y} r="2" fill="var(--bg-secondary)" />
                        <text
                          x={x}
                          y={y - 15}
                          fontSize="11"
                          fill="var(--color-gold)"
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          {item.count}
                        </text>
                        <text
                          x={x}
                          y={180}
                          fontSize="10"
                          fill="var(--text-secondary)"
                          textAnchor="middle"
                          className="truncate"
                        >
                          {item.type.substring(0, 12)}
                        </text>
                      </g>
                    )
                  })}
                </>
              )}
            </svg>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>Sem dados de servi\u00e7os este m\u00eas.</p>
          )}
        </section>
      </div>
    </div>
  )
}

export default Home
