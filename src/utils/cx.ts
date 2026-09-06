type ClassValue = string | false | null | undefined

/** Склеивает классы, отбрасывая пустые — мини-замена clsx. */
export const cx = (...values: ClassValue[]): string => values.filter(Boolean).join(' ')
