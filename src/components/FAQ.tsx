const faqs = [
  {
    question: "Do I need a boating license?",
    answer:
      "No. Each rental starts with a short safety and handling briefing. The boats are electric Duffy models limited to harbor speeds, so they are straightforward to steer.",
  },
  {
    question: "How many people can come aboard?",
    answer:
      "Capacity depends on the boat, typically up to 10 guests including the skipper. We will confirm the exact limit when you book.",
  },
  {
    question: "Are the boats really Viking themed?",
    answer:
      "Yes. Each electric Duffy is dressed as a longship, with a dragon-head prow and round shields along the sides. The look is theatrical; the ride is quiet and modern.",
  },
  {
    question: "Can we bring food, drinks, or dogs?",
    answer:
      "Picnics and non-glass drinks are welcome. Dogs are allowed on leash with a life vest. Please pack out trash and keep paws off the helm.",
  },
  {
    question: "What happens in poor weather?",
    answer:
      "We will contact you if wind or visibility makes the harbor unsafe. You can reschedule at no extra charge when we cancel for weather.",
  },
  {
    question: "Where do we meet?",
    answer:
      "Check in at our harbor slip. Exact dock directions arrive with your confirmation email after you book.",
  },
];

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
          className="text-center font-display text-3xl text-gold uppercase md:text-4xl"
        >
          Frequently Asked Questions
        </h1>
        <div className="mt-10 space-y-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-sm border border-gold/25 bg-norse-800 px-4 py-2"
            >
              <summary className="cursor-pointer list-none py-3 font-semibold text-gold marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span
                    className="text-neon transition group-open:rotate-45"
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
