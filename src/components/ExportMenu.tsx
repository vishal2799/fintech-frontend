import {
  Button,
  Modal,
  Select,
  Group,
  Stack,
} from '@mantine/core';
import {
  IconDownload,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useState } from 'react';

export type ExportColumn<T> = {
  key: keyof T;
  label: string;
  renderExport?: (row: T) => string;
};

interface ExportMenuProps<T> {
  title: string;
  columns: ExportColumn<T>[];
  data: T[]; // filtered data
  currentPageData: T[];
  allData?: T[]; // optional full dataset
}

export function ExportMenu<T>({
  title,
  columns,
  data,
  currentPageData,
  allData,
}: ExportMenuProps<T>) {
  const [opened, { open, close }] = useDisclosure(false);

  const [scope, setScope] = useState<'current' | 'filtered' | 'all'>('current');
  const [format, setFormat] = useState<'csv' | 'excel' | 'pdf'>('csv');

  const getExportData = () => {
    if (scope === 'all' && allData) return allData;
    if (scope === 'filtered') return data;
    return currentPageData;
  };

  const generateRows = () => {
    return getExportData().map(row => {
      const obj: Record<string, string> = {};
      columns.forEach(col => {
        obj[col.label] = col.renderExport
          ? col.renderExport(row)
          : String(row[col.key] ?? '');
      });
      return obj;
    });
  };

  const exportToCSV = () => {
    const rows = generateRows();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title);
    const blob = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    saveAs(new Blob([blob]), `${title}.csv`);
  };

  const exportToExcel = () => {
    const rows = generateRows();
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
      body: getExportData().map(row =>
        columns.map(col =>
          col.renderExport ? col.renderExport(row) : String(row[col.key] ?? '')
        )
      ),
    });
    doc.save(`${title}.pdf`);
  };

  const handleExport = () => {
    if (format === 'csv') exportToCSV();
    else if (format === 'excel') exportToExcel();
    else exportToPDF();
    close();
  };

  return (
    <>
      <Button onClick={open} variant="light" leftSection={<IconDownload size={16} />}>
        Export
      </Button>

      <Modal opened={opened} onClose={close} title="Export Options" centered>
        <Stack>
          <Select
            label="Data Scope"
            value={scope}
            onChange={value => setScope(value as any)}
            data={[
              { value: 'current', label: 'Current Page' },
              { value: 'filtered', label: 'Filtered Data' },
              ...(allData ? [{ value: 'all', label: 'All Data' }] : []),
            ]}
          />

          <Select
            label="Export Format"
            value={format}
            onChange={value => setFormat(value as any)}
            
            data={[
              { value: 'csv', label: 'CSV' },
              { value: 'excel', label: 'Excel' },
              { value: 'pdf', label: 'PDF' },
            ]}
          />

          <Group justify="flex-end" mt="md">
            <Button onClick={handleExport}>Download</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}


// import { Menu, Button } from '@mantine/core';
// import {
//   IconDownload,
//   IconFileSpreadsheet,
//   IconFileTypeCsv,
//   IconFileTypePdf,
// } from '@tabler/icons-react';
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// export type ExportScope = 'current' | 'filtered' | 'all';

// export interface ExportColumn<T> {
//   key: keyof T;
//   label: string;
//   renderExport?: (row: T) => string;
// }

// interface ExportMenuProps<T> {
//   title: string;
//   columns: ExportColumn<T>[];
//   currentPageData: T[];
//   filteredData: T[];
//   allData: T[];
// }

// export function ExportMenu<T>({
//   title,
//   columns,
//   currentPageData,
//   filteredData,
//   allData,
// }: ExportMenuProps<T>) {
//   const getData = async (scope: ExportScope): Promise<T[]> => {
//     if (scope === 'all') {
//       if (!allData) {
//         console.warn('No allDataFetcher provided');
//         return [];
//       }
//       return allData;
//     }
//     return scope === 'current' ? currentPageData : filteredData;
//   };

//   const exportData = async (type: 'csv' | 'xlsx' | 'pdf', scope: ExportScope) => {
//     const data = await getData(scope);
//     const rows = data.map(row => {
//       const obj: Record<string, string> = {};
//       columns.forEach(col => {
//         obj[col.label] = col.renderExport
//           ? col.renderExport(row)
//           : String(row[col.key] ?? '');
//       });
//       return obj;
//     });

//     const fileName = `${title}-${scope}`;

//     if (type === 'csv' || type === 'xlsx') {
//       const worksheet = XLSX.utils.json_to_sheet(rows);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, title);
//       const bookType = type === 'csv' ? 'csv' : 'xlsx';
//       const blob = XLSX.write(workbook, { bookType, type: 'array' });
//       saveAs(new Blob([blob]), `${fileName}.${bookType}`);
//     }

