import { createBrowserRouter, RouterProvider } from "react-router";
import { usePortal } from "../context/PortalContext";
// import Unauthorized from "../portals/common/pages/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute";
import DynamicLayout from "../layouts/DynamicLayout";
import Login from "../portals/common/pages/Login";
import VerifyOtp from "../portals/common/pages/VerifyOtp";
import SuperDistributorListPage from "../portals/wl-admin/pages/SuperDistributorListPage";
import SuperDistributorFormPage from "../portals/wl-admin/pages/SuperDistributorFormPage";
import DistributorListPage from "../portals/wl-admin/pages/DistributorListPage";
import DistributorFormPage from "../portals/wl-admin/pages/DistributorFormPage";
import RetailerListPage from "../portals/wl-admin/pages/RetailerListPage";
import RetailerFormPage from "../portals/wl-admin/pages/RetailerFormPage";
import CreditRequestListPage from "../portals/wl-admin/pages/CreditRequestsList";
import CreditRequestFormPage from "../portals/wl-admin/pages/CreditRequestFormPage";
import WalletPage from "../portals/wl-admin/pages/WalletPage";
import WLServiceSettingsPage from "../portals/wl-admin/pages/WLServiceSettingsPage";
import { TenantDefaultRedirect } from "../components/TenantDefaultRedirect";
import DistributorListPage2 from "../portals/super-distributor/pages/DistributorListPage";
import DistributorFormPage2 from "../portals/super-distributor/pages/DistributorFormPage";
import RetailerListPage2 from "../portals/distributor/pages/RetailerListPage";
import RetailerFormPage2 from "../portals/distributor/pages/RetailerFormPage";
import RetailerListPageSD from "../portals/super-distributor/pages/RetailerListPage";
import RetailerFormPageSD from "../portals/super-distributor/pages/RetailerFormPage";
import RoleListPageWL from "../portals/wl-admin/pages/RolesListPage";
import RoleFormPageWL from "../portals/wl-admin/pages/RoleFormPage";
import EmployeeListPageWL from "../portals/wl-admin/pages/EmployeeListPage";
import EmployeeFormPageWL from "../portals/wl-admin/pages/EmployeeFormPage";
import BankAccountsListPage from "../portals/super-admin/pages/BankAccountsListPage";
import BankAccountFormPage from "../portals/super-admin/pages/BankAccountFormPage";
import TenantAuditLogsPage from "../portals/wl-admin/pages/AuditLogs";
import CreditRequestFormPageRetailer from "../portals/retailer/pages/CreditRequestPage";
import CreditRequestListPageRetailer from "../portals/retailer/pages/CreditRequestList";
import RetailerLedger from "../portals/retailer/pages/RetailerLedger";
import CreditRequestListPageWL from "../portals/wl-admin/pages/InternalWLCreditRequestsPage";
import InternalPendingCreditRequestListPageWL from "../portals/wl-admin/pages/InternalWLPendingCreditRequests";
// import TicketListPage from "../portals/retailer/pages/TicketListPage";
// import CreateTicketPage from "../portals/retailer/pages/CreateTicketPage";
// import TicketDetailPage from "../portals/retailer/pages/TicketDetailsPage";
// import DistributorTicketDetail from "../portals/distributor/pages/TicketDetailsPage";
// import DistributorTicketTable from "../portals/distributor/pages/TicketListPage";

// const getTenantRouter = (basename: string) =>
//   createBrowserRouter(
//     [
//       { path: "/admin/login", element: <Login /> },
//       { path: "/admin/verify-otp", element: <VerifyOtp /> },
//       { path: "/retailer/login", element: <Login /> },
//       { path: "/retailer/verify-otp", element: <VerifyOtp /> },
//       { path: "/distributor/login", element: <Login /> },
//       { path: "/distributor/verify-otp", element: <VerifyOtp /> },
//       { path: "/unauthorized", element: <Unauthorized /> },

