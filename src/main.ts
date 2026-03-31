import "./link-fixer";
import "./styles.css";

if (window.visualViewport) {
  const update = () => {
    document.documentElement.style.setProperty("--vh", `${window.visualViewport!.height}px`);
  };
  window.visualViewport.addEventListener("resize", update);
  update();
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}
