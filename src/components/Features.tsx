import type { ReactNode } from "react";
import { type RuneVariant, runeStrokes, runeViewBox } from "./runePaths";

const features: {
  title: string;
  body: string;
  icon: ReactNode;
}[] = [
  {
    title: "100% Electric",
    body: "Quiet, clean and eco-friendly.",
    icon: <RuneIcon variant="sowilo" label="Sowilō rune — sun and energy" />,
  },
  {
    title: "Perfect for Groups",
    body: "Up to 10 passengers. All ages welcome.",
    icon: <RuneIcon variant="mannaz" label="Mannaz rune — people" />,
  },
  {
    title: "Explore the Sound",
    body: "Experience Poulsbo's stunning Liberty Bay from the water.",
    icon: <RuneIcon variant="laguz" label="Laguz rune — water" />,
  },
  {
    title: "Unique Viking Design",
    body: "Dressed as a Viking longship for a fun Little Norway experience.",
    icon: <RuneIcon variant="kenaz" label="Kenaz rune — craft and creativity" />,
  },
];

const RUNE_INK = "#131112";

function RuneIcon({
  variant,
  label,
}: {
  variant: RuneVariant;
  label: string;
}) {
  return (
    <svg
      viewBox={runeViewBox}
      className="h-14 w-14"
      role="img"
      aria-label={label}
    >
      <path d={runeStrokes[variant]} fill={RUNE_INK} fillRule="evenodd" />
    </svg>
  );
}

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="content-auto bg-parchment px-4 py-14 texture-noise md:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <h2 id="features-heading" className="sr-only">
          Why sail with Little Norway
        </h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <li
              key={feature.title}
              className={`px-6 py-8 text-center sm:py-10 lg:px-8 ${
                index !== 0 ? "lg:border-l lg:border-iron/30" : ""
              }`}
            >
              <article className="flex flex-col items-center">
                <div>{feature.icon}</div>
                <h3 className="mt-5 text-sm font-bold tracking-label text-charcoal uppercase">
                  {feature.title}
                </h3>
                <p className="mt-2 max-w-[16rem] text-base leading-6 text-iron">
                  {feature.body}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}