//       {
//         path: "/admin",
//         element: (
//           <ProtectedRoute allowedRoles={['WL_ADMIN']}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Admin Dashboard</div> },
//           {
//             path: "super-distributors",
//             children: [
//               { path: "list", element: <SuperDistributorListPage /> },
//               { path: "create", element: <SuperDistributorFormPage /> },
//               { path: "edit/:id", element: <SuperDistributorFormPage /> },
//             ],
//           },
//           {
//             path: "distributors",
//             children: [
//               { path: "list", element: <DistributorListPage /> },
//               { path: "create", element: <DistributorFormPage /> },
//               { path: "edit/:id", element: <DistributorFormPage /> },
//             ],
//           },
//           {
//             path: "retailers",
//             children: [
//               { path: "list", element: <RetailerListPage /> },
//               { path: "create", element: <RetailerFormPage /> },
//               { path: "edit/:id", element: <RetailerFormPage /> },
//             ],
//           },
//           {
//             path: "wallet",
//             children: [
//               { path: "credit-requests", element: <CreditRequestListPage /> },
//               { path: "add-fund", element: <CreditRequestFormPage /> },
//               { path: "ledger", element: <WalletPage /> },
//             ],
//           },
//           {
//             path: "services",
//             children: [
//               { path: "portal-services", element: <WLServiceSettingsPage /> },
//             ],
//           },
//         ],
//       },
//       {
//         path: "/retailer",
//         element: (
//           <ProtectedRoute allowedRoles={['R', 'SD', 'D', 'EMPLOYEE']}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Retailer Dashboard</div> },
//           {
//             path: "support-ticket",
//             children: [
//               { path: "list", element: <TicketListPage /> },
//               { path: "create", element: <CreateTicketPage /> },
//               { path: "list/:id", element: <TicketDetailPage /> },
//             ],
//           },
//         ],
//       },
//       {
//         path: "/distributor",
//         element: (
//           <ProtectedRoute allowedRoles={['R', 'SD', 'D', 'EMPLOYEE']}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Distributor Dashboard</div> },
//           {
//             path: "support-ticket",
//             children: [
//               { path: "list", element: <DistributorTicketTable /> },
//               { path: "list/:id", element: <DistributorTicketDetail /> },
//             ],
//           },
//         ],
//       },
//       {
//         path: "*",
//         element: <div>Not Found</div>,
//       },
//     ],
//     { basename }
//   );

  // You can dynamically get "wl1" from the URL if needed
// const pathParts = window.location.pathname.split("/");
// const tenantId = pathParts[2]; // "wl1"
// const basename = `/tenants/${tenantId}`;

