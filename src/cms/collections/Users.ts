import type { CollectionConfig } from 'payload'
import { isLoggedIn } from '../access'

const MAX_LOGIN_ATTEMPTS = 5
const LOCK_MINUTES = 15

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Pengelola', plural: 'Pengelola' },
  // Akun dikunci sementara setelah beberapa kali salah kata sandi.
  auth: { maxLoginAttempts: MAX_LOGIN_ATTEMPTS, lockTime: LOCK_MINUTES * 60 * 1000 },
  admin: { group: 'Pengaturan', useAsTitle: 'email', defaultColumns: ['name', 'email'] },
  access: { read: isLoggedIn, create: isLoggedIn, update: isLoggedIn, delete: isLoggedIn },
  fields: [{ name: 'name', label: 'Nama', type: 'text', required: true }],
}
