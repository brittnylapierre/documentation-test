import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  getCollections,
  getDocumentBySlug,
  getDocumentSlugs,
  getDocuments,
} from "outstatic/server";

export type GuideDocumentSummary = {
  collection: string;
  slug: string;
  title: string;
  description: string | null;
  publishedAt: string | null;
};

export type GuideDocument = GuideDocumentSummary & {
  content: string;
};

function getContentDirectory() {
  if (process.env.OST_CONTENT_PATH) {
    return join(
      /* turbopackIgnore: true */ process.cwd(),
      process.env.OST_CONTENT_PATH,
    );
  }

  return join(process.cwd(), "outstatic", "content");
}

function hasContentDirectory() {
  return existsSync(getContentDirectory());
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

function normalizeDate(value: unknown) {
  if (typeof value !== "string" && !(value instanceof Date)) {
    return null;
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function toSummary(
  collection: string,
  document: Record<string, unknown>,
): GuideDocumentSummary | null {
  const slug = normalizeString(document.slug);
  const status = normalizeString(document.status);

  if (!slug || status !== "published") {
    return null;
  }

  return {
    collection,
    slug,
    title: normalizeString(document.title) ?? titleFromSlug(slug),
    description: normalizeString(document.description),
    publishedAt: normalizeDate(document.publishedAt),
  };
}

export function getGuideDocuments() {
  if (!hasContentDirectory()) {
    return [];
  }

  return getCollections()
    .flatMap((collection) =>
      getDocuments(collection, [
        "title",
        "slug",
        "description",
        "publishedAt",
        "status",
      ])
        .map((document) => toSummary(collection, document))
        .filter((document): document is GuideDocumentSummary =>
          Boolean(document),
        ),
    )
    .sort((a, b) => {
      if (a.publishedAt && b.publishedAt) {
        return b.publishedAt.localeCompare(a.publishedAt);
      }

      return a.title.localeCompare(b.title);
    });
}

export function getGuideDocument(collection: string, slug: string) {
  if (!hasContentDirectory()) {
    return null;
  }

  const document = getDocumentBySlug(collection, slug, [
    "title",
    "slug",
    "description",
    "publishedAt",
    "status",
    "content",
  ]);

  if (!document) {
    return null;
  }

  const summary = toSummary(collection, document);

  if (!summary) {
    return null;
  }

  return {
    ...summary,
    content: normalizeString(document.content) ?? "",
  };
}

export function getGuideDocumentParams() {
  if (!hasContentDirectory()) {
    return [];
  }

  return getCollections().flatMap((collection) =>
    getDocumentSlugs(collection).map((slug) => ({
      collection,
      slug,
    })),
  );
}
