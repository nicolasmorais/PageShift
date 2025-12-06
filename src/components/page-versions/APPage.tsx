import { HeaderAP } from "@/components/advertorial-ap/HeaderAP";
import { ContentAP } from "@/components/advertorial-ap/ContentAP";
import { FooterV3 } from "@/components/advertorial-v3/FooterV3";
import { getDb } from "@/lib/database";

export async function APPage() {
  const db = await getDb();
  const content = db.data.approvalPageContent;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <HeaderAP {...content.header} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-merriweather">
        <ContentAP {...content.content} />
      </main>
      <FooterV3 />
    </div>
  );
}