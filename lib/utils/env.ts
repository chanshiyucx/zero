export const isClientSide = typeof window !== 'undefined'
export const isServerSide = !isClientSide
