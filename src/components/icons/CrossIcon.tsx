export const CrossIcon = ({
  strokeColor = 'currentColor',
  styles,
}: {
  strokeColor?: string
  styles?: string
}) => (
  <svg
    className={styles}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    role="img"
    width="24px"
    height="24px"
    fill="none"
  >
    <path
      stroke={strokeColor}
      strokeWidth="1.5"
      d="M18.973 5.027L5.028 18.972m0-13.945l13.944 13.945"
    ></path>
  </svg>
)