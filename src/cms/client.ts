import config from '@payload-config'
import { getPayload } from 'payload'

export const getCms = () => getPayload({ config })
