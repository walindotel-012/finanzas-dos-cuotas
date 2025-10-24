// src/components/ui/Icons.jsx
// Minimal icon set built with inline SVG so we do not depend on external libraries.
const baseProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function MenuIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function ExportIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M12 4v12" />
      <path d="M7.5 9.5L12 5l4.5 4.5" />
      <path d="M5 20h14" />
    </svg>
  );
}

export function MailIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M3 6h18v12H3z" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  );
}

export function DashboardIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M4 4h7v9H4z" />
      <path d="M13 4h7v5h-7z" />
      <path d="M13 11h7v9h-7z" />
      <path d="M4 15h7v5H4z" />
    </svg>
  );
}

export function CreditCardIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h3" />
    </svg>
  );
}

export function CashIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 10h2" />
      <path d="M3 14h2" />
      <path d="M19 10h2" />
      <path d="M19 14h2" />
    </svg>
  );
}

export function UsersIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M5 20v-1a4 4 0 014-4h2a4 4 0 014 4v1" />
      <circle cx="11" cy="9" r="3" />
      <path d="M16 11a3 3 0 110 6" />
      <path d="M19 20v-1a3 3 0 00-3-3h-1" />
    </svg>
  );
}

export function HistoryIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M12 8v5l3 2" />
      <path d="M3 12a9 9 0 109-9" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

export function CategoryIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M6 3h6l8 8-6 6-8-8z" />
      <path d="M7 7l3-3" />
      <circle cx="15" cy="15" r="1.5" />
    </svg>
  );
}

export function WalletIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <path d="M3 7h18v10H3z" />
      <path d="M3 9h18" />
      <path d="M15 13h2" />
    </svg>
  );
}

export function InfoIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01" />
      <path d="M11 12h1v4h1" />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function DollarIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...baseProps}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10" />
      <path d="M9.5 9.5a2.5 2.5 0 012.5-2.5h1a2.5 2.5 0 010 5h-2a2.5 2.5 0 000 5h1a2.5 2.5 0 002.5-2.5" />
    </svg>
  );
}
