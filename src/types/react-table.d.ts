import { ColumnMeta, RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterKey?: keyof TData
    filterVariant?: 'text' | 'number'
  }
}
