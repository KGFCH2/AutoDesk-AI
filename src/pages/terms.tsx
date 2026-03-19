import { LegalSection } from "@/components/legal-section";
import { Layout } from "@/components/Layout";

const Terms = () => (
  <Layout>
    <div className="container py-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <LegalSection variant="terms" />
    </div>
  </Layout>
);

export default Terms;
