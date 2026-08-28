import { useContext } from 'react'
import { AppDataContext } from './appDataStore'

export const useAppData = () => useContext(AppDataContext)
