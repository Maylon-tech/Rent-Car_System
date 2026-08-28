
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useAuth } from '../../context/AuthContext'

const loginSchema = z.object({
  email: z.string().trim().email('Informe um e-mail válido.'),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres.')
    .max(15, 'A senha deve ter no máximo 15 caracteres.'),
})

const Login = () => {
  const navigate = useNavigate()
  const { login, error: authError } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password)
      navigate('/')
    } catch {
      // error handled by context
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-sm ">
        <img
          src="/Logo-01.jpg"
          alt="Rent Cars logo"
          className="h-32 w-32 mb-4 rounded-full border-2 border-[var(--color-darkblue)] object-cover mx-auto"
        />
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold text-white">Entrar no sistema</h2>
          <p className="mt-2 text-sm text-slate-300">Bem Vindo ao sistema RentCar.</p>
        </div>

        {authError && <p className="mb-4 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{authError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-amber-400"
              {...register('email')}
            />
            {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              className="w-full rounded-lg border border-slate-600 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-amber-400"
              {...register('password')}
            />
            {errors.password && <p className="mt-1 text-sm text-red-300">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-amber-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-300">
          Ainda não tem conta?{' '}
          <Link to="/register" className="font-medium text-amber-400 transition hover:text-amber-300">
            Cadastrar-se
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
