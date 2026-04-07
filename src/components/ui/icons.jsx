// src/features/parent/components/ui/icons.js

export const Bell = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2z" fill="currentColor" />
    <path
      d="M18 8a6 6 0 0 0-12 0v5l-2 2v1h16v-1l-2-2V8z"
      stroke="none"
      fill="currentColor"
    />
  </svg>
);

export const Phone = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M6.6 10.8a15.05 15.05 0 0 0 6.6 6.6l1.9-1.9a1 1 0 0 1 1.1-.2c1.2.5 2.6.8 4 .8a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C9.7 21 3 14.3 3 5.5A1 1 0 0 1 4 4.5H7.5a1 1 0 0 1 1 1c0 1.4.3 2.8.8 4a1 1 0 0 1-.2 1.1l-1.9 1.9z"
      fill="currentColor"
    />
  </svg>
);

export const Calendar = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M7 10h10v2H7zM19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
);

export const Book = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M18 2H6c-1.1 0-2 .9-2 2v16l7-3 7 3V4c0-1.1-.9-2-2-2z"
      fill="currentColor"
    />
  </svg>
);

export const Send = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M2 21l21-9L2 3v7l15 2-15 2z" fill="currentColor" />
  </svg>
);
