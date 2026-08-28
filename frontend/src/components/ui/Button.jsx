const Button = ({ children, className = '', variant = 'primary', ...props }) => {
  const variants = {
    primary:
      'bg-[var(--color-gold)] text-[var(--color-darkblue)] hover:bg-[var(--color-gold-soft)]',
    secondary:
      'border border-[var(--color-gold)] bg-transparent text-[var(--color-gold)] hover:bg-[var(--color-darkblue-soft)]',
  }

  return (
    <button
      type="button"
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
