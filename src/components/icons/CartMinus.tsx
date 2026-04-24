export const CartMinus = ({ strokeColor = 'currentColor' }: { strokeColor?: string }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    role="img"
    width="24px"
    height="24px"
    fill="none"
  >
    <path stroke={strokeColor} strokeMiterlimit="10" strokeWidth="1.5" d="M18 12H6"></path>
  </svg>
)