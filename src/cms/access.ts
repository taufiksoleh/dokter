import type { Access } from 'payload'

export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

/** Pengunjung hanya melihat yang sudah terbit, pengelola melihat semuanya termasuk draf. */
export const publishedOrLoggedIn: Access = ({ req }) =>
  req.user ? true : { _status: { equals: 'published' } }
