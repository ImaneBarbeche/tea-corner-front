export default function Privacy() {
  return (
    <main className="max-w-2xl mx-auto px-8 py-12 flex flex-col gap-8">
      <div>
        <h1 className="text-4xl">Privacy Policy</h1>
        <time className="text-sm text-gray-500 mt-2 block">
          Last updated: February 10, 2026
        </time>
        <p className="mt-4">
          This Privacy Policy explains how <strong>TeaCorner</strong> collects,
          uses, stores, and protects your personal data when you use our
          application. We are committed to complying with the{" "}
          <strong>General Data Protection Regulation (GDPR)</strong> and to
          ensuring transparency regarding the use of your information.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">1. Personal data collected</h2>
        <p>
          We only collect data strictly necessary for TeaCorner to function:
        </p>
        <h3 className="font-medium">Data provided during account creation</h3>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Username</li>
          <li>Email address</li>
          <li>Password (hashed and never stored in plain text)</li>
          <li>Consent to the privacy policy</li>
        </ul>
        <h3 className="font-medium">Data generated through use of the service</h3>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>User preferences (e.g. themes, favorites)</li>
          <li>Usage history (e.g. recipes viewed, interactions)</li>
        </ul>
        <h3 className="font-medium">Data we do NOT collect</h3>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Sensitive data (health, religion, political opinions…)</li>
          <li>Precise location data</li>
          <li>Banking data</li>
          <li>Advertising cookies</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">2. Purposes of processing</h2>
        <p>Your data is used solely to:</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Create and manage your user account</li>
          <li>Ensure authentication and security</li>
          <li>Allow you to access TeaCorner's features</li>
          <li>Improve the user experience</li>
          <li>
            Send you service-related emails (e.g. email verification, security)
          </li>
        </ul>
        <p>
          We <strong>never</strong> sell your data.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">3. Legal basis for processing</h2>
        <p>We process your data on the following legal bases:</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>
            <strong>Contract performance</strong>: account creation, access to
            the application
          </li>
          <li>
            <strong>Consent</strong>: acceptance of the privacy policy
          </li>
          <li>
            <strong>Legitimate interest</strong>: security, abuse prevention
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">4. Retention period</h2>
        <p>We retain your data:</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>As long as your account is active</li>
          <li>
            Up to <strong>2 years</strong> of inactivity
          </li>
          <li>Or until you request deletion of your account</li>
        </ul>
        <p>
          Technical logs are retained for a maximum of{" "}
          <strong>30 days</strong>.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">5. Data security</h2>
        <p>We implement strict security measures:</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Password hashing (argon2)</li>
          <li>Secure cookies (httpOnly, SameSite)</li>
          <li>Email verification</li>
          <li>
            Protection against attacks (CSRF, rate limiting, data validation)
          </li>
          <li>Restricted data access</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">6. Data sharing</h2>
        <p>
          We do not share your data <strong>with any third party</strong>,
          except:
        </p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Essential technical providers (e.g. email delivery service)</li>
          <li>Legal obligations (rare and regulated)</li>
        </ul>
        <p>These partners also comply with the GDPR.</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">7. Your rights (GDPR)</h2>
        <p>You have the following rights:</p>
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="font-medium">Right of access</h3>
            <p>Obtain a copy of your data.</p>
          </div>
          <div>
            <h3 className="font-medium">Right of rectification</h3>
            <p>Modify your personal information.</p>
          </div>
          <div>
            <h3 className="font-medium">Right to erasure ("right to be forgotten")</h3>
            <p>Delete your account and all your data.</p>
          </div>
          <div>
            <h3 className="font-medium">Right to data portability</h3>
            <p>Download your data in a readable format.</p>
          </div>
          <div>
            <h3 className="font-medium">Right to object</h3>
            <p>Object to certain types of processing.</p>
          </div>
          <div>
            <h3 className="font-medium">Right to withdraw consent</h3>
            <p>At any time, without justification.</p>
          </div>
        </div>
        <p>
          To exercise your rights, you can use the built-in features in the
          application or contact us.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">8. Cookies</h2>
        <p>
          TeaCorner uses only <strong>technical cookies</strong> necessary for
          the service to function (authentication).
        </p>
        <p>
          We do <strong>not</strong> use:
        </p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>Advertising cookies</li>
          <li>Tracking cookies</li>
          <li>Analytics cookies without consent</li>
        </ul>
        <p>No cookie banner is required in this case.</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">9. Account deletion</h2>
        <p>
          You can delete your account at any time from your user space. All
          your data will be permanently deleted within a maximum of{" "}
          <strong>30 days</strong>.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">10. Contact</h2>
        <p>
          For any questions regarding the protection of your data:{" "}
          contact@teacorner.com
        </p>
      </section>
    </main>
  );
}
