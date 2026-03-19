import { LegalSection } from "@/components/legal-section";
import { Layout } from "@/components/Layout";

const Privacy = () => (
  <Layout>
    <div className="container py-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic">
        Privacy Policy
      </h1>
      <LegalSection variant="privacy" />
    </div>
  </Layout>
);

export default Privacy;
