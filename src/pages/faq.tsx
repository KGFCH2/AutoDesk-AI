import { FAQSection } from "@/components/faq-section";
import { Layout } from "@/components/Layout";

const FAQ = () => (
  <Layout>
    <div className="container py-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <FAQSection />
    </div>
  </Layout>
);

export default FAQ;
