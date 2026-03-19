import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Badge } from "@/components/ui/badge";
import { getCompanyInfo } from "@/lib/data";

export const metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const company = await getCompanyInfo();

  return (
    <div className="page-shell py-14">
      <Badge>Contact us</Badge>
      <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="section-card rounded-[2rem] p-7">
            <h1 className="font-mono text-4xl font-semibold text-[var(--color-text)]">Let’s scope the build.</h1>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
              Share your product goals, internal workflow challenges, or modernization plans and
              we’ll help you shape the right delivery path.
            </p>
            <div className="mt-8 space-y-4 text-sm text-[var(--color-muted)]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-[var(--color-accent)]" />
                <span>
                  {company.address}, {company.city}, {company.region} {company.postalCode},{" "}
                  {company.country}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[var(--color-accent)]" />
                <span>{company.contactEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[var(--color-accent)]" />
                <span>{company.contactPhone}</span>
              </div>
            </div>
          </div>

          <div className="section-card overflow-hidden rounded-[2rem]">
            <iframe
              src={company.googleMapsEmbedUrl}
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Initial Infotech office map"
              className="border-0"
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
