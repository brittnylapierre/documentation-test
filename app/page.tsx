import Link from "next/link";
import Image from "next/image";
import { getGuideDocuments } from "@/lib/outstatic-docs";

export default function Home() {
  const documents = getGuideDocuments();

  return (
    <main className="min-h-full bg-stone-50 text-stone-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-6 sm:px-8 lg:px-10">
        <nav
          aria-label="Primary navigation"
          className="flex flex-col gap-4 border-b border-stone-200 pb-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/mirador-logo.png"
              alt=""
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-sm font-semibold uppercase tracking-wide text-stone-950">
              Mirador User Guide
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-stone-600">
            <a href="#guides" className="hover:text-teal-800">
              Guides
            </a>
            <a
              href="https://projectmirador.org/"
              className="hover:text-teal-800"
            >
              Mirador
            </a>
            <a
              href="https://github.com/ProjectMirador/mirador"
              className="hover:text-teal-800"
            >
              GitHub
            </a>
          </div>
        </nav>

        <header className="grid gap-10 border-b border-stone-200 pb-12 lg:grid-cols-[1fr_320px] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              End User Documentation
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-stone-950 sm:text-5xl">
              A practical guide to viewing, comparing, and annotating images in
              Mirador.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-stone-700">
              Mirador is an open-source, web-based IIIF viewer for working with
              image resources from collections around the world.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#guides"
                className="inline-flex h-11 items-center justify-center bg-teal-700 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-teal-800"
              >
                Browse Guides
              </a>
              <a
                href="https://projectmirador.org/demo/"
                className="inline-flex h-11 items-center justify-center border border-stone-300 bg-white px-4 text-sm font-medium text-stone-950 shadow-sm transition hover:border-stone-950"
              >
                View Demo
              </a>
            </div>
          </div>

          <div className="border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
              <Image
                src="/mirador-logo.png"
                alt="Mirador"
                width={48}
                height={48}
                className="object-contain"
              />
              <div>
                <p className="text-sm font-semibold text-stone-950">Mirador</p>
                <p className="text-sm text-stone-600">
                  IIIF image viewer and workspace
                </p>
              </div>
            </div>
            <dl className="mt-4 grid gap-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Use</dt>
                <dd className="font-medium text-stone-900">View and compare</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Content</dt>
                <dd className="font-medium text-stone-900">IIIF resources</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-stone-500">Focus</dt>
                <dd className="font-medium text-stone-900">Research workflows</dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-3" aria-label="Guide scope">
          {[
            ["Learn", "Understand the workspace and basic viewer controls."],
            ["View", "Move through image-based resources with IIIF manifests."],
            ["Work", "Compare images, inspect metadata, and use annotations."],
          ].map(([title, description]) => (
            <div key={title} className="border border-stone-200 bg-white p-5">
              <h2 className="text-base font-semibold text-stone-950">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {description}
              </p>
            </div>
          ))}
        </section>

        <section id="guides" aria-labelledby="published-guides" className="pb-16">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="published-guides"
              className="text-2xl font-semibold text-stone-950"
            >
              Guides
            </h2>
            <span className="text-sm text-stone-500">
              {documents.length} published{" "}
              {documents.length === 1 ? "guide" : "guides"}
            </span>
          </div>

          {documents.length > 0 ? (
            <div className="grid gap-3">
              {documents.map((document) => (
                <Link
                  key={`${document.collection}/${document.slug}`}
                  href={`/docs/${document.collection}/${document.slug}`}
                  className="group border border-stone-200 bg-white p-5 shadow-sm transition hover:border-teal-700"
                >
                  <h3 className="text-lg font-semibold text-stone-950 group-hover:text-teal-800">
                    {document.title}
                  </h3>
                  {document.description ? (
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
                      {document.description}
                    </p>
                  ) : null}
                </Link>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-stone-300 bg-white p-8 text-sm text-stone-600">
              No published guide pages yet. Editors can add the first guide in{" "}
              <Link href="/outstatic" className="font-medium text-teal-700">
                Outstatic
              </Link>
              .
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
