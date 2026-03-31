import { define } from "nanotags";

declare global {
  interface HTMLElementTagNameMap {
    "x-toast-container": InstanceType<typeof XToastContainer>;
  }
}

const XToastContainer = define("x-toast-container").setup((ctx) => {
  function notify(message: string, type = "info", durationMs = 2800) {
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    el.textContent = message;
    el.style.setProperty("--toast-duration", `${durationMs / 1000}s`);
    ctx.host.appendChild(el);
    setTimeout(() => el.remove(), durationMs + 350);
  }

  function clearShareButton() {
    ctx.host.querySelector(".toast_link")?.remove();
  }

  function showShareButton(url: string, onDone?: () => void) {
    clearShareButton();

    const btn = document.createElement("button");
    btn.className = "toast_link";
    btn.textContent = "Tap to open / share";
    btn.addEventListener("click", () => {
      navigator.share({ url }).catch(() => {}).finally(() => {
        clearShareButton();
        onDone?.();
      });
    });
    ctx.host.appendChild(btn);
  }

  return { notify, showShareButton, clearShareButton };
});