export const TenantApp = () => {
  const { basename } = usePortal();

  const router = createBrowserRouter(
    [
      // Public auth routes
      { path: "login", element: <Login /> },
      { path: "verify-otp", element: <VerifyOtp /> },

      { path: "", element: <TenantDefaultRedirect /> },

      // Admin section
      {
        path: "admin",
        element: (
          <ProtectedRoute allowedRoles={["WL_ADMIN"]}>
            <DynamicLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <div>Admin Dashboard</div> },          
          {
            path: "super-distributors",
            children: [
              { path: "list", element: <SuperDistributorListPage /> },
              { path: "create", element: <SuperDistributorFormPage /> },
              { path: "edit/:id", element: <SuperDistributorFormPage /> },
            ],
          },
          {
            path: "distributors",
            children: [
              { path: "list", element: <DistributorListPage /> },
              { path: "create", element: <DistributorFormPage /> },
              { path: "edit/:id", element: <DistributorFormPage /> },
            ],
          },
          {
            path: "retailers",
            children: [
              { path: "list", element: <RetailerListPage /> },
              { path: "create", element: <RetailerFormPage /> },
              { path: "edit/:id", element: <RetailerFormPage /> },
            ],
          },
          {
            path: "wallet",
            children: [
              { path: "credit-requests", element: <CreditRequestListPage /> },
              { path: "add-fund", element: <CreditRequestFormPage /> },
              { path: "ledger", element: <WalletPage /> },
            ],
          },
          {
            path: "internal-wallet",
            children: [
              { path: "pending-credit-requests", element: <InternalPendingCreditRequestListPageWL /> },
              { path: "credit-requests", element: <CreditRequestListPageWL /> },
            ]
          },
          {
            path: "services",
            children: [
              { path: "portal-services", element: <WLServiceSettingsPage /> },
            ],
          },
          {path: 'roles', 
            children: [
                       {path: "list", element: <RoleListPageWL /> },
                     { path: "create", element: <RoleFormPageWL /> },
                      { path: "edit/:id", element: <RoleFormPageWL /> },
          ]},
           {path: 'employees', children: [
                        {path: "list", element: <EmployeeListPageWL /> },
                     { path: "create", element: <EmployeeFormPageWL /> },
                      { path: "edit/:id", element: <EmployeeFormPageWL /> },
                ]},
           {
                   path: 'settings', children: [
                     {path: 'banks', element: <BankAccountsListPage />},
                     {path: 'add-bank', element: <BankAccountFormPage />},
                     {path: 'edit-bank/:id', element: <BankAccountFormPage />}
                   ]
                 },
                 { path: "logs", element: <TenantAuditLogsPage /> },
                 {path: "profile", element: <div>KYC Management: Oversee the KYC verification process of all users (especially
Retailers). The WL Admin can see all pending KYC submissions, verify documents,
approve or reject KYC applications, or escalate issues to compliance team.</div>},
{
  path: "report", element: <div>Reports: Comprehensive reports accessible to WL Admin (see Reporting section
below for details).</div>
},
{
  path: "commissions", element: <div>• Commission & Commercials Setup: Define default commission rates or fees for each
service at each level (Super Distributor, Distributor, Retailer). For example, for a
particular service, the Super Distributor gets 1%, Distributor 0.5%, Retailer 0.5%. Or
define fixed fee per transaction. This should be flexible, including tiered commissions
or slabs if needed (e.g., different commission for different volume of transactions). The
commissions should be complaint with GST and TDS Laws.<br/>
• Custom Commercials: Ability to override the default commission for a specific
partner. For instance, Retailer ABC can be given a special commission rate for money
transfers, higher than the default, as an incentive. The system should allow these
exceptions and ensure calculations pick the correct values.</div>
},
{
  path: "support-ticket", element: <div>Ticket Oversight: The WL Admin can see all support tickets, even those handled by
employees, to ensure SLA compliance on responses.</div>
},
                 {
                  path: 'scope', element: <div><p>
                    White Label Admin Module: (This is the top-level administrative interface for the
company using the portal as SaaS.) The WL Admin should have full control over the WL
system.<br/>
Features include:<br/>
• User Management: Create, read, update, delete (CRUD) for all lower-tier users: Super
Distributors, Distributors, Retailers, and internal Employees. Assign these users to
hierarchy as needed (e.g., a Distributor is under a particular Super Distributor, etc.).
Reset passwords or unlock accounts.<br/>
• KYC Management: Oversee the KYC verification process of all users (especially
Retailers). The WL Admin can see all pending KYC submissions, verify documents,
approve or reject KYC applications, or escalate issues to compliance team.<br/>
• Service Configuration: Enable/disable specific services or products in the portal, e.g.,
enabling domestic money transfer, bill pay, etc., depending on regulatory compliance
or business strategy.<br/>
• Commission & Commercials Setup: Define default commission rates or fees for each
service at each level (Super Distributor, Distributor, Retailer). For example, for a
particular service, the Super Distributor gets 1%, Distributor 0.5%, Retailer 0.5%. Or
define fixed fee per transaction. This should be flexible, including tiered commissions
or slabs if needed (e.g., different commission for different volume of transactions). The
commissions should be complaint with GST and TDS Laws.<br/>
• Custom Commercials: Ability to override the default commission for a specific
partner. For instance, Retailer ABC can be given a special commission rate for money
transfers, higher than the default, as an incentive. The system should allow these
exceptions and ensure calculations pick the correct values.<br/>
• Transaction Monitoring: Real-time view of transactions happening in the system, with
filters by date, type, status, user, etc. For security and support, WL Admin can drill
down into a particular transaction’s details (amount, time, status, any error codes).<br/>
• Hold/Unhold Funds: If a Distributor is doing suspicious activity or exceeds risk
thresholds, the Super Distributor might want to hold their ability to use funds (freeze).
The module allows to put a hold on some amount or the entire balance of a Distributor
or Retailer in their network. Unhold releases it. (This ensures risk control; e.g., if a
retailer should not use ₹5000 of their ₹10000 balance, hold ₹5000.)• Approve
Holds/Adjust Balance: If a distributor requests additional credit or to hold funds of a
retailer (explained later), the WL Admin might have to approve or effectuate these
changes. Also, manage any global limits on credit.<br/>
• System Configuration: Manage settings like portal announcements (notices shown to
all users), content management for certain pages, FAQ entries, support contact info,
etc.<br/>
• Audit Logs: Every action by WL Admin or any admin needs to be logged (who did what
and when, like changing commissions, editing user details), for audit and compliance.<br/>
• Reports: Comprehensive reports accessible to WL Admin (see Reporting section
below for details).<br/>
• Ticket Oversight: The Super Admin can see all support tickets, even those handled by
employees, to ensure SLA compliance on responses.
                    </p></div>
                 }       
        ],
      },

      // Super Distributor section
      {
        path: "super-distributor",
        element: (
          <ProtectedRoute allowedRoles={["SD"]}>
            <DynamicLayout />
          </ProtectedRoute>
        ),
        children: [
          {index: true, element: <div><strong>Super Distributor Dashboard</strong></div>},
          { path: "scope", element: <div><p>Super Distributor Module: (This user is a high-level business partner, managing a
network of Distributors and Retailers.)<br/>
• Dashboard: A summary view of their downline performance: total number of
distributors, retailers, last login info, today’s transactions volume, earnings
(commission) summary, pending KYC of downline, etc.<br/>
• Distributor Management: Can onboard new Distributors under them (enter their
details to create account, perhaps subject to approval by WL Admin). View list of their
distributors and key info. Reset distributor credentials if needed, or request KYC for
them.<br/>
• Retailer Management: Possibly the Super Distributor can also directly onboard
Retailers under any of their Distributors (or assign a retailer to a distributor).<br/>
• Wallet/Account Management: Each Super Distributor likely has a wallet (ledger)
showing balance of funds they have in the system to allocate to their network. They can
purchase credit from the company (WL Admin) which increases their balance (this
would be offline or via payment). Then they distribute this balance to their Distributors.
They should be able to credit or debit their Distributors’ accounts. For example, when a
Super Distributor gives Rs. 10000 to a Distributor, the Super Distributor’s balance
reduces by that and the Distributor’s increases.<br/>
• Hold/Unhold Funds: If a Distributor is doing suspicious activity or exceeds risk
thresholds, the Super Distributor might want to hold their ability to use funds (freeze).
The module allows to put a hold on some amount or the entire balance of a Distributor
or Retailer in their network. Unhold releases it. (This ensures risk control; e.g., if a
retailer should not use ₹5000 of their ₹10000 balance, hold ₹5000.)<br/>
• Reports: Super Distributor can see consolidated reports for their whole downline or
filtered by each Distributor. This includes transaction statements, commission earned
by each level, etc.<br/>
• KYC: They can see which of their Distributors or Retailers need KYC approval. Perhaps
they do a preliminary check and then forward to WL Admin for final approval (depending
on workflow design).<br/>
• Support Tickets: View tickets raised by their Distributors/Retailers. Possibly they
areexpected to resolve first-level issues from their network, and can escalate to
thecompany’s support if needed. The module might allow adding notes or responses to
tickets.</p></div> },
          {
            path: "distributors",
            children: [
              { path: "list", element: <DistributorListPage2 /> },
              { path: "create", element: <DistributorFormPage2 /> },
              { path: "edit/:id", element: <DistributorFormPage2 /> },
            ],
          },
          {
            path: "retailers",
            children: [
              { path: "list", element: <RetailerListPageSD /> },
              { path: "create", element: <RetailerFormPageSD /> },
              { path: "edit/:id", element: <RetailerFormPageSD /> },
            ],
          },
           {path: "profile", element: <div> KYC: They can see which of their Distributors or Retailers need KYC approval. Perhaps
they do a preliminary check and then forward to WL Admin for final approval (depending
on workflow design).</div>},
{
  path: "wallet", element: <div>Wallet/Account Management: Each Super Distributor likely has a wallet (ledger)
showing balance of funds they have in the system to allocate to their network. They can
purchase credit from the company (WL Admin) which increases their balance (this
would be offline or via payment). Then they distribute this balance to their Distributors.
They should be able to credit or debit their Distributors’ accounts. For example, when a
Super Distributor gives Rs. 10000 to a Distributor, the Super Distributor’s balance
reduces by that and the Distributor’s increases.<br/>
• Hold/Unhold Funds: If a Distributor is doing suspicious activity or exceeds risk
thresholds, the Super Distributor might want to hold their ability to use funds (freeze).
The module allows to put a hold on some amount or the entire balance of a Distributor
or Retailer in their network. Unhold releases it. (This ensures risk control; e.g., if a
retailer should not use ₹5000 of their ₹10000 balance, hold ₹5000.)</div>
},
{
  path: "report", element: <div>Reports: Super Distributor can see consolidated reports for their whole downline or
filtered by each Distributor. This includes transaction statements, commission earned
by each level, etc.</div>
},
{
  path: "support-ticket", element: <div>Support Tickets: View tickets raised by their Distributors/Retailers. Possibly they
areexpected to resolve first-level issues from their network, and can escalate to
thecompany’s support if needed. The module might allow adding notes or responses to
tickets.</div>
}
        ]
      },

      // Retailer section
      {
        path: "retailer",
        element: (
          <ProtectedRoute allowedRoles={["R", "SD", "D", "EMPLOYEE"]}>
            <DynamicLayout />
          </ProtectedRoute>
        ),
        children: [
          {index: true, element: <div>Retailer Dashboard</div>},
          {
            path: "wallet",
            children: [
              { path: "credit-requests", element: <CreditRequestListPageRetailer /> },
              { path: "add-fund", element: <CreditRequestFormPageRetailer /> },
              { path: "ledger", element: <RetailerLedger /> },
            ],
          },
          { path: "scope", element: <div><strong>Retailer Module: (The end agent who serves customers.)</strong><br/><br/><p>• Perform Transactions: This is critical — the retailer’s interface allows them to initiate
various services:<br />
o Domestic Money Transfer: send money to customers’ beneficiaries via IMPS/NEFT;
requires entering details and processing via integrated payment API.<br/>
o Bill Payments: Electricity, gas, etc. via integrated APIs (BBPS likely).<br/>
o Mobile/DTH Recharges: Input number, select plan, integrate with provider API.<br/>
o AEPS (Aadhaar Enabled Payment System): if applicable, the retailer uses a fingerprint
device to allow withdrawals from bank accounts (integration with NPCI’s AEPS via an
API).<br/>
o Other fintech services: The list can include micro-ATM cash withdrawal, insurance
sale, etc., but specifics depend on business and as provided by the Client. For scope
clarity, let’s assume at least money transfer and utility payments.<br/>
• Balance Check: Retailer sees their current balance (this is their prepaid amount with
which they can do transactions; each transaction deducts relevant amount).<br/>
• Add Money Request: Retailer should request their Distributor to top-up their balance
when low (maybe by raising a request in system or just offline).<br/>
• Transaction History: Detailed list of all transactions they did, with status (success,
pending, failed), reference IDs, etc. Should be searchable by date range, type,
customer reference.<br/>
• Receipts: Ability to print or SMS or Whatsapp or email receipts for transactions to
customers as per the facilities and enablement’s done by the Client.<br/>
• Commission View: For each transaction, the retailer sees what commission or fee
they earned (some may be commission, some they might collect fee from customer).<br/>
• Profile/KYC: Retailer can upload their documents for KYC (if initially not fully verified)
and see verification status. They should update their profile details if needed (address,
contact).<br/>
• Support Ticket: Raise support tickets for issues (e.g., a transaction stuck in
processing, customer didn’t get credit, etc.). They can select category (transaction
issue, technical issue, etc.), provide description. They can see responses in the portal.<br/>
• Notification Centre: Any notifications from Distributor or Company (maintenance
downtime announcements, new service launched, etc.).<br/>
• Possibly a simplified UI since retailers might not be highly tech-savvy; emphasis on
easy transaction flows.</p></div> },
          {path: "profile", element: <div>Profile/KYC: Retailer can upload their documents for KYC (if initially not fully verified)
and see verification status. They should update their profile details if needed (address,
contact).</div>},
{
  path: "wallet", element: <div>Wallet Management - • Balance Check: Retailer sees their current balance (this is their prepaid amount with
which they can do transactions; each transaction deducts relevant amount).
• Add Money Request: Retailer should request their Distributor to top-up their balance
when low (maybe by raising a request in system or just offline).</div>
},
{
  path: "transactions", element: <div>Transaction History: Detailed list of all transactions they did, with status (success,
pending, failed), reference IDs, etc. Should be searchable by date range, type,
customer reference.</div>
},
{
  path: "commissions", element: <div>Commission View: For each transaction, the retailer sees what commission or fee
they earned (some may be commission, some they might collect fee from customer).</div>
},
{
  path: "notifications", element: <div>Notification Centre: Any notifications from Distributor or Company (maintenance
downtime announcements, new service launched, etc.).</div>
},
{
  path: "support-ticket", element: <div>Support Ticket: Raise support tickets for issues (e.g., a transaction stuck in
processing, customer didn’t get credit, etc.). They can select category (transaction
issue, technical issue, etc.), provide description. They can see responses in the portal.</div>
}
        ],
      },

      // Distributor section
      {
        path: "distributor",
        element: (
          <ProtectedRoute allowedRoles={["R", "SD", "D", "EMPLOYEE"]}>
            <DynamicLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <div>Distributor Dashboard</div> },
          {
            path: "retailers",
            children: [
              { path: "list", element: <RetailerListPage2 /> },
              { path: "create", element: <RetailerFormPage2 /> },
              { path: "edit/:id", element: <RetailerFormPage2 /> },
            ],
          },
          {path: "profile", element: <div>KYC: Ensure their Retailers have submitted KYC, perhaps do initial verification or
simply remind and track status.</div>},
{
  path: "wallet", element: <div>Wallet Management:<br/> • View and manage their wallet balance: they get balance from Super Distributor, then
allocate to their Retailers.<br/>
• Credit/Debit to Retailers: Increase a retailer’s balance (which decreases distributor’s
own), etc. or withdraw back if retailer pays them back offline.<br/>
• Hold/Unhold Retailer funds: as a risk mechanism at their level.</div>
},
{
  path: "report", element: <div>Reports: See all transactions done by their retailers and by themselves, commissions
earned on each.</div>
},
{
  path: "support-ticket", element: <div>Tickets: Serve as first point for retailer issues; can see tickets from their retailers,
answer them or escalate to Super Distributor/Company.</div>
},
{path: "scope", element: <div><p> Distributor Module: (Mid-level partner, under Super Distributor, above Retailers.)<br/>
• Many features similar to Super Distributor, but scope limited to their network:<br/>
• Onboard/manage their Retailers (create retailer accounts, perhaps pending approval).<br/>
• View and manage their wallet balance: they get balance from Super Distributor, then
allocate to their Retailers.<br/>
• Credit/Debit to Retailers: Increase a retailer’s balance (which decreases distributor’s
own), etc. or withdraw back if retailer pays them back offline.<br/>
• Hold/Unhold Retailer funds: as a risk mechanism at their level.<br/>
• Reports: See all transactions done by their retailers and by themselves, commissions
earned on each.<br/>
• KYC: Ensure their Retailers have submitted KYC, perhaps do initial verification or
simply remind and track status.<br/>
• Dashboard: summary of number of retailers, daily volume, etc.<br/>
• Tickets: Serve as first point for retailer issues; can see tickets from their retailers,
answer them or escalate to Super Distributor/Company.</p></div>}
        ],
      },

      // Fallback
      { path: "*", element: <div>Not Found here</div> },
    ],
    { basename }
  );

  return <RouterProvider router={router} />;
};


