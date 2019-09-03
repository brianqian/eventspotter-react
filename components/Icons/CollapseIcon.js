function CollapseIcon({ color = '#000', height = '300' }) {
  return (
    <svg width={height} height={height} viewBox="0 0 306 306">
      <rect width="100%" height="100%" x="0" y="0" fill="none" stroke="none" />
      <g className="currentLayer">
        <g id="svg_1" className="selected" fill={color} fillOpacity="1">
          <g id="expand-more" fill={color} fillOpacity="1">
            <polygon
              points="153,58.65 0,211.65 35.7,247.35 153,130.05 270.3,247.35 306,211.65   "
              id="svg_2"
              fill={color}
              fillOpacity="1"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default CollapseIcon;