//     if (type === 'pdf') {
//       const doc = new jsPDF();
//       autoTable(doc, {
//         head: [columns.map(col => col.label)],
//         body: data.map(row =>
//           columns.map(col =>
//             col.renderExport ? col.renderExport(row) : String(row[col.key] ?? '')
//           )
//         ),
//       });
//       doc.save(`${fileName}.pdf`);
//     }
//   };

//   const renderExportOptions = (type: 'csv' | 'xlsx' | 'pdf', icon: React.ReactNode, label: string) => (
//     <Menu trigger="hover" withinPortal>
//       <Menu.Target>
//         <Menu.Item leftSection={icon}>{label}</Menu.Item>
//       </Menu.Target>
//       <Menu.Dropdown>
//         <Menu.Item onClick={() => exportData(type, 'current')}>→ Current Page</Menu.Item>
//         <Menu.Item onClick={() => exportData(type, 'filtered')}>→ Filtered Data</Menu.Item>
//         {allData && <Menu.Item onClick={() => exportData(type, 'all')}>→ All Data</Menu.Item>}
//       </Menu.Dropdown>
//     </Menu>
//   );

//   return (
//     <Menu shadow="md" width={200} position="bottom-end" withinPortal>
//       <Menu.Target>
//         <Button variant="light" leftSection={<IconDownload size={16} />}>
//           Export
//         </Button>
//       </Menu.Target>
//       <Menu.Dropdown>
//         {renderExportOptions('csv', <IconFileTypeCsv size={16} />, 'Export as CSV')}
//         {renderExportOptions('xlsx', <IconFileSpreadsheet size={16} />, 'Export as Excel')}
//         {renderExportOptions('pdf', <IconFileTypePdf size={16} />, 'Export as PDF')}
//       </Menu.Dropdown>
//     </Menu>
//   );
// }


// import { Menu, Button } from '@mantine/core';
// import {
//   IconDownload,
//   IconFileSpreadsheet,
//   IconFileTypeCsv,
//   IconFileTypePdf,
// } from '@tabler/icons-react';
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// interface ExportColumn<T> {
//   key: keyof T;
//   label: string;
//   renderExport?: (row: T) => string;
// }

// interface ExportMenuProps<T> {
//   title: string;
//   columns: ExportColumn<T>[];
//   data: T[];
// }

// export function ExportMenu<T>({ title, columns, data }: ExportMenuProps<T>) {
//   const exportToCSV = () => {
//     const rows = data.map(row => {
//       const obj: Record<string, string> = {};
//       columns.forEach(col => {
//         obj[col.label] = col.renderExport
//   ? col.renderExport(row)
//   : String(row[col.key] ?? '');
//       });
//       return obj;
//     });

//     const worksheet = XLSX.utils.json_to_sheet(rows);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, title);
//     const blob = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
//     saveAs(new Blob([blob]), `${title}.csv`);
//   };

//   const exportToExcel = () => {
//     const rows = data.map(row => {
//       const obj: Record<string, string> = {};
//       columns.forEach(col => {
//         obj[col.label] = col.renderExport
//   ? col.renderExport(row)
//   : String(row[col.key] ?? '');
//       });
//       return obj;
//     });

//     const worksheet = XLSX.utils.json_to_sheet(rows);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, title);
//     const blob = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     saveAs(new Blob([blob]), `${title}.xlsx`);
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     autoTable(doc, {
//       head: [columns.map(col => col.label)],
//       body: data.map(row =>
//   columns.map(col =>
//     col.renderExport ? col.renderExport(row) : String(row[col.key] ?? '')
//   )
// ),
//     });
//     doc.save(`${title}.pdf`);
//   };

//   return (
//     <Menu shadow="md" width={180} position="bottom-end" withinPortal>
//       <Menu.Target>
//         <Button variant="light" leftSection={<IconDownload size={16} />}>
//           Export
//         </Button>
//       </Menu.Target>
//       <Menu.Dropdown>
//         <Menu.Item leftSection={<IconFileTypeCsv size={16} />} onClick={exportToCSV}>
//           Export as CSV
//         </Menu.Item>
//         <Menu.Item leftSection={<IconFileSpreadsheet size={16} />} onClick={exportToExcel}>
//           Export as Excel
//         </Menu.Item>
//         <Menu.Item leftSection={<IconFileTypePdf size={16} />} onClick={exportToPDF}>
//           Export as PDF
//         </Menu.Item>
//       </Menu.Dropdown>
//     </Menu>
//   );
// }
