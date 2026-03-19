"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { RichTextEditor } from "@/components/rich-text-editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CompanyPayload = {
  companyName: string;
  tagline: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  aboutTitle: string;
  aboutBody: string;
  mission: string;
  globalReach: string;
  contactEmail: string;
  contactPhone: string;
  googleMapsEmbedUrl: string;
};

type ServicePayload = {
  id?: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
};

type EmployeePayload = {
  id?: string;
  name: string;
  photoUrl: string;
  dob: string;
  personalEmail: string;
  phone: string;
  startDate: string;
  endDate: string;
  dutiesHtml: string;
  isActive: boolean;
};

type InquiryPayload = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  createdAt: string;
};

export function AdminDashboard({
  company,
  services,
  employees,
  inquiries,
  role,
  email,
}: {
  company: CompanyPayload;
  services: ServicePayload[];
  employees: EmployeePayload[];
  inquiries: InquiryPayload[];
  role: "admin" | "editor";
  email: string;
}) {
  const [companyForm, setCompanyForm] = useState(company);
  const [serviceForm, setServiceForm] = useState<ServicePayload>({
    title: "",
    description: "",
    iconName: "code-xml",
    order: services.length + 1,
  });
  const [employeeForm, setEmployeeForm] = useState<EmployeePayload>({
    name: "",
    photoUrl: "",
    dob: "",
    personalEmail: "",
    phone: "",
    startDate: "",
    endDate: "",
    dutiesHtml: "<p></p>",
    isActive: true,
  });
  const [busy, setBusy] = useState<string | null>(null);

  const canManageEverything = role === "admin";

  const sortedServices = useMemo(
    () => [...services].sort((a, b) => a.order - b.order || a.title.localeCompare(b.title)),
    [services],
  );

  async function request(url: string, method: string, payload?: unknown) {
    setBusy(`${method}:${url}`);

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: payload ? JSON.stringify(payload) : undefined,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Request failed.");
      }
      toast.success(data.message || "Saved successfully.");
      window.location.reload();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request failed.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="section-card rounded-[2rem] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge>{role}</Badge>
            <h1 className="mt-4 font-mono text-4xl font-semibold text-[var(--color-text)]">Admin dashboard</h1>
            <p className="mt-3 text-sm text-[var(--color-muted)]">Signed in as {email}</p>
          </div>
          <form action="/api/auth/logout" method="post">
            <Button variant="secondary" type="submit">
              Sign out
            </Button>
          </form>
        </div>
      </div>

      {canManageEverything ? (
        <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="section-card rounded-[2rem] p-6">
            <h2 className="font-mono text-2xl font-semibold">Company information</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Input
                placeholder="Company name"
                value={companyForm.companyName}
                onChange={(event) =>
                  setCompanyForm({ ...companyForm, companyName: event.target.value })
                }
              />
              <Input
                placeholder="Tagline"
                value={companyForm.tagline}
                onChange={(event) => setCompanyForm({ ...companyForm, tagline: event.target.value })}
              />
              <Input
                placeholder="Address"
                value={companyForm.address}
                onChange={(event) => setCompanyForm({ ...companyForm, address: event.target.value })}
              />
              <Input
                placeholder="City"
                value={companyForm.city}
                onChange={(event) => setCompanyForm({ ...companyForm, city: event.target.value })}
              />
              <Input
                placeholder="Region"
                value={companyForm.region}
                onChange={(event) => setCompanyForm({ ...companyForm, region: event.target.value })}
              />
              <Input
                placeholder="Postal code"
                value={companyForm.postalCode}
                onChange={(event) =>
                  setCompanyForm({ ...companyForm, postalCode: event.target.value })
                }
              />
              <Input
                placeholder="Country"
                value={companyForm.country}
                onChange={(event) => setCompanyForm({ ...companyForm, country: event.target.value })}
              />
              <Input
                placeholder="Contact email"
                value={companyForm.contactEmail}
                onChange={(event) =>
                  setCompanyForm({ ...companyForm, contactEmail: event.target.value })
                }
              />
              <Input
                placeholder="Contact phone"
                value={companyForm.contactPhone}
                onChange={(event) =>
                  setCompanyForm({ ...companyForm, contactPhone: event.target.value })
                }
              />
              <Input
                placeholder="Google Maps embed URL"
                value={companyForm.googleMapsEmbedUrl}
                onChange={(event) =>
                  setCompanyForm({ ...companyForm, googleMapsEmbedUrl: event.target.value })
                }
              />
            </div>
            <Input
              className="mt-4"
              placeholder="About title"
              value={companyForm.aboutTitle}
              onChange={(event) => setCompanyForm({ ...companyForm, aboutTitle: event.target.value })}
            />
            <Textarea
              className="mt-4"
              placeholder="About body"
              value={companyForm.aboutBody}
              onChange={(event) => setCompanyForm({ ...companyForm, aboutBody: event.target.value })}
            />
            <Textarea
              className="mt-4"
              placeholder="Mission"
              value={companyForm.mission}
              onChange={(event) => setCompanyForm({ ...companyForm, mission: event.target.value })}
            />
            <Textarea
              className="mt-4"
              placeholder="Global reach"
              value={companyForm.globalReach}
              onChange={(event) =>
                setCompanyForm({ ...companyForm, globalReach: event.target.value })
              }
            />
            <Button
              className="mt-4"
              disabled={busy !== null}
              onClick={() => request("/api/admin/company", "PATCH", companyForm)}
            >
              Save company details
            </Button>
          </div>

          <div className="section-card rounded-[2rem] p-6">
            <h2 className="font-mono text-2xl font-semibold">Services</h2>
            <div className="mt-5 space-y-4">
              {sortedServices.map((service) => (
                <div
                  key={service.id}
                  className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-[var(--color-text)]">{service.title}</p>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">
                        {service.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => setServiceForm(service)}
                        disabled={busy !== null}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => request("/api/admin/services", "DELETE", { id: service.id })}
                        disabled={busy !== null}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[1.75rem] border border-[var(--color-line)] bg-white p-5">
              <p className="font-medium text-[var(--color-text)]">
                {serviceForm.id ? "Edit service" : "Add service"}
              </p>
              <div className="mt-4 space-y-3">
                <Input
                  placeholder="Title"
                  value={serviceForm.title}
                  onChange={(event) =>
                    setServiceForm({ ...serviceForm, title: event.target.value })
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={serviceForm.description}
                  onChange={(event) =>
                    setServiceForm({ ...serviceForm, description: event.target.value })
                  }
                />
                <div className="grid gap-3 md:grid-cols-2">
                  <Input
                    placeholder="Icon name"
                    value={serviceForm.iconName}
                    onChange={(event) =>
                      setServiceForm({ ...serviceForm, iconName: event.target.value })
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Order"
                    value={serviceForm.order}
                    onChange={(event) =>
                      setServiceForm({
                        ...serviceForm,
                        order: Number(event.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      request(
                        "/api/admin/services",
                        serviceForm.id ? "PATCH" : "POST",
                        serviceForm,
                      )
                    }
                    disabled={busy !== null}
                  >
                    {serviceForm.id ? "Update service" : "Create service"}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      setServiceForm({
                        title: "",
                        description: "",
                        iconName: "code-xml",
                        order: services.length + 1,
                      })
                    }
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="section-card rounded-[2rem] p-6 text-sm text-[var(--color-muted)]">
          Editor access is limited to employee directory management.
        </div>
      )}

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="section-card rounded-[2rem] p-6">
          <h2 className="font-mono text-2xl font-semibold">Employee directory management</h2>
          <div className="mt-5 space-y-4">
            {employees.map((employee) => (
              <div key={employee.id} className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-[var(--color-text)]">{employee.name}</p>
                    <p className="mt-1 text-sm text-[var(--color-muted)]">
                      {employee.personalEmail}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => setEmployeeForm(employee)}
                      disabled={busy !== null}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        request("/api/admin/employees", "DELETE", { id: employee.id })
                      }
                      disabled={busy !== null}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card rounded-[2rem] p-6">
          <h2 className="font-mono text-2xl font-semibold">
            {employeeForm.id ? "Edit employee" : "Add employee"}
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Input
              placeholder="Full name"
              value={employeeForm.name}
              onChange={(event) => setEmployeeForm({ ...employeeForm, name: event.target.value })}
            />
            <Input
              placeholder="Photo URL"
              value={employeeForm.photoUrl}
              onChange={(event) =>
                setEmployeeForm({ ...employeeForm, photoUrl: event.target.value })
              }
            />
            <Input
              type="date"
              value={employeeForm.dob}
              onChange={(event) => setEmployeeForm({ ...employeeForm, dob: event.target.value })}
            />
            <Input
              type="email"
              placeholder="Personal email"
              value={employeeForm.personalEmail}
              onChange={(event) =>
                setEmployeeForm({ ...employeeForm, personalEmail: event.target.value })
              }
            />
            <Input
              placeholder="Phone"
              value={employeeForm.phone}
              onChange={(event) => setEmployeeForm({ ...employeeForm, phone: event.target.value })}
            />
            <select
              className="h-12 rounded-2xl border border-[var(--color-line)] bg-white px-4 text-sm text-[var(--color-text)] outline-none"
              value={employeeForm.isActive ? "true" : "false"}
              onChange={(event) =>
                setEmployeeForm({
                  ...employeeForm,
                  isActive: event.target.value === "true",
                  endDate: event.target.value === "true" ? "" : employeeForm.endDate,
                })
              }
            >
              <option value="true">Currently working</option>
              <option value="false">Former employee</option>
            </select>
            <Input
              type="date"
              value={employeeForm.startDate}
              onChange={(event) =>
                setEmployeeForm({ ...employeeForm, startDate: event.target.value })
              }
            />
            <Input
              type="date"
              value={employeeForm.endDate}
              onChange={(event) =>
                setEmployeeForm({ ...employeeForm, endDate: event.target.value })
              }
            />
          </div>
          <RichTextEditor
            className="mt-4"
            value={employeeForm.dutiesHtml}
            onChange={(value) => setEmployeeForm({ ...employeeForm, dutiesHtml: value })}
          />
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() =>
                request(
                  "/api/admin/employees",
                  employeeForm.id ? "PATCH" : "POST",
                  employeeForm,
                )
              }
              disabled={busy !== null}
            >
              {employeeForm.id ? "Update employee" : "Create employee"}
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                setEmployeeForm({
                  name: "",
                  photoUrl: "",
                  dob: "",
                  personalEmail: "",
                  phone: "",
                  startDate: "",
                  endDate: "",
                  dutiesHtml: "<p></p>",
                  isActive: true,
                })
              }
            >
              Reset
            </Button>
          </div>
        </div>
      </section>

      <section className="section-card rounded-[2rem] p-6">
        <h2 className="font-mono text-2xl font-semibold">Contact inquiries</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {inquiries.length === 0 ? (
            <p className="text-sm text-[var(--color-muted)]">
              No inquiries yet. New form submissions will appear here.
            </p>
          ) : (
            inquiries.map((inquiry) => (
              <div key={inquiry.id} className="rounded-[1.5rem] border border-[var(--color-line)] bg-white p-4">
                <p className="font-semibold text-[var(--color-text)]">{inquiry.name}</p>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                  {inquiry.email}
                  {inquiry.company ? ` · ${inquiry.company}` : ""}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{inquiry.message}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
