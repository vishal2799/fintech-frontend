import {
  Menu,
  Button,
} from '@mantine/core';
import {
  IconDownload,
  IconFileSpreadsheet,
  IconFileTypeCsv,
  IconFileTypePdf,
} from '@tabler/icons-react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface ExportColumn<T> {
  key: keyof T
  label: string
  renderExport?: (row: T) => string
}


interface ExportMenuProps<T> {
  title: string
  columns: ExportColumn<T>[]
  data: T[]
  onExportAll?: () => Promise<T[]>
  onExportFiltered?: () => Promise<T[]>
}

export function ExportMenu<T>({
  title,
  columns,
  data,
  onExportAll,
  onExportFiltered,
}: ExportMenuProps<T>) {
  const getExportRows = (rows: T[]) =>
    rows.map(row => {
      const obj: Record<string, string> = {}
      columns.forEach(col => {
        obj[col.label] = col.renderExport
          ? col.renderExport(row)
          : String(row[col.key] ?? '')
      })
      return obj
    })

  const exportCSV = (rows: T[], fileName: string) => {
    const worksheet = XLSX.utils.json_to_sheet(getExportRows(rows))
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName)
    const blob = XLSX.write(workbook, { bookType: 'csv', type: 'array' })
    saveAs(new Blob([blob]), `${fileName}.csv`)
  }

  const exportExcel = (rows: T[], fileName: string) => {
    const worksheet = XLSX.utils.json_to_sheet(getExportRows(rows))
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName)
    const blob = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    saveAs(new Blob([blob]), `${fileName}.xlsx`)
  }

  const exportPDF = (rows: T[], fileName: string) => {
    const doc = new jsPDF()
    autoTable(doc, {
      head: [columns.map(col => col.label)],
      body: rows.map(row =>
        columns.map(col =>
          col.renderExport ? col.renderExport(row) : String(row[col.key] ?? '')
        )
      ),
    })
    doc.save(`${fileName}.pdf`)
  }

  const handleExport = async (
    type: 'csv' | 'excel' | 'pdf',
    fetchRows: () => Promise<T[]>,
    label: string
  ) => {
    const rows = await fetchRows()
    const fileName = `${title}-${label}`
    if (type === 'csv') exportCSV(rows, fileName)
    if (type === 'excel') exportExcel(rows, fileName)
    if (type === 'pdf') exportPDF(rows, fileName)
  }

  return (
    <Menu shadow="md" width={220} position="bottom-end" withinPortal>
      <Menu.Target>
        <Button variant="light" leftSection={<IconDownload size={16} />}>
          Export
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Current Page</Menu.Label>
        <Menu.Item
          onClick={() => handleExport('csv', () => Promise.resolve(data), 'current-page')}
          leftSection={<IconFileTypeCsv size={16} />}
        >
          CSV
        </Menu.Item>
        <Menu.Item
          onClick={() => handleExport('excel', () => Promise.resolve(data), 'current-page')}
          leftSection={<IconFileSpreadsheet size={16} />}
        >
          Excel
        </Menu.Item>
        <Menu.Item
          onClick={() => handleExport('pdf', () => Promise.resolve(data), 'current-page')}
          leftSection={<IconFileTypePdf size={16} />}
        >
          PDF
        </Menu.Item>

        {(onExportFiltered || onExportAll) && <Menu.Divider />}

        {onExportFiltered && (
          <>
            <Menu.Label>Filtered</Menu.Label>
            <Menu.Item
              onClick={() => handleExport('csv', onExportFiltered, 'filtered')}
              leftSection={<IconFileTypeCsv size={16} />}
            >
              CSV
            </Menu.Item>
            <Menu.Item
              onClick={() => handleExport('excel', onExportFiltered, 'filtered')}
              leftSection={<IconFileSpreadsheet size={16} />}
            >
              Excel
            </Menu.Item>
            <Menu.Item
              onClick={() => handleExport('pdf', onExportFiltered, 'filtered')}
              leftSection={<IconFileTypePdf size={16} />}
            >
              PDF
            </Menu.Item>
          </>
        )}

        {onExportAll && (
          <>
            <Menu.Label>All Data</Menu.Label>
            <Menu.Item
              onClick={() => handleExport('csv', onExportAll, 'all')}
              leftSection={<IconFileTypeCsv size={16} />}
            >
              CSV
            </Menu.Item>
            <Menu.Item
              onClick={() => handleExport('excel', onExportAll, 'all')}
              leftSection={<IconFileSpreadsheet size={16} />}
            >
              Excel
            </Menu.Item>
            <Menu.Item
              onClick={() => handleExport('pdf', onExportAll, 'all')}
              leftSection={<IconFileTypePdf size={16} />}
            >
              PDF
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  )
}
