import { Hero } from "./Hero";
import MailingList from "./MailingList";

export function ComingSoon() {
  return (
    <main id="main-content" className="min-w-0 flex-1">
      <Hero action={<MailingList />} />
    </main>
  );
}
