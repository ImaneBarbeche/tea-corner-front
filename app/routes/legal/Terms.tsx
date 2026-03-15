export default function Terms() {
  return (
    <main className="max-w-2xl mx-auto px-8 py-12 flex flex-col gap-8">
      <div>
        <h1 className="text-4xl">Terms of Service</h1>
        <time className="text-sm text-gray-500 mt-2 block">
          Last updated: February 10, 2026
        </time>
        <p className="mt-4">
          These Terms of Service govern access to and use of the TeaCorner
          application. By creating an account, you agree to these terms in
          their entirety.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">1. Service description</h2>
        <p>
          TeaCorner is a tea companion app that allows users to discover teas,
          view information about their preferences and brews, and manage their
          personal space. TeaCorner is a free service with no physical product
          sales.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">2. Account creation</h2>
        <p>
          To access the features, you must create an account by providing
          accurate information. You are responsible for:
        </p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Keeping your credentials confidential</li>
          <li>Any activity carried out from your account</li>
          <li>Updating your information if it changes</li>
        </ul>
        <p>
          You may not create multiple accounts or impersonate another person.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">3. Acceptable use</h2>
        <p>It is prohibited to use TeaCorner to:</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Attempt to compromise the security of the application</li>
          <li>Automate requests abusively (bots, scraping)</li>
          <li>Post illegal, offensive, or misleading content</li>
          <li>Bypass authentication mechanisms</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">4. Service availability</h2>
        <p>
          TeaCorner is provided "as is". We do not guarantee continuous
          availability of the service. Interruptions may occur for maintenance
          or technical reasons without prior notice.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">5. Limitation of liability</h2>
        <p>TeaCorner cannot be held liable for:</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Any interruption or unavailability of the service</li>
          <li>Data loss due to a technical incident</li>
          <li>
            Decisions made by the user based on information available in the
            app
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">6. Account suspension</h2>
        <p>
          We reserve the right to suspend or delete an account in case of
          non-compliance with these Terms of Service, without prior notice or
          compensation.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">7. Intellectual property</h2>
        <p>
          TeaCorner's content (design, text, code) is protected. You may not
          reproduce or exploit it without authorization.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">8. Changes to the Terms</h2>
        <p>
          We may modify these Terms at any time. Significant changes will be
          notified by email. Continued use of the service constitutes
          acceptance of the new terms.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">9. Applicable law</h2>
        <p>
          These Terms are governed by French law. In the event of a dispute,
          the competent courts are those of the jurisdiction where TeaCorner is
          headquartered.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">10. Contact</h2>
        <p>For any questions: contact@teacorner.com</p>
      </section>
    </main>
  );
}
