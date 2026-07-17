import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  getGuideDocument,
  getGuideDocumentParams,
} from "@/lib/outstatic-docs";

type PageProps = {
  params: Promise<{
    collection: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getGuideDocumentParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { collection, slug } = await params;
  const document = getGuideDocument(collection, slug);

  if (!document) {
    return {};
  }

  return {
    title: `${document.title} | Mirador User Guide`,
    description: document.description ?? undefined,
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { collection, slug } = await params;
  const document = getGuideDocument(collection, slug);

  if (!document) {
    notFound();
  }

  return (
    <main className="min-h-full bg-stone-50 text-stone-950">
      <article className="mx-auto w-full max-w-3xl px-6 py-8 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="text-sm font-medium text-teal-700 hover:text-teal-900"
        >
          Back to guides
        </Link>
        <header className="mt-8 border-b border-stone-200 pb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
            Mirador User Guide
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-stone-950">
            {document.title}
          </h1>
          {document.description ? (
            <p className="mt-4 text-base leading-7 text-stone-700">
              {document.description}
            </p>
          ) : null}
        </header>
        <div className="guide-markdown mt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {document.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
