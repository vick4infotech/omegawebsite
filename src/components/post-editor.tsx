"use client";

import { useState } from "react";
import { Markdown } from "@/components/markdown";

type Props = {
  defaultValues?: {
    title?: string;
    excerpt?: string;
    contentMarkdown?: string;
    tags?: string;
    published?: boolean;
  };
  action: (formData: FormData) => Promise<any>;
  submitLabel: string;
};

export function PostEditor({ defaultValues, action, submitLabel }: Props) {
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [excerpt, setExcerpt] = useState(defaultValues?.excerpt ?? "");
  const [contentMarkdown, setContentMarkdown] = useState(defaultValues?.contentMarkdown ?? "");
  const [tags, setTags] = useState(defaultValues?.tags ?? "");
  const [published, setPublished] = useState(!!defaultValues?.published);
  const [error, setError] = useState<string>("");

  async function onSubmit(formData: FormData) {
    setError("");
    const res = await action(formData);
    if (res?.ok === false) setError(res.error ?? "Unable to save.");
  }

  return (
    <form action={onSubmit} className="grid gap-4">
      <label className="grid gap-1 text-sm">
        <span className="text-white/80">Title</span>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white"
          required
        />
      </label>

      <label className="grid gap-1 text-sm">
        <span className="text-white/80">Excerpt</span>
        <textarea
          name="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="min-h-[80px] w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white"
          required
        />
      </label>

      <label className="grid gap-1 text-sm">
        <span className="text-white/80">Tags (comma-separated)</span>
        <input
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white"
          placeholder="education,health,relief"
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-white/80">
        <input
          type="checkbox"
          name="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-white/10"
        />
        Published
      </label>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="grid gap-1 text-sm">
          <span className="text-white/80">Markdown</span>
          <textarea
            name="contentMarkdown"
            value={contentMarkdown}
            onChange={(e) => setContentMarkdown(e.target.value)}
            className="min-h-[320px] w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-mono text-sm text-white"
            required
          />
        </label>

        <div className="card p-5">
          <div className="text-sm font-semibold">Preview</div>
          <div className="mt-4">
            {contentMarkdown ? (
              <Markdown content={contentMarkdown} />
            ) : (
              <p className="text-sm text-white/60">Start typing to see a preview.</p>
            )}
          </div>
        </div>
      </div>

      {error ? (
        <p role="alert" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80">
          {error}
        </p>
      ) : null}

      <button className="btn-primary w-fit">{submitLabel}</button>
    </form>
  );
}
