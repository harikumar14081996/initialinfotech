export const metadata = {
  title: "Terms and Conditions | Initial Infotech",
  description: "Terms and Conditions for Initial Infotech.",
};

export default function TermsPage() {
  return (
    <div className="page-shell py-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-mono text-4xl font-semibold text-[var(--color-text)] md:text-5xl">
          Terms and Conditions
        </h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">Last updated: March 19, 2026</p>

        <div className="prose-rich mt-10 space-y-8 text-sm leading-8 text-[var(--color-muted)]">
          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
              1. Agreement to Terms
            </h2>
            <p>
              These Terms of Use constitute a legally binding agreement made between you, whether
              personally or on behalf of an entity ("you") and Initial Infotech ("Company," "we,"
              "us," or "our"), concerning your access to and use of the website as well as any other
              media form, media channel, mobile website or mobile application related, linked, or
              otherwise connected thereto (collectively, the "Site").
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
              2. Intellectual Property Rights
            </h2>
            <p>
              Unless otherwise indicated, the Site is our proprietary property and all source code,
              databases, functionality, software, website designs, audio, video, text, photographs,
              and graphics on the Site (collectively, the "Content") and the trademarks, service
              marks, and logos contained therein (the "Marks") are owned or controlled by us or
              licensed to us, and are protected by copyright and trademark laws and various other
              intellectual property rights.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
              3. User Representations
            </h2>
            <p>
              By using the Site, you represent and warrant that: (1) all registration information you
              submit will be true, accurate, current, and complete; (2) you will maintain the
              accuracy of such information and promptly update such registration information as
              necessary; (3) you have the legal capacity and you agree to comply with these Terms of
              Use.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
              4. Services and Software Development
            </h2>
            <p>
              For clients engaging Initial Infotech for custom software development, mobile app
              development, or ERP implementation, separate service level agreements (SLAs), master
              service agreements (MSAs), and statements of work (SOWs) will govern the exact scope,
              deliverables, and ownership of the developed software. These website terms act only as
              a general agreement for website usage and informational engagement.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
              5. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and defined following the laws of India. Initial
              Infotech and yourself irrevocably consent that the courts of Gujarat, India shall have
              exclusive jurisdiction to resolve any dispute which may arise in connection with these
              terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text)]">
              6. Contact Us
            </h2>
            <p>
              In order to resolve a complaint regarding the Site or to receive further information
              regarding use of the Site, please contact us at:
            </p>
            <address className="mt-4 not-italic pl-4 border-l-2 border-[var(--color-line)]">
              Initial Infotech<br />
              Suthar Faliya Road, J P Nagar<br />
              Near J.M. Patel High School<br />
              Bardoli, Gujarat 394601<br />
              India<br />
              Email: hello@initialinfotech.com
            </address>
          </section>
        </div>
      </div>
    </div>
  );
}
