"use client";

import { FormEvent, useState } from "react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-norse-900 px-4 py-16 texture-noise"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <h1
            id="contact-heading"
            className="font-display text-3xl text-gold uppercase md:text-4xl"
          >
            Contacts
          </h1>
          <p className="mt-4 max-w-md text-mist">
            Questions about a voyage, a private event, or accessibility aboard?
            Reach the crew directly.
          </p>
          <address className="mt-8 not-italic text-parchment">
            <p className="font-semibold tracking-widest text-gold uppercase">
              Address
            </p>
            <p className="mt-2">
              Lorem ipsum dolor sit amet
              <br />
              Consectetur adipiscing elit
            </p>
            <p className="mt-4">
              <a className="hover:text-gold" href="tel:+15555555555">
                (555) 555-5555
              </a>
            </p>
            <p>
              <a className="hover:text-gold" href="mailto:email@example.com">
                email@example.com
              </a>
            </p>
          </address>
        </div>

        {submitted ? (
          <p
            className="self-center rounded-sm border border-neon/40 bg-norse-950 p-6 text-parchment"
            role="status"
          >
            Thank you. The crew has your message and will reply by email.
          </p>
        ) : (
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gold">
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
              <label htmlFor="email" className="block text-sm font-semibold text-gold">
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
              <label htmlFor="message" className="block text-sm font-semibold text-gold">
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
              className="neon-btn rounded-sm px-6 py-3 text-sm font-semibold tracking-[0.18em] uppercase"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
