function ExpandCollapseIcon({ color = '#000', height = '300', collapse }) {
  return (
    <svg width={height} height={height} viewBox="0 0 306 306">
      <rect width="100%" height="100%" x="0" y="0" fill="none" stroke="none" />
      <g className="currentLayer">
        <g className="selected" fill={color} fillOpacity="1">
          <g fill={color} fillOpacity="1">
            <polygon
              points={
                collapse
                  ? '153,58.65 0,211.65 35.7,247.35 153,130.05 270.3,247.35 306,211.65'
                  : '269.65,58.65 152.355,175.95 35.055,58.65 -0.645,94.35 152.355,247.35 305.355,94.35'
              }
              fill={color}
              fillOpacity="1"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default ExpandCollapseIcon;
