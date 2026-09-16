"use client";

import { FormEvent } from "react";
import { ContactEmailLink } from "./ContactEmailLink";
import { contactMailtoHref } from "@/lib/contact-email";
import { INSTAGRAM_URL, SITE_AREA } from "@/lib/site";

export function Contact() {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    window.location.href = contactMailtoHref({
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    });
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="flex flex-1 flex-col bg-norse-900 px-4 py-16 texture-noise"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <h1
            id="contact-heading"
            className="font-display text-3xl font-semibold tracking-[0.08em] text-gold-bright uppercase md:text-4xl"
          >
            Contact
          </h1>
          <p className="mt-4 max-w-md text-mist">
            Questions about a voyage, a private event, or accessibility aboard?
            Email the crew or reach us on Instagram.
          </p>
          <address className="mt-8 not-italic text-parchment">
            <p className="font-display text-sm font-semibold tracking-section text-gold uppercase">
              Address
            </p>
            <p className="mt-2">
              {SITE_AREA}
              <br />
              Exact dock directions arrive with your booking confirmation.
            </p>
            <p className="mt-4">
              <span className="block font-display text-sm font-semibold tracking-section text-gold uppercase">
                Email
              </span>
              <ContactEmailLink className="mt-2 inline-block hover:text-rust" />
            </p>
            <p className="mt-4">
              <a
                className="hover:text-rust"
                href={INSTAGRAM_URL}
                rel="noreferrer noopener"
              >
                Instagram @littlenorwayboats
              </a>
            </p>
          </address>
        </div>

        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block font-display text-sm font-semibold tracking-label text-gold uppercase"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="mt-1 w-full rounded-sm border border-iron bg-norse-950 px-3 py-2 text-parchment"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-display text-sm font-semibold tracking-label text-gold uppercase"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 w-full rounded-sm border border-iron bg-norse-950 px-3 py-2 text-parchment"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block font-display text-sm font-semibold tracking-label text-gold uppercase"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1 w-full rounded-sm border border-iron bg-norse-950 px-3 py-2 text-parchment"
            />
          </div>
          <button
            type="submit"
            className="neon-btn rounded-sm px-6 py-3 font-display text-sm font-semibold tracking-cta uppercase"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
