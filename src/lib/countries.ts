import type {Option} from 'payload'

export const countryOptions = [
  { label: 'Ukraine', value: 'UA' },
  { label: 'Germany', value: 'GE' },
  { label: 'USA', value: 'US' },
  { label: 'Canada', value: 'CN' },
  { label: 'Netherlands', value: 'NL' },
] satisfies Option[]

export type CountryType = (typeof countryOptions)[number]['value']