// export const TenantApp = () => {
//   const { type, subdomain } = usePortal();
//   const host = window.location.hostname;

//   // const isLocal = window.location.hostname.includes("localhost");

//    // ✅ Feature flag from env (VITE_ENABLE_LOCALHOST_ROUTING=true)
//   const enableLocalRouting = import.meta.env.VITE_ENABLE_LOCALHOST_ROUTING === 'true';

//   // Treat both localhost and "flag-enabled staging" the same way
//   const isLocalLike = host.includes('localhost') || enableLocalRouting;
//   // const isLocal = true;

//   // const basename =
//   //   type !== "superadmin" && isLocal
//   //     ? `/tenants/${subdomain}` // this covers wl1, wl2, etc
//   //     : "/";

//   const basename =
//     type !== "superadmin" && isLocalLike
//       ? `/tenants/${subdomain}` // this covers wl1, wl2, etc
//       : "/";

//   const router = createBrowserRouter(
//     [
//       // Public auth routes
//       { path: "login", element: <Login /> },
//       { path: "verify-otp", element: <VerifyOtp /> },
//       // { path: "retailer/login", element: <Login /> },
//       // { path: "retailer/verify-otp", element: <VerifyOtp /> },
//       // { path: "distributor/login", element: <Login /> },
//       // { path: "distributor/verify-otp", element: <VerifyOtp /> },
//       // { path: "unauthorized", element: <Unauthorized /> },

