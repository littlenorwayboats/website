export function IronDivider() {
  return (
    <div
      className="relative mx-auto h-3 w-full max-w-6xl px-4"
      aria-hidden="true"
    >
      <div className="absolute inset-x-6 top-1/2 h-[6px] -translate-y-1/2 rounded-sm bg-linear-to-r from-[#3a3530] via-[#6b6560] to-[#3a3530] shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
      <span className="absolute top-1/2 left-4 size-3 -translate-y-1/2 rounded-full border border-[#8a8378] bg-[#4a4540] shadow-inner" />
      <span className="absolute top-1/2 right-4 size-3 -translate-y-1/2 rounded-full border border-[#8a8378] bg-[#4a4540] shadow-inner" />
      <span className="absolute top-1/2 left-1/2 h-0 w-0 -translate-x-1/2 -translate-y-[2px] border-x-[8px] border-t-[8px] border-x-transparent border-t-[#1c1814]" />
    </div>
  );
}
