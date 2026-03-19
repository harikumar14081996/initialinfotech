import { redirect } from "next/navigation";

import { AdminDashboard } from "@/components/admin-dashboard";
import { getSession } from "@/lib/auth";
import { getCompanyInfo, getContactInquiries, getEmployees, getServices } from "@/lib/data";

export const metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const [company, services, employees, inquiries] = await Promise.all([
    getCompanyInfo(),
    getServices(),
    getEmployees(),
    getContactInquiries(),
  ]);

  return (
    <div className="page-shell py-14">
      <AdminDashboard
        role={session.role}
        email={session.email}
        company={{
          companyName: company.companyName,
          tagline: company.tagline,
          address: company.address,
          city: company.city,
          region: company.region,
          postalCode: company.postalCode,
          country: company.country,
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
