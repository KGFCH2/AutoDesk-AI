import { FAQSection } from "@/components/faq-section";
import { Layout } from "@/components/Layout";

const FAQ = () => (
  <Layout>
    <div className="container py-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic">
        Frequently Asked Questions
      </h1>
      <FAQSection />
    </div>
  </Layout>
);

export default FAQ;
