import { useSearchParams } from 'react-router'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../components/ServerTable2'

export function useTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = {
    pageIndex: parseInt(searchParams.get('pageIndex') || `${DEFAULT_PAGE_INDEX}`, 10),
    pageSize: parseInt(searchParams.get('pageSize') || `${DEFAULT_PAGE_SIZE}`, 10),
    sortBy: searchParams.get('sortBy') ?? undefined,
    search: searchParams.get('search') ?? '',
  }

  const setFilters = (updates: Partial<typeof filters>) => {
    const newParams = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === '' || Number.isNaN(value)) {
        newParams.delete(key)
      } else {
        newParams.set(key, String(value))
      }
    })

    setSearchParams(newParams, { replace: true })
  }

  const resetFilters = () => {
    setSearchParams({})
  }

  return { filters, setFilters, resetFilters }
}
