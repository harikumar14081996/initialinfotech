import { redirect } from "next/navigation";

import { AdminDashboard } from "@/components/admin-dashboard";
import { getSession } from "@/lib/auth";
import { getCompanyInfo, getContactInquiries, getEmployees, getServices } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  const [company, services, employees, inquiries] = await Promise.all([
    getCompanyInfo(),
    getServices(),
    getEmployees(),
    getContactInquiries(),
  ]);

  // Load users for admin user management (admin only)
  let users: { id: string; email: string; role: string; createdAt: string }[] = [];
  if (session.role === "admin" && process.env.DATABASE_URL) {
    const rows = await prisma.adminUser.findMany({
      select: { id: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });
    users = rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }));
  }

  return (
    <div className="page-shell py-14">
      <AdminDashboard
        role={session.role}
        email={session.email}
        users={users}
        company={{
          companyName: company.companyName,
          tagline: company.tagline,
          address: company.address,
          city: company.city,
          region: company.region,
          postalCode: company.postalCode,
          country: company.country,
          ownerName: company.ownerName,
          ownerTitle: company.ownerTitle,
          aboutTitle: company.aboutTitle,
          aboutBody: company.aboutBody,
          mission: company.mission,
          globalReach: company.globalReach,
          contactEmail: company.contactEmail,
          contactPhone: company.contactPhone,
          googleMapsEmbedUrl: company.googleMapsEmbedUrl,
        }}
        services={services}
        employees={employees.map((employee) => ({
          id: employee.id,
          name: employee.name,
          photoUrl: employee.photoUrl || "",
          dob: employee.dob.toISOString().slice(0, 10),
          personalEmail: employee.personalEmail,
          phone: employee.phone || "",
          startDate: employee.startDate.toISOString().slice(0, 10),
          endDate: employee.endDate ? employee.endDate.toISOString().slice(0, 10) : "",
          dutiesHtml: employee.dutiesHtml,
          isActive: employee.isActive,
        }))}
        inquiries={inquiries.map((inquiry) => ({
          id: inquiry.id,
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          company: inquiry.company,
          message: inquiry.message,
          createdAt: inquiry.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
