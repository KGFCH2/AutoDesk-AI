import { LegalSection } from "@/components/legal-section";
import { Layout } from "@/components/Layout";

const Terms = () => (
  <Layout>
    <div className="container py-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic">
        Terms of Service
      </h1>
      <LegalSection variant="terms" />
    </div>
  </Layout>
);

export default Terms;