//       // Admin section
//       {
//         path: "admin",
//         element: (
//           <ProtectedRoute allowedRoles={["WL_ADMIN"]}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Admin Dashboard</div> },
//           {
//             path: "super-distributors",
//             children: [
//               { path: "list", element: <SuperDistributorListPage /> },
//               { path: "create", element: <SuperDistributorFormPage /> },
//               { path: "edit/:id", element: <SuperDistributorFormPage /> },
//             ],
//           },
//           {
//             path: "distributors",
//             children: [
//               { path: "list", element: <DistributorListPage /> },
//               { path: "create", element: <DistributorFormPage /> },
//               { path: "edit/:id", element: <DistributorFormPage /> },
//             ],
//           },
//           {
//             path: "retailers",
//             children: [
//               { path: "list", element: <RetailerListPage /> },
//               { path: "create", element: <RetailerFormPage /> },
//               { path: "edit/:id", element: <RetailerFormPage /> },
//             ],
//           },
//           {
//             path: "wallet",
//             children: [
//               { path: "credit-requests", element: <CreditRequestListPage /> },
//               { path: "add-fund", element: <CreditRequestFormPage /> },
//               { path: "ledger", element: <WalletPage /> },
//             ],
//           },
//           {
//             path: "services",
//             children: [
//               { path: "portal-services", element: <WLServiceSettingsPage /> },
//             ],
//           },
//         ],
//       },

