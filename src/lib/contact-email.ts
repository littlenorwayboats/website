const MASK = 42;
const PACKED = [
  70, 67, 94, 94, 70, 79, 68, 69, 88, 93, 75, 83, 72, 69, 75, 94, 89, 106, 77,
  71, 75, 67, 70, 4, 73, 69, 71,
];

export function decodeContactEmail(): string {
  return String.fromCharCode(...PACKED.map((code) => code ^ MASK));
}

export function contactMailtoHref({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): string {
  const to = decodeContactEmail();
  const subject = encodeURIComponent(
    name ? `Harbor question from ${name}` : "Harbor question",
  );
  const body = encodeURIComponent(
    [`From: ${name} <${email}>`, "", message].join("\n"),
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
