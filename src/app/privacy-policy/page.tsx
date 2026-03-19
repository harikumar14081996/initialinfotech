export const metadata = {
  title: "Privacy Policy | Initial Infotech",
  description: "Privacy Policy for Initial Infotech.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="page-shell py-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-mono text-4xl font-semibold text-[var(--color-text)] md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">Last updated: March 19, 2026</p>

        <div className="prose-rich mt-10 space-y-8 text-sm leading-8 text-[var(--color-muted)]">
          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
              1. Information We Collect
            </h2>
            <p>
              At Initial Infotech, we collect information that you voluntarily provide to us when you
              express an interest in obtaining information about us or our products and Services,
              when you participate in activities on the Website, or otherwise when you contact us.
            </p>
            <p className="mt-3">
              The personal information that we collect depends on the context of your interactions
              with us and the Website, the choices you make, and the products and features you use.
              The personal information we collect may include: names, phone numbers, email addresses,
              and contact preferences.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
              2. How We Use Your Information
            </h2>
            <p>
              We use personal information collected via our Website for a variety of business purposes
              described below:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2 pl-4">
              <li>To respond to user inquiries and offer support.</li>
              <li>To fulfill and manage contractual obligations for custom software or ERP solutions.</li>
              <li>To send administrative information to you.</li>
              <li>To protect our Services from administrative vulnerabilities.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
              3. Will Your Information Be Shared With Anyone?
            </h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with
              services, to protect your rights, or to fulfill business obligations. We do not sell,
              rent, or trade your personal information with third parties for their promotional
              purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
              4. How Long Do We Keep Your Information?
            </h2>
            <p>
              We keep your information for as long as necessary to fulfill the purposes outlined in
              this privacy notice unless otherwise required by law (such as tax, accounting, or other
              legal requirements).
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
              5. How Do We Keep Your Information Safe?
            </h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed
              to protect the security of any personal information we process. However, despite our
              safeguards and efforts to secure your information, no electronic transmission over the
              Internet or information storage technology can be guaranteed to be 100% secure.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
              6. Contact Us
            </h2>
            <p>
              If you have questions or comments about this notice, you may email us at{" "}
              <a href="mailto:hello@initialinfotech.com" className="text-[var(--color-accent)] hover:underline">
                hello@initialinfotech.com
              </a>{" "}
              or by post to:
            </p>
            <address className="mt-4 not-italic pl-4 border-l-2 border-[var(--color-line)]">
              Initial Infotech<br />
              Suthar Faliya Road, J P Nagar<br />
              Near J.M. Patel High School<br />
              Bardoli, Gujarat 394601<br />
              India
            </address>
          </section>
        </div>
      </div>
    </div>
  );
}
