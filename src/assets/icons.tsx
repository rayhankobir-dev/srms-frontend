export const LoaderIcon = ({ className = "" }) => (
  <svg
    className={className + " animate-spin"}
    stroke="currentColor"
    fill="none"
    stroke-width="2"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    height="200px"
    width="200px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 6l0 -3"></path>
    <path d="M6 12l-3 0"></path>
    <path d="M7.75 7.75l-2.15 -2.15"></path>
  </svg>
);
