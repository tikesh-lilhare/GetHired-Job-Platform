// Tiny, dependency-free toast notifications (replaces window.alert pop-ups).
let host = null;

const ensureHost = () => {
    if (host && document.body.contains(host)) return host;
    host = document.createElement("div");
    host.className = "toast-host";
    host.setAttribute("aria-live", "polite");
    document.body.appendChild(host);
    return host;
};

const show = (message, type = "info", duration = 3600) => {
    const el = document.createElement("div");
    el.className = `toast-item toast-${type}`;
    el.setAttribute("role", type === "error" ? "alert" : "status");
    const dot = document.createElement("span");
    dot.className = "toast-dot";
    const text = document.createElement("span");
    text.textContent = message;
    el.append(dot, text);
    ensureHost().appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
        el.classList.remove("show");
        setTimeout(() => el.remove(), 250);
    }, duration);
};

export const toast = {
    success: (m) => show(m, "success"),
    error: (m) => show(m, "error", 4800),
    info: (m) => show(m, "info"),
};

export default toast;
