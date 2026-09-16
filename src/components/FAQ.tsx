import { faqs } from "@/lib/faqs";

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-norse-950 px-4 py-16 texture-noise"
    >
      <div className="mx-auto max-w-3xl">
        <h1
          id="faq-heading"
          className="text-center font-display text-3xl font-semibold tracking-[0.08em] text-gold-bright uppercase md:text-4xl"
        >
          Frequently Asked Questions
        </h1>
        <div className="mt-10 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-sm border border-parchment/20 bg-norse-800 px-4 py-2"
            >
              <summary className="cursor-pointer list-none py-3 font-display font-semibold tracking-wide text-gold marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span
                    className="text-rust transition group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="border-t border-iron/40 pt-3 pb-3 text-mist">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
