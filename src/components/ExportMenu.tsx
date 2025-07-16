import { Menu, Button } from '@mantine/core';
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

interface ExportColumn<T> {
  key: keyof T;
  label: string;
}

interface ExportMenuProps<T> {
  title: string;
  columns: ExportColumn<T>[];
  data: T[];
}

export function ExportMenu<T>({ title, columns, data }: ExportMenuProps<T>) {
  const exportToCSV = () => {
    const rows = data.map(row => {
      const obj: Record<string, string> = {};
      columns.forEach(col => {
        obj[col.label] = String(row[col.key] ?? '');
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    const blob = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    saveAs(new Blob([blob]), `${title}.csv`);
  };

  const exportToExcel = () => {
    const rows = data.map(row => {
      const obj: Record<string, string> = {};
      columns.forEach(col => {
        obj[col.label] = String(row[col.key] ?? '');
      });
      return obj;
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    const blob = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([blob]), `${title}.xlsx`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [columns.map(col => col.label)],
      body: data.map(row => columns.map(col => String(row[col.key] ?? ''))),
    });
    doc.save(`${title}.pdf`);
  };

  return (
    <Menu shadow="md" width={180} position="bottom-end" withinPortal>
      <Menu.Target>
        <Button variant="light" leftSection={<IconDownload size={16} />}>
          Export
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconFileTypeCsv size={16} />} onClick={exportToCSV}>
          Export as CSV
        </Menu.Item>
        <Menu.Item leftSection={<IconFileSpreadsheet size={16} />} onClick={exportToExcel}>
          Export as Excel
        </Menu.Item>
        <Menu.Item leftSection={<IconFileTypePdf size={16} />} onClick={exportToPDF}>
          Export as PDF
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
