import Link from 'next/link';

export const metadata = {
    title: "Privacy Policy - Quantix Pro",
    description: "Privacy Policy for Quantix Pro. We prioritize your privacy with a no-tracking, no-data-collection approach.",
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen py-10 px-4 md:px-8 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-8 md:p-12 shadow-lg animate-in">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-[var(--text-secondary)]">
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                <div className="space-y-8 text-[var(--text-primary)] leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[var(--accent-primary)]">
                            1. Introduction
                        </h2>
                        <p className="text-[var(--text-secondary)]">
                            Quantix Pro (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                            This Privacy Policy explains how our mobile application (the &quot;App&quot;) handles your information.
                            We believe in complete transparency and have designed our app to respect your digital autonomy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[var(--accent-primary)]">
                            2. Data Collection and Use
                        </h2>
                        <p className="text-[var(--text-secondary)]">
                            <strong>We do not collect, store, or share any personal data or user information.</strong>
                        </p>
                        <ul className="list-disc ml-6 mt-2 space-y-2 text-[var(--text-secondary)]">
                            <li>No personal information is requested or required to use the App.</li>
                            <li>No usage data is sent to external servers.</li>
                            <li>All calculations and specific data processing happen locally on your device.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[var(--accent-primary)]">
                            3. Local Storage
                        </h2>
                        <p className="text-[var(--text-secondary)]">
                            The App uses your device&apos;s local storage technologies strictly to enhance your user experience by saving your preferences.
                            This includes:
                        </p>
                        <ul className="list-disc ml-6 mt-2 space-y-2 text-[var(--text-secondary)]">
                            <li>Theme preferences (Light/Dark mode)</li>
                            <li>Last used calculator mode</li>
                            <li>Calculator history (stored only if you explicitly choose to keep it)</li>
                        </ul>
                        <p className="mt-2 text-[var(--text-secondary)]">
                            This data remains strictly on your device and is not transmitted to us or any third parties.
                            You can clear this data at any time by clearing your app data or uninstalling the application.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[var(--accent-primary)]">
                            4. Third-Party Services
                        </h2>
                        <p className="text-[var(--text-secondary)]">
                            This App does not use any third-party analytics, advertising, or tracking services.
                            We do not include SDKs (Software Development Kits) from advertising networks or data brokers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[var(--accent-primary)]">
                            5. Children&apos;s Privacy
                        </h2>
                        <p className="text-[var(--text-secondary)]">
                            Our App does not knowingly collect any personal information from children under the age of 13.
                            Since we do not collect any personal data at all, this applies to users of all ages.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[var(--accent-primary)]">
                            6. Changes to This Privacy Policy
                        </h2>
                        <p className="text-[var(--text-secondary)]">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                            You are advised to review this Privacy Policy periodically for any changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-[var(--accent-primary)]">
                            7. Contact Us
                        </h2>
                        <p className="text-[var(--text-secondary)]">
                            If you have any questions about this Privacy Policy, please contact us via our GitHub repository:
                            <a
                                href="https://github.com/Dageniusdrap/Quanitx-Pro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-1 text-[var(--accent-secondary)] hover:underline"
                            >
                                Quantix Pro Repository
                            </a>
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-[var(--glass-border)] text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl glass hover:bg-[var(--btn-number)] transition-all font-medium text-[var(--accent-primary)]"
                    >
                        ← Back to Calculator
                    </Link>
                </div>
            </div>
        </div>
    );
}
