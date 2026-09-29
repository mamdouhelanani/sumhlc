import { BookOpen, ExternalLink, FileText, Folder, Globe, PlayCircle } from "lucide-react";
import type { Resource } from "@/lib/content";
import { audiences, resourceCategories } from "@/lib/content-labels";

const kindMeta = {
  website: { label: "Website", icon: Globe },
  pdf: { label: "PDF", icon: FileText },
  docx: { label: "Word document", icon: FileText },
  video: { label: "Video", icon: PlayCircle },
  folder: { label: "Shared folder", icon: Folder },
  course: { label: "Online course", icon: BookOpen },
  phone: { label: "Phone line", icon: Globe },
} as const;

export function ResourceCard({ resource, showCategory = true }: { resource: Resource; showCategory?: boolean }) {
  const kind = kindMeta[resource.kind];
  const KindIcon = kind.icon;
  const isFile = resource.kind === "pdf" || resource.kind === "docx";
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-brand-500 hover:shadow-md">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-muted">
        <KindIcon className="size-4 text-brand-600" aria-hidden />
        <span>{kind.label}</span>
        {showCategory && (
          <>
            <span aria-hidden>·</span>
            <span>{resourceCategories[resource.category]}</span>
          </>
        )}
      </div>
      <h3 className="mt-2 font-sans text-lg leading-snug font-bold text-brand-900">
        <a href={resource.url} className="after:absolute after:inset-0 after:rounded-2xl hover:underline focus-visible:outline-none">
          {resource.title}
          <span className="sr-only">{isFile ? ` (${kind.label} download)` : " (external site)"}</span>
        </a>
      </h3>
      {resource.source && <p className="mt-0.5 text-sm text-slate-muted">{resource.source}</p>}
      <p className="mt-3 text-sm text-ink">{resource.description}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        {resource.audience.map((a) => (
          <span key={a} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800">
            {audiences[a]}
          </span>
        ))}
        <ExternalLink className="ml-auto size-4 text-slate-muted" aria-hidden />
      </div>
    </article>
  );
}
