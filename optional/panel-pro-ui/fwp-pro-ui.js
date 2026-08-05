/**
 * FreeWebPanel Pro UI enhancer
 * - Admin/user dark shell activation
 * - Command palette (Ctrl/Cmd+K)
 * - Owner automation strip (PayPal/billing health via existing APIs)
 * Does not alter marketing/SEO routes.
 */
(() => {
  const path = () => window.location.pathname || "/";
  const isAdmin = () => path().startsWith("/admin");
  const isUser = () => path().startsWith("/user");
  const isPanel = () => isAdmin() || isUser();

  const ADMIN_COMMANDS = [
    ["Dashboard", "/admin/dashboard", "Overview"],
    ["Quick tools", "/admin/quick", "Daily ops"],
    ["Websites", "/admin/websites", "Sites"],
    ["Domains & SSL", "/admin/domains", "DNS / AutoSSL"],
    ["Accounts", "/admin/accounts", "Customers"],
    ["Packages", "/admin/packages", "Plans"],
    ["Billing", "/admin/billing", "Invoices / PayPal"],
    ["Mail", "/admin/mail", "Mailboxes"],
    ["Databases", "/admin/databases", "SQL"],
    ["Files", "/admin/files", "File manager"],
    ["Apps", "/admin/apps", "Installers"],
    ["Installers", "/admin/installers", "One-click"],
    ["Security", "/admin/security", "Edge / guards"],
    ["Health", "/admin/health", "Hosting health"],
    ["Backups", "/admin/backups", "Snapshots"],
    ["PHP", "/admin/php", "PHP INI"],
    ["Stack", "/admin/stack", "Web stack"],
    ["Integrations", "/admin/integrations", "API keys"],
    ["Migrations", "/admin/migrations", "Takeovers"],
    ["Updates", "/admin/updates", "Core updates"],
    ["Support", "/admin/support", "Tickets"],
    ["Logs", "/admin/logs", "Audit"],
    ["Tools", "/admin/tools", "Utilities"],
    ["Manual", "/admin/manual", "Docs"],
  ];

  const USER_COMMANDS = [
    ["Dashboard", "/user/dashboard", "Home"],
    ["Quick tools", "/user/quick", "Daily"],
    ["Sites", "/user/sites", "Websites"],
    ["Domains & SSL", "/user/domains", "DNS"],
    ["Mail", "/user/mail", "Email"],
    ["Databases", "/user/databases", "SQL"],
    ["Files", "/user/files", "File manager"],
    ["Apps", "/user/apps", "Applications"],
    ["Installers", "/user/installers", "One-click"],
    ["Backups", "/user/backups", "Restore"],
    ["Security", "/user/security", "Protection"],
    ["Health", "/user/health", "Checks"],
    ["Billing", "/user/billing", "Invoices"],
    ["AI tools", "/user/ai", "Providers"],
    ["Tools", "/user/tools", "Utilities"],
    ["Manual", "/user/manual", "Help"],
  ];

  function applyBodyClass() {
    const body = document.body;
    if (!body) return;
    body.classList.toggle("fwp-pro-panel", isPanel());
    body.classList.toggle("fwp-is-admin", isAdmin());
    body.classList.toggle("fwp-is-user", isUser());
    // Ensure skin classes exist on panel shells when present
    document.querySelectorAll(".page-shell-panel").forEach((el) => {
      if (isAdmin()) el.classList.add("panel-skin-admin");
      if (isUser()) el.classList.add("panel-skin-user");
    });
  }

  function ensureCommandPalette() {
    if (document.getElementById("fwp-cmdk-backdrop")) return;
    const backdrop = document.createElement("div");
    backdrop.id = "fwp-cmdk-backdrop";
    backdrop.innerHTML = `
      <div id="fwp-cmdk" role="dialog" aria-modal="true" aria-label="Command palette">
        <input id="fwp-cmdk-input" type="search" placeholder="Jump to a panel tool…" autocomplete="off" />
        <div id="fwp-cmdk-list"></div>
        <div id="fwp-cmdk-hint">Ctrl/Cmd+K open · ↑↓ select · Enter go · Esc close</div>
      </div>`;
    document.body.appendChild(backdrop);

    const input = backdrop.querySelector("#fwp-cmdk-input");
    const list = backdrop.querySelector("#fwp-cmdk-list");
    let active = 0;
    let filtered = [];

    const commands = () => (isAdmin() ? ADMIN_COMMANDS : isUser() ? USER_COMMANDS : []);

    function render() {
      const q = (input.value || "").trim().toLowerCase();
      filtered = commands().filter(([label, href, hint]) =>
        !q || label.toLowerCase().includes(q) || href.toLowerCase().includes(q) || (hint || "").toLowerCase().includes(q),
      );
      active = Math.min(active, Math.max(0, filtered.length - 1));
      list.innerHTML = filtered
        .map(
          ([label, href, hint], i) =>
            `<button type="button" data-href="${href}" class="${i === active ? "active" : ""}"><span>${label}</span><small>${hint || href}</small></button>`,
        )
        .join("") || `<button type="button" disabled><span>No matching tools</span><small>Try another search</small></button>`;
      list.querySelectorAll("button[data-href]").forEach((btn, i) => {
        btn.addEventListener("click", () => go(btn.getAttribute("data-href")));
        btn.addEventListener("mouseenter", () => {
          active = i;
          render();
        });
      });
    }

    function go(href) {
      close();
      if (href) window.location.assign(href);
    }

    function open() {
      if (!isPanel()) return;
      backdrop.classList.add("open");
      input.value = "";
      active = 0;
      render();
      setTimeout(() => input.focus(), 10);
    }

    function close() {
      backdrop.classList.remove("open");
    }

    input.addEventListener("input", () => {
      active = 0;
      render();
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        active = Math.min(filtered.length - 1, active + 1);
        render();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        active = Math.max(0, active - 1);
        render();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[active]) go(filtered[active][1]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    });
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) close();
    });

    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (backdrop.classList.contains("open")) close();
        else open();
      }
      if (e.key === "Escape" && backdrop.classList.contains("open")) close();
    });

    window.__fwpOpenCmdk = open;
  }

  function tokenFromStorage() {
    // Prefer known session keys used by the SPA; try a few safe patterns without scraping secrets to console.
    const keys = Object.keys(localStorage || {});
    for (const key of keys) {
      if (!/token|session|auth|thcz|freeweb/i.test(key)) continue;
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        if (raw.length > 20 && raw.length < 4000 && !raw.trim().startsWith("{")) return raw.replace(/^"|"$/g, "");
        const parsed = JSON.parse(raw);
        const candidate = parsed?.token || parsed?.accessToken || parsed?.sessionToken || parsed?.bearer;
        if (typeof candidate === "string" && candidate.length > 20) return candidate;
      } catch {
        /* ignore */
      }
    }
    return "";
  }

  async function apiGet(path, token) {
    const res = await fetch(path, {
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "same-origin",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }

  function ensureAutomationStrip() {
    if (!isAdmin()) return;
    let strip = document.getElementById("fwp-auto-strip");
    if (!strip) {
      strip = document.createElement("div");
      strip.id = "fwp-auto-strip";
      strip.innerHTML = `
        <strong>Owner automation</strong>
        <span class="pill" id="fwp-auto-paypal">PayPal …</span>
        <span class="pill" id="fwp-auto-health">Health …</span>
        <span class="pill" id="fwp-auto-billing">Billing …</span>
        <button type="button" class="button button-secondary" id="fwp-auto-cmdk">Command palette</button>
        <button type="button" class="button button-primary" id="fwp-auto-billing-link">Open billing</button>
      `;
      const host =
        document.querySelector(".panel-main") ||
        document.querySelector(".page-shell-panel") ||
        document.querySelector("main") ||
        document.body;
      host.prepend(strip);
      strip.querySelector("#fwp-auto-cmdk")?.addEventListener("click", () => window.__fwpOpenCmdk?.());
      strip.querySelector("#fwp-auto-billing-link")?.addEventListener("click", () => {
        window.location.assign("/admin/billing");
      });
    }
    refreshAutomation(strip);
  }

  async function refreshAutomation(strip) {
    const paypal = strip.querySelector("#fwp-auto-paypal");
    const health = strip.querySelector("#fwp-auto-health");
    const billing = strip.querySelector("#fwp-auto-billing");
    const token = tokenFromStorage();
    try {
      const methods = await apiGet("/api/v1/billing/payment-methods");
      const list = Array.isArray(methods) ? methods : methods?.methods || methods?.items || [];
      const paypalOk = list.some((m) => String(m.id || m.provider || m.key || "").toLowerCase().includes("paypal") && m.enabled !== false);
      paypal.textContent = paypalOk ? "PayPal ready" : "PayPal check";
      paypal.className = `pill ${paypalOk ? "ok" : "warn"}`;
    } catch {
      paypal.textContent = "PayPal n/a";
      paypal.className = "pill warn";
    }
    if (!token) {
      health.textContent = "Sign in for live health";
      billing.textContent = "Session required";
      health.className = "pill warn";
      billing.className = "pill warn";
      return;
    }
    try {
      const summary = await apiGet("/api/v1/system/summary", token);
      const ok = summary?.status === "ok" || summary?.healthy !== false;
      health.textContent = ok ? "System healthy" : "System attention";
      health.className = `pill ${ok ? "ok" : "warn"}`;
    } catch {
      health.textContent = "Health n/a";
      health.className = "pill warn";
    }
    try {
      const invoices = await apiGet("/api/v1/billing/invoices", token);
      const list = Array.isArray(invoices) ? invoices : invoices?.invoices || invoices?.items || [];
      const open = list.filter((i) => /open|due|pending|unpaid/i.test(String(i.status || i.state || ""))).length;
      billing.textContent = open ? `${open} open invoice(s)` : "Invoices clear";
      billing.className = `pill ${open ? "warn" : "ok"}`;
    } catch {
      billing.textContent = "Billing n/a";
      billing.className = "pill warn";
    }
  }

  function densifyTables() {
    document.querySelectorAll("table").forEach((table) => {
      table.setAttribute("data-fwp-enhanced", "1");
    });
  }

  function boot() {
    applyBodyClass();
    if (!isPanel()) return;
    ensureCommandPalette();
    ensureAutomationStrip();
    densifyTables();
  }

  // React SPA route changes
  const wrapHistory = (type) => {
    const orig = history[type];
    return function patched(...args) {
      const ret = orig.apply(this, args);
      queueMicrotask(boot);
      return ret;
    };
  };
  history.pushState = wrapHistory("pushState");
  history.replaceState = wrapHistory("replaceState");
  window.addEventListener("popstate", () => queueMicrotask(boot));

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  // Re-apply as lazy admin/user chunks mount
  let n = 0;
  const timer = setInterval(() => {
    boot();
    n += 1;
    if (n > 40) clearInterval(timer);
  }, 500);
})();