//       // Retailer section
//       {
//         path: "retailer",
//         element: (
//           <ProtectedRoute allowedRoles={["R", "SD", "D", "EMPLOYEE"]}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Retailer Dashboard</div> },
//           // {
//           //   path: "support-ticket",
//           //   children: [
//           //     { path: "list", element: <TicketListPage /> },
//           //     { path: "create", element: <CreateTicketPage /> },
//           //     { path: "list/:id", element: <TicketDetailPage /> },
//           //   ],
//           // },
//         ],
//       },

//       // Distributor section
//       {
//         path: "distributor",
//         element: (
//           <ProtectedRoute allowedRoles={["R", "SD", "D", "EMPLOYEE"]}>
//             <DynamicLayout />
//           </ProtectedRoute>
//         ),
//         children: [
//           { index: true, element: <div>Distributor Dashboard</div> },
//           // {
//           //   path: "support-ticket",
//           //   children: [
//           //     { path: "list", element: <DistributorTicketTable /> },
//           //     { path: "list/:id", element: <DistributorTicketDetail /> },
//           //   ],
//           // },
//         ],
//       },

//       // Fallback
//       { path: "*", element: <div>Not Found here</div> },
//     ],
//     { basename }
//   );

//   return <RouterProvider router={router} />;
// };


