"use client";

import { useEffect, useRef } from "react";
import { faqSections } from "@/lib/faqs";

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
                      <p className="border-t border-iron/40 pt-3 pb-3 text-mist">
                        {item.answer}
                      </p>
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
