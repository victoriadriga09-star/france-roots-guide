/**
 * BankLogo — inline SVG monograms for bank brand recognition.
 * No remote assets, no broken images. Hand-tuned per bank.
 *
 * If `href` is provided, the logo wraps in an <a> opening the bank's site.
 */
interface BankLogoProps {
  bank: string;
  size?: number;
  className?: string;
  href?: string;
}

const BANK_URLS: Record<string, string> = {
  revolut: "https://www.revolut.com/fr-FR/",
  n26: "https://n26.com/fr-fr",
  "société générale": "https://particuliers.sg.fr/ouvrir-compte-bancaire",
  "societe generale": "https://particuliers.sg.fr/ouvrir-compte-bancaire",
  socgen: "https://particuliers.sg.fr/ouvrir-compte-bancaire",
  bnp: "https://mabanque.bnpparibas/fr/ouvrir-un-compte",
  "bnp paribas": "https://mabanque.bnpparibas/fr/ouvrir-un-compte",
  "crédit agricole": "https://www.credit-agricole.fr/",
  "credit agricole": "https://www.credit-agricole.fr/",
  lcl: "https://www.lcl.fr/",
  boursorama: "https://www.boursorama-banque.com/",
};

export function getBankUrl(bank: string): string | undefined {
  return BANK_URLS[bank.toLowerCase()];
}

export function BankLogo({ bank, size = 48, className = "", href }: BankLogoProps) {
  const key = bank.toLowerCase();
  const resolvedHref = href ?? getBankUrl(bank);

  const inner = renderLogo(key, bank, size, className);

  if (resolvedHref) {
    return (
      <a
        href={resolvedHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${bank} account`}
        className="inline-block transition-transform active:scale-95 hover:scale-105"
        onClick={(e) => e.stopPropagation()}
      >
        {inner}
      </a>
    );
  }
  return inner;
}

function renderLogo(key: string, bank: string, size: number, className: string) {
  if (key.includes("revolut")) {
    return (
      <div
        className={className}
        style={tile(size, "#000000", "0 4px 12px rgba(0,0,0,0.4)")}
        aria-label="Revolut"
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 32 32" fill="none">
          <path
            d="M5 27 V5 H17 a7 7 0 0 1 0 14 H11 l9 8 H14 L7 19 H11"
            fill="#FFFFFF"
            stroke="#FFFFFF"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  if (key.includes("n26")) {
    return (
      <div
        className={className}
        style={tile(size, "#36A18B", "0 4px 12px rgba(54,161,139,0.35)")}
        aria-label="N26"
      >
        <span style={wordmark(size, 0.36, "#FFFFFF", "-1px")}>N26</span>
      </div>
    );
  }

  if (key.includes("société") || key.includes("societe") || key.includes("socgen")) {
    return (
      <div
        className={className}
        style={{
          ...tile(size, "transparent", "0 4px 12px rgba(0,0,0,0.35)"),
          overflow: "hidden",
          flexDirection: "column",
        }}
        aria-label="Société Générale"
      >
        <div style={{ flex: 1, width: "100%", background: "#000000" }} />
        <div style={{ flex: 1, width: "100%", background: "#E60012" }} />
      </div>
    );
  }

  if (key.includes("bnp")) {
    return (
      <div className={className} style={tile(size, "#009639", "0 4px 12px rgba(0,150,57,0.35)")} aria-label="BNP Paribas">
        <span style={wordmark(size, 0.32, "#FFFFFF")}>BNP</span>
      </div>
    );
  }

  if (key.includes("agricole")) {
    return (
      <div className={className} style={tile(size, "#009A3D", "0 4px 12px rgba(0,154,61,0.35)")} aria-label="Crédit Agricole">
        <span style={wordmark(size, 0.34, "#FFFFFF")}>CA</span>
      </div>
    );
  }

  if (key.includes("lcl")) {
    return (
      <div className={className} style={tile(size, "#FFE15B", "0 4px 12px rgba(255,225,91,0.45)")} aria-label="LCL">
        <span style={wordmark(size, 0.34, "#1A1A1A")}>LCL</span>
      </div>
    );
  }

  if (key.includes("boursorama")) {
    return (
      <div className={className} style={tile(size, "#E5097F", "0 4px 12px rgba(229,9,127,0.35)")} aria-label="Boursorama">
        <span style={wordmark(size, 0.32, "#FFFFFF")}>Bo</span>
      </div>
    );
  }

  // Fallback: lemon monogram
  return (
    <div
      className={className}
      style={{
        ...tile(size, "linear-gradient(135deg, #F8FFA1 0%, #E8EF7A 100%)", "0 4px 12px rgba(248,255,161,0.35)"),
      }}
      aria-label={bank}
    >
      <span style={wordmark(size, 0.45, "#000000")}>{bank[0]}</span>
    </div>
  );
}

function tile(size: number, background: string, shadow: string): React.CSSProperties {
  return {
    width: size,
    height: size,
    background,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: shadow,
  };
}

function wordmark(size: number, scale: number, color: string, letterSpacing = "normal"): React.CSSProperties {
  return {
    color,
    fontFamily: "Unbounded, sans-serif",
    fontWeight: 800,
    fontSize: size * scale,
    letterSpacing,
  };
}
