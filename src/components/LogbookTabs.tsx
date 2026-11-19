"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

const TABS = [
  { id: "blog", label: "Blog" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function LogbookTabs({
  blog,
  gallery,
  about,
}: {
  blog: ReactNode;
  gallery: ReactNode;
  about: ReactNode;
}) {
  const [active, setActive] = useState<TabId>("blog");
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panels = { blog, gallery, about } as const;

  function selectTab(id: TabId, focus = false) {
    setActive(id);
    if (!focus) return;
    const index = TABS.findIndex((tab) => tab.id === id);
    tabRefs.current[index]?.focus();
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % TABS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + TABS.length) % TABS.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = TABS.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectTab(TABS[next].id, true);
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Logbook sections"
        className="mx-auto flex max-w-3xl justify-center gap-1 border-b border-iron/40 px-4 sm:gap-2"
      >
        {TABS.map((tab, index) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${baseId}-${tab.id}-tab`}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              aria-controls={`${baseId}-${tab.id}-panel`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={`relative -mb-px px-4 py-3 text-sm font-bold tracking-label uppercase transition-colors sm:px-5 ${
                selected
                  ? "border-b-2 border-rust text-gold-bright"
                  : "border-b-2 border-transparent text-mist hover:text-gold"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {TABS.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-${tab.id}-panel`}
          aria-labelledby={`${baseId}-${tab.id}-tab`}
          hidden={active !== tab.id}
          className="mt-10"
        >
          {panels[tab.id]}
        </div>
      ))}
    </div>
  );
}
