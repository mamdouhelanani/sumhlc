import { cn } from "@/lib/utils";

type FieldProps = {
  name: string;
  label: string;
  errors?: string[];
  hint?: string;
  required?: boolean;
  children: (props: { id: string; "aria-invalid"?: true; "aria-describedby"?: string; required?: boolean; name: string }) => React.ReactNode;
};

/** Label + control + hint + error, wired together for screen readers. */
export function Field({ name, label, errors, hint, required, children }: FieldProps) {
  const id = `field-${name}`;
  const describedBy = [hint && `${id}-hint`, errors?.length && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-warm-700"> *</span> : <span className="font-normal text-slate-muted"> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-0.5 text-sm text-slate-muted">
          {hint}
        </p>
      )}
      <div className="mt-1.5">{children({ id, name, required, "aria-invalid": errors?.length ? true : undefined, "aria-describedby": describedBy })}</div>
      {errors?.length ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-destructive">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}

export const inputClass = cn(
  "block w-full rounded-xl border border-input bg-white px-3.5 text-base text-ink placeholder:text-slate-muted",
  "aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-1 aria-[invalid=true]:ring-destructive",
);

/** Hidden from people and assistive tech; bots tend to fill it in. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