// const TenantApp = () => {
//   const { tenant, portalSlug } = usePortal();

//   if (!tenant) return <div>Loading tenant...</div>;

//   const isLocal = window.location.hostname.includes("localhost");
//   const basename = isLocal && portalSlug ? `/tenants/${portalSlug}` : "/";

//   const router = getTenantRouter(basename);

//   return <RouterProvider router={router} />;
// };


export default TenantApp;


// import { createBrowserRouter, RouterProvider } from "react-router";
// import { usePortal } from "../context/PortalContext";
// import Unauthorized from "../portals/common/pages/Unauthorized";
// import ProtectedRoute from "../components/ProtectedRoute";
// import DynamicLayout from "../layouts/DynamicLayout";
// import Login from "../portals/common/pages/Login";
// import VerifyOtp from "../portals/common/pages/VerifyOtp";
// import SuperDistributorListPage from "../portals/wl-admin/pages/SuperDistributorListPage";
// import SuperDistributorFormPage from "../portals/wl-admin/pages/SuperDistributorFormPage";
// import DistributorListPage from "../portals/wl-admin/pages/DistributorListPage";
// import DistributorFormPage from "../portals/wl-admin/pages/DistributorFormPage";
// import RetailerListPage from "../portals/wl-admin/pages/RetailerListPage";
// import RetailerFormPage from "../portals/wl-admin/pages/RetailerFormPage";
// import CreditRequestListPage from "../portals/wl-admin/pages/CreditRequestsList";
// import CreditRequestFormPage from "../portals/wl-admin/pages/CreditRequestFormPage";
// import WalletPage from "../portals/wl-admin/pages/WalletPage";
// import WLServiceSettingsPage from "../portals/wl-admin/pages/WLServiceSettingsPage";
// import TicketListPage from "../portals/retailer/pages/TicketListPage";
// import CreateTicketPage from "../portals/retailer/pages/CreateTicketPage";
// import TicketDetailPage from "../portals/retailer/pages/TicketDetailsPage";
// import DistributorTicketDetail from "../portals/distributor/pages/TicketDetailsPage";
// import DistributorTicketTable from "../portals/distributor/pages/TicketListPage";


