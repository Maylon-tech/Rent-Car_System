const DataTable = ({ columns, data }) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-white/10 bg-[var(--color-darkblue-soft)]">
      <table className="w-full border-collapse text-left">
        <thead className="bg-[var(--color-gold)] text-[var(--color-darkblue)]">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 text-sm font-bold">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 text-[var(--color-white)]">
          {data.map((item) => (
            <tr key={item.id} className="transition-colors hover:bg-white/5">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-sm">
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
