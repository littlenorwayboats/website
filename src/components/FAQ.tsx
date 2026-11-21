"use client";

import { useEffect, useRef } from "react";
import { faqSections } from "@/lib/faqs";
import { SITE_LAUNCHED } from "@/lib/preview";

export function FAQ() {
  const detailsRefs = useRef(new Map<string, HTMLDetailsElement>());

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const target = detailsRefs.current.get(hash);
    if (!target) return;

    target.open = true;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-norse-950 px-4 py-16 texture-noise"
    >
      <div className="mx-auto max-w-3xl">
        <h1
          id="faq-heading"
          className="text-center text-3xl font-bold tracking-[0.08em] text-gold-bright uppercase md:text-4xl"
        >
          Frequently Asked Questions
        </h1>

        {SITE_LAUNCHED ? null : (
          <p className="mx-auto mt-6 max-w-2xl text-center text-mist">
            We&apos;re gearing up for a January 2027 soft launch and will add
            answers here as they&apos;re ready.{" "}
            <a className="underline" href="/#signup">
              Sign up on the homepage
            </a>{" "}
            if you&apos;d like a heads-up when we go live.
          </p>
        )}

        <div className="mt-12 space-y-12">
          {faqSections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-xl font-bold tracking-[0.08em] text-gold uppercase md:text-2xl">
                {section.title}
              </h2>
              <div className="mt-5 space-y-3">
                {section.items.map((item) => {
                  const { id } = item;
                  return (
                    <details
                      key={item.question}
                      id={id}
                      ref={
                        id
                          ? (el) => {
                              if (el) detailsRefs.current.set(id, el);
                              else detailsRefs.current.delete(id);
                            }
                          : undefined
                      }
                      className="group scroll-mt-24 rounded-sm border border-parchment/20 bg-norse-800 px-4 py-2"
                    >
                      <summary className="cursor-pointer list-none py-3 font-bold tracking-wide text-gold marker:content-none [&::-webkit-details-marker]:hidden">
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
                      <p
                        className="border-t border-iron/40 pt-3 pb-3 text-mist [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    </details>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
