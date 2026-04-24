export const SummaryArrow = ({
  strokeColor = 'currentColor',
  styles,
}: {
  strokeColor?: string
  styles?: string
}) => (
  <svg
    aria-hidden="true"
    className={`nds-summary-control ${styles}`}
    focusable="false"
    viewBox="0 0 24 24"
    role="img"
    width="24px"
    height="24px"
    fill="none"
  >
    <path stroke={strokeColor} strokeWidth="1.5" d="M18.966 8.476L12 15.443 5.033 8.476"></path>
  </svg>
)