import type { CompanyInfo, ContactInquiry, Employee, Service } from "@prisma/client";

import { companyDefaults, fallbackEmployees, fallbackServices } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  if (!hasDatabase()) {
    return companyDefaults as CompanyInfo;
  }

  const company = await prisma.companyInfo.findUnique({ where: { id: "primary" } });
  return (company ?? companyDefaults) as CompanyInfo;
}

export async function getServices(): Promise<Service[]> {
  if (!hasDatabase()) {
    return fallbackServices as Service[];
  }

  return prisma.service.findMany({ orderBy: [{ order: "asc" }, { title: "asc" }] });
}

export async function getEmployees(): Promise<Employee[]> {
  if (!hasDatabase()) {
    return fallbackEmployees as Employee[];
  }

  return prisma.employee.findMany({ orderBy: [{ isActive: "desc" }, { name: "asc" }] });
}

export async function getEmployeeBySlug(slug: string) {
  if (!hasDatabase()) {
    return (fallbackEmployees as Employee[]).find((employee) => employee.slug === slug) ?? null;
  }

  return prisma.employee.findUnique({ where: { slug } });
}

export async function getContactInquiries(): Promise<ContactInquiry[]> {
  if (!hasDatabase()) {
    return [];
  }

  return prisma.contactInquiry.findMany({ orderBy: { createdAt: "desc" } });
}
