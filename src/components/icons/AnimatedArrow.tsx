export const AnimatedArrow = ({ expanded, addClasses }: { expanded: boolean; addClasses?: string }) => (
  <div
    className={`w-3.5 h-3.5 ${expanded ? 'filter-arrow-open' : ''} ${addClasses ? addClasses : 'absolute right-0 top-1/2 -translate-y-1/2'}`}
  >
    <span className="filter-arrow-left" />
    <span className="filter-arrow-right" />
  </div>
)