// const tenantRouter = createBrowserRouter([
//   // {path: '/', element: <div>Hi</div>},
//   { path: '/admin/login', element: <Login /> },
//   { path: '/admin/verify-otp', element: <VerifyOtp /> },
//   { path: '/retailer/login', element: <Login /> },
//   { path: '/retailer/verify-otp', element: <VerifyOtp /> },
//     { path: '/distributor/login', element: <Login /> },
//   { path: '/distributor/verify-otp', element: <VerifyOtp /> },
//   { path: '/unauthorized', element: <Unauthorized /> },

//   {
//     path: '/admin',
//     element: (
//       <ProtectedRoute allowedRoles={['WL_ADMIN']}>
//         <DynamicLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <div>Admin Dashboard</div> },
//       {path: 'super-distributors', children: [
//               {path: 'list', element: <SuperDistributorListPage />},
//               {path: 'create', element: <SuperDistributorFormPage />},
//               {path: 'edit/:id', element: <SuperDistributorFormPage />},
//       ]},
//       {path: 'distributors', children: [
//               {path: 'list', element: <DistributorListPage />},
//               {path: 'create', element: <DistributorFormPage />},
//               {path: 'edit/:id', element: <DistributorFormPage />},
//       ]},
//       {path: 'retailers', children: [
//               {path: 'list', element: <RetailerListPage />},
//               {path: 'create', element: <RetailerFormPage />},
//               {path: 'edit/:id', element: <RetailerFormPage />},
//       ]},
//       {path: 'wallet', children: [
//               {path: 'credit-requests', element: <CreditRequestListPage />},
//               {path: 'add-fund', element: <CreditRequestFormPage />},
//               {path: 'ledger', element: <WalletPage />},
//       ]},
//       {
//         path: 'services', children: [
//           {path: 'portal-services', element: <WLServiceSettingsPage />}
//         ]
//       }
//     ]
//   },
//   {
//     path: '/retailer',
//     element: (
//       <ProtectedRoute allowedRoles={['R', 'SD', 'D', 'EMPLOYEE']}>
//         <DynamicLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <div>Retailer Dashboard</div> },
//       {path: 'support-ticket', children: [
//               {path: 'list', element: <TicketListPage />},
//               {path: 'create', element: <CreateTicketPage />},
//               {path: 'list/:id', element: <TicketDetailPage />},
//       ]},
//     ]
//   },
//     {
//     path: '/distributor',
//     element: (
//       <ProtectedRoute allowedRoles={['R', 'SD', 'D', 'EMPLOYEE']}>
//         <DynamicLayout />
//       </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <div>Distributor Dashboard</div> },
//       {path: 'support-ticket', children: [
//               {path: 'list', element: <DistributorTicketTable/>},
//               {path: 'list/:id', element: <DistributorTicketDetail />},
//       ]},
//     ]
//   },
//   {
//     path: '*',
//     element: <div>Not Found</div>,
//   },
// ]);


// const TenantApp = () => {
//    const { tenant } = usePortal();

//   if (!tenant) return <div>Loading tenant...</div>;

//   return (
//     <RouterProvider router={tenantRouter} />
//   )
// }

// export default TenantApp
