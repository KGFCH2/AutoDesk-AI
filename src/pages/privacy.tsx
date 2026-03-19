import { LegalSection } from "@/components/legal-section";
import { Layout } from "@/components/Layout";

const Privacy = () => (
  <Layout>
    <div className="container py-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <LegalSection variant="privacy" />
    </div>
  </Layout>
);

export default Privacy;
