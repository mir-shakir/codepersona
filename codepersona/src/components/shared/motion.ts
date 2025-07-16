'use client'

/**
 * This file re-exports the 'motion' component from 'framer-motion'.
 * By creating this "barrel" file with the "use client" directive,
 * we ensure that the framer-motion library is only bundled on the client,
 * resolving the "export *" build error in Next.js App Router.
 *
 * Import 'motion' from this file in your client components instead of directly
 * from 'framer-motion'.
 *
 * @example
 * import { motion } from '@/components/shared/motion';
 */
export { motion } from 'framer-motion'
