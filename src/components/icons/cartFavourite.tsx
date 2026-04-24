export const CartFavourite = ({
  strokeColor = 'currentColor',
  styles,
}: {
  strokeColor?: string
  styles?: string
}) => (
  <svg
    className={styles}
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
      d="M15.566 5.75c.984 0 1.91.385 2.606 1.082a3.707 3.707 0 010 5.228L12 18.25l-6.172-6.19a3.707 3.707 0 010-5.227A3.656 3.656 0 018.434 5.75c.985 0 1.91.385 2.606 1.082l.565.567.395.396.394-.396.566-.567a3.658 3.658 0 012.606-1.082"
    ></path>
  </svg>
)