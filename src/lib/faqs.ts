  export type FaqItem = {
    id?: string;
    question: string;
    answer: string;
  };

  export type FaqSection = {
    id: string;
    title: string;
    items: FaqItem[];
  };

  export const faqSections: FaqSection[] = [
    {
      id: "basics",
      title: "Basics",
      items: [
        {
          question: "When will you start offering boat rentals?",
          answer:
            'The boat is currently in dry storage and will be at the slip in December. We will start with a soft launch before officially opening self-bookings on the website in January 2027. If you are interested in booking a charter beforehand, please <a class="underline" href="/contacts/">contact us</a> or sign up for launch updates on the <a class="underline" href="/">homepage</a>.',
        },
        {
          id: "no-experience",
          question: "Do I need boating experience?",
          answer:
            "No experience required. The driver must be 25 or older with a valid driver's license. Before you cast off, they get a short safety briefing and operating instructions. The longship tops out around 6 mph and steers much like a golf cart — quiet, simple, and built for harbor cruising.",
        },
        {
          question: "Who can drive the boat?",
          answer:
            "Your driver must be age 25+ with valid driver's license in hand. We walk them through a brief safety orientation and boat tutorial at the dock before you leave.",
        },
        {
          question: "Can we play music on the boat?",
          answer:
            "Aye. The boat has a Bluetooth stereo ready for your playlist. Our crew will help you pair up before you push off, so the fjord soundtrack starts on cue.",
        },
        {
          question: "How many passengers are allowed?",
          answer:
            "Up to 10 guests aboard, including the driver and any children. Capacity is set for comfort and Coast Guard rules — little Vikings count as passengers too.",
        },
        {
          question: "Is there an age limit to be a passenger?",
          answer:
            "No. All ages are welcome on the raid. Infants and kids count toward the passenger limit, so pack the crew list accordingly.",
        },
        {
          question: "What can I bring with me?",
          answer:
            "Picnics, snacks, and drinks are welcome. Skip glass cups and breakable drinkware — wine bottles are fine if you handle them with care (a cleaning fee applies if glass breaks). Pack out what you pack in.",
        },
        {
          question: "Where can we take the boat?",
          answer:
            "Stay within Liberty Bay and the harbor limits we outline at check-in. No shoreline docking, no shallow areas and no open-sound expeditions — this is a scenic coastal cruise, not a North Sea crossing.",
        },
        {
          question: "Can I bring my dog?",
          answer:
            "We love dogs — truly — but only service dogs are allowed aboard the longship. Please let us know when you book so we can ready the deck for your companion.",
        },
      ],
    },
    {
      id: "my-voyage",
      title: "My Voyage",
      items: [
        {
          question: "Where do I park?",
          answer:
            "Use public parking near downtown Poulsbo and the Port of Poulsbo waterfront. Spaces fill on sunny weekends and festival days, so leave a little extra time for the hunt.",
        },
        {
          question: "Where do we meet?",
          answer:
            "There is no separate office — check in at our harbor slip. Exact dock directions land in your confirmation email after you book, and again in the reminder before your voyage.",
        },
        {
          question: "What time should I arrive?",
          answer:
            "Aim for about 10 minutes before your reserved start time. That gives us room to greet the crew, finish paperwork, and get your skipper oriented without eating into cruise time.",
        },
        {
          question: "What is the orientation process?",
          answer:
            "On arrival we wrap up any remaining paperwork, then walk your designated skipper through a safety checkout and boat tutorial. We escort you to the longship, answer last questions, and help you clear the dock so the odyssey can begin.",
        },
      ],
    },
    {
      id: "safety",
      title: "Safety & Restrictions",
      items: [
        {
          question: "What are the rental rules?",
          answer:
            "Keep a respectful distance from docks and shorelines — no docking anywhere except our slip. Stay inside the harbor limits we give you. No swimming or fishing from the boat, and no smoking or vaping aboard. Follow the crew briefing and you will stay in the good graces of the gods (and the Coast Guard).",
        },
        {
          question: "Are life jackets provided?",
          answer:
            "Yes. Adult life jackets stow under the seats, and we keep a few child and toddler sizes on hand. If your little ones have a favorite personal vest, bring it — a perfect fit makes for a happier voyage.",
        },
        {
          question: "Can we dock anywhere or pick up passengers mid-rental?",
          answer:
            "No docking except at our slip. If you need to pick up or drop off a passenger mid-voyage, tell the crew ahead of time and we will help you plan a safe handoff.",
        },
        {
          question: "What can I not bring on the boat?",
          answer:
            "Leave glass cups and breakable drinkware ashore. Wine bottles are allowed with care; broken glass means a cleaning fee. No smoking or vaping, and nothing that turns the deck into a hazard.",
        },
        {
          question: "Can we swim off the boat?",
          answer:
            "No. Swimming from the longship is not permitted — Liberty Bay is for cruising, not plunging, on these voyages.",
        },
      ],
    },
    {
      id: "pricing",
      title: "Pricing & Policies",
      items: [
        {
          question: "When do I pay for my reservation?",
          answer:
            "You settle the voyage in full when you book. No surprise tribute at the dock. Optional supplemental insurance is offered at checkout, or you can add it later via a QR code when you arrive.",
        },
        {
          question: "What is the cancellation policy?",
          answer:
            "Need to change course? Cancel at least 48 hours before your reservation for a full refund. Cancellations inside that window may incur a late-cancel fee — details appear in your booking confirmation.",
        },
        {
          question: "What is the weather cancellation policy?",
          answer:
            "If wind or visibility makes the harbor unsafe, we will contact you. When we cancel for weather, you can reschedule or receive a full refund at no extra charge. No weather refund unless our crew reaches out first. We may also cancel on the spot if we deem any passenger unable to safely operate the boat — for example, if they cannot understand the safety instructions or are not sober.",
        },
      ],
    },
  ];

  /** Flat list for FAQPage schema and simple consumers. */
  export const faqs: FaqItem[] = faqSections.flatMap((section) => section.items);
