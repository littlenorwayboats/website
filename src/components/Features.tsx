import type { ReactNode } from "react";

const features: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "100% Electric",
    body: "Quiet, clean and boat friendly.",
    icon: <BoltIcon />,
  },
  {
    title: "Unique Viking Design",
    body: "Wood panel wrap, shields and a dragon prow.",
    icon: <WheelIcon />,
  },
  {
    title: "Perfect for Groups",
    body: "Up to 6 passengers.",
    icon: <GroupIcon />,
  },
  {
    title: "Explore the Sound",
    body: "Your adventure starts on the water.",
    icon: <WavesIcon />,
  },
];

function BoltIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-12 w-12"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M27.2 4.5 10.8 24.8c-.7.9 0 2.2 1.2 2.2h11.1L19.6 43.2c-.5 1.3 1.1 2.3 2.1 1.3l16.8-20.8c.7-.9 0-2.2-1.2-2.2H25.8l4.1-15.7c.4-1.3-1.2-2.3-2.2-1.3Z" />
    </svg>
  );
}

function WheelIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-12 w-12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="9" />
      <circle cx="24" cy="24" r="3.4" />
      <path d="M24 8v32M8 24h32M12.7 12.7l22.6 22.6M35.3 12.7 12.7 35.3" />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-12 w-12"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="13" cy="16.8" r="4.1" />
      <path d="M5.8 32.6c0-4.8 3.2-8 7.2-8s7.2 3.2 7.2 8v.6H5.8z" />
      <circle cx="35" cy="16.8" r="4.1" />
      <path d="M27.8 32.6c0-4.8 3.2-8 7.2-8s7.2 3.2 7.2 8v.6H27.8z" />
      <circle cx="24" cy="15.4" r="5" />
      <path d="M14.8 35.2c0-6 4.1-10 9.2-10s9.2 4 9.2 10v1H14.8z" />
    </svg>
  );
}

function WavesIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-12 w-12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 18c3.2-3.6 6.4-3.6 9.6 0s6.4 3.6 9.6 0 6.4-3.6 9.6 0 6.4 3.6 9.6 0" />
      <path d="M6 24c3.2-3.6 6.4-3.6 9.6 0s6.4 3.6 9.6 0 6.4-3.6 9.6 0 6.4 3.6 9.6 0" />
      <path d="M6 30c3.2-3.6 6.4-3.6 9.6 0s6.4 3.6 9.6 0 6.4-3.6 9.6 0 6.4 3.6 9.6 0" />
    </svg>
  );
}

export function Features() {
  return (
    <section
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
                <div className="text-charcoal">{feature.icon}</div>
                <h3 className="mt-5 font-display text-sm font-semibold tracking-label text-charcoal uppercase">
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
