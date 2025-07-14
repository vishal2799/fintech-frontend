// import { createColumnHelper } from '@tanstack/react-table';
// import type { ColumnDef } from '@tanstack/react-table';

// export type Tenant = {
//   id: string;
//   name: string;
//   slug: string;
//   status: 'ACTIVE' | 'INACTIVE' | undefined;
// };

// const columnHelper = createColumnHelper<Tenant>();

// export const tenantColumns: ColumnDef<Tenant>[] = [
//   columnHelper.accessor('name', {
//     header: () => 'Name',
//     cell: info => info.getValue(),
//     id: 'name',
//   }),
//   columnHelper.accessor('slug', {
//     header: () => 'Slug',
//     cell: info => info.getValue(),
//     id: 'slug',
//   }),
//   columnHelper.accessor('status', {
//     header: () => 'Status',
//     cell: info => {
//       const value = info.getValue();
//       const isActive = value === 'ACTIVE';

//       return (
//         <span
//           className={`px-2 py-1 text-xs font-semibold rounded ${
//             isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//           }`}
//         >
//           {value}
//         </span>
//       );
//     },
//     id: 'status',
//   }),
// ];
