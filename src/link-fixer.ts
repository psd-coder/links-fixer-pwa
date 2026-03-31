import { define } from "nanotags";
import "./toast-container";

const CAN_SHARE = typeof navigator.share === "function";

// Strips control chars, zero-width unicode, and joins wrapped lines
function fixLink(text: string): string {
  return text
    .replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F\u200B-\u200F\u2028-\u202F\uFEFF]/g, "")
    .split(/[\r\n]+/)
    .map((line) => line.trim())
    .join("");
}

function isValidURL(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

define("x-link-fixer")
  .withRefs((r) => ({
    toasts: r.one("x-toast-container"),
    textarea: r.one("textarea"),
  }))
  .setup((ctx) => {
    function openFixed(url: string) {
      const win = window.open(url, "_blank", "noopener");

      if (win) {
        navigator.clipboard.writeText(url).then(
          () => ctx.refs.toasts.notify("Copied & opened!", "success"),
          () => ctx.refs.toasts.notify("Opened!", "success"),
        );
        return;
      }

      if (CAN_SHARE) {
        ctx.refs.toasts.showShareButton(url, () => {
          ctx.refs.textarea.value = "";
        });
        return;
      }

      ctx.refs.toasts.notify("Link fixed! Popup was blocked.", "error");
    }

    ctx.on(ctx.refs.textarea, "paste", (e) => {
      e.preventDefault();

      const raw = (e as ClipboardEvent).clipboardData?.getData("text/plain") ?? "";
      const fixed = fixLink(raw);
      ctx.refs.textarea.value = fixed;

      if (!fixed) return;

      if (!isValidURL(fixed)) {
        ctx.refs.toasts.notify("Not a valid URL", "error");
        return;
      }

      openFixed(fixed);
    });
  });
