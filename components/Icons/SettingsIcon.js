import { useState } from 'react';

function SettingsIcon({ color = '#dadada', height = '300', hoverColor = '#dadada' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <svg
      // style="enable-background:new 0 0 478.703 478.703;"
      // xml:space="preserve"
      width={height}
      height={height}
      viewBox="0 0 478 478"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none" />
      <g>
        <title>Layer 1</title>
        <g id="svg_1" fill={isHovered ? hoverColor : color} fillOpacity="1">
          <g id="svg_2" fill={isHovered ? hoverColor : color} fillOpacity="1">
            <path
              d="M454.2,188.45583866930008 l-33.6,-5.7 c-3.5,-11.3 -8,-22.2 -13.5,-32.6 l19.8,-27.7 c8.4,-11.8 7.1,-27.9 -3.2,-38.1 l-29.8,-29.8 c-5.6,-5.6 -13,-8.7 -20.9,-8.7 c-6.2,0 -12.1,1.9 -17.1,5.5 l-27.8,19.8 c-10.8,-5.7 -22.1,-10.4 -33.8,-13.9 l-5.6,-33.2 c-2.4,-14.3 -14.7,-24.7 -29.2,-24.7 h-42.1 c-14.5,0 -26.8,10.4 -29.2,24.7 l-5.8,34 c-11.2,3.5 -22.1,8.1 -32.5,13.7 l-27.5,-19.8 c-5,-3.6 -11,-5.5 -17.2,-5.5 c-7.9,0 -15.4,3.1 -20.9,8.7 l-29.9,29.8 c-10.2,10.2 -11.6,26.3 -3.2,38.1 l20,28.1 c-5.5,10.5 -9.9,21.4 -13.3,32.7 l-33.2,5.6 c-14.3,2.4 -24.7,14.7 -24.7,29.2 v42.1 c0,14.5 10.4,26.8 24.7,29.2 l34,5.8 c3.5,11.2 8.1,22.1 13.7,32.5 l-19.7,27.4 c-8.4,11.8 -7.1,27.9 3.2,38.1 l29.8,29.8 c5.6,5.6 13,8.7 20.9,8.7 c6.2,0 12.1,-1.9 17.1,-5.5 l28.1,-20 c10.1,5.3 20.7,9.6 31.6,13 l5.6,33.6 c2.4,14.3 14.7,24.7 29.2,24.7 h42.2 c14.5,0 26.8,-10.4 29.2,-24.7 l5.7,-33.6 c11.3,-3.5 22.2,-8 32.6,-13.5 l27.7,19.8 c5,3.6 11,5.5 17.2,5.5 l0,0 c7.9,0 15.3,-3.1 20.9,-8.7 l29.8,-29.8 c10.2,-10.2 11.6,-26.3 3.2,-38.1 l-19.8,-27.8 c5.5,-10.5 10.1,-21.4 13.5,-32.6 l33.6,-5.6 c14.3,-2.4 24.7,-14.7 24.7,-29.2 v-42.1 C478.9,203.15583866930007 468.5,190.85583866930008 454.2,188.45583866930008 zM451.9,259.7558386693001 c0,1.3 -0.9,2.4 -2.2,2.6 l-42,7 c-5.3,0.9 -9.5,4.8 -10.8,9.9 c-3.8,14.7 -9.6,28.8 -17.4,41.9 c-2.7,4.6 -2.5,10.3 0.6000000000000001,14.7 l24.7,34.8 c0.7000000000000001,1 0.6000000000000001,2.5 -0.30000000000000004,3.4 l-29.8,29.8 c-0.7000000000000001,0.7000000000000001 -1.4,0.8 -1.9,0.8 c-0.6000000000000001,0 -1.1,-0.2 -1.5,-0.5 l-34.7,-24.7 c-4.3,-3.1 -10.1,-3.3 -14.7,-0.6000000000000001 c-13.1,7.8 -27.2,13.6 -41.9,17.4 c-5.2,1.3 -9.1,5.6 -9.9,10.8 l-7.1,42 c-0.2,1.3 -1.3,2.2 -2.6,2.2 h-42.1 c-1.3,0 -2.4,-0.9 -2.6,-2.2 l-7,-42 c-0.9,-5.3 -4.8,-9.5 -9.9,-10.8 c-14.3,-3.7 -28.1,-9.4 -41,-16.8 c-2.1,-1.2 -4.5,-1.8 -6.8,-1.8 c-2.7,0 -5.5,0.8 -7.8,2.5 l-35,24.9 c-0.5,0.30000000000000004 -1,0.5 -1.5,0.5 c-0.4,0 -1.2,-0.1 -1.9,-0.8 l-29.8,-29.8 c-0.9,-0.9 -1,-2.3 -0.30000000000000004,-3.4 l24.6,-34.5 c3.1,-4.4 3.3,-10.2 0.6000000000000001,-14.8 c-7.8,-13 -13.8,-27.1 -17.6,-41.8 c-1.4,-5.1 -5.6,-9 -10.8,-9.9 l-42.3,-7.2 c-1.3,-0.2 -2.2,-1.3 -2.2,-2.6 v-42.1 c0,-1.3 0.9,-2.4 2.2,-2.6 l41.7,-7 c5.3,-0.9 9.6,-4.8 10.9,-10 c3.7,-14.7 9.4,-28.9 17.1,-42 c2.7,-4.6 2.4,-10.3 -0.7000000000000001,-14.6 l-24.9,-35 c-0.7000000000000001,-1 -0.6000000000000001,-2.5 0.30000000000000004,-3.4 l29.8,-29.8 c0.7000000000000001,-0.7000000000000001 1.4,-0.8 1.9,-0.8 c0.6000000000000001,0 1.1,0.2 1.5,0.5 l34.5,24.6 c4.4,3.1 10.2,3.3 14.8,0.6000000000000001 c13,-7.8 27.1,-13.8 41.8,-17.6 c5.1,-1.4 9,-5.6 9.9,-10.8 l7.2,-42.3 c0.2,-1.3 1.3,-2.2 2.6,-2.2 h42.1 c1.3,0 2.4,0.9 2.6,2.2 l7,41.7 c0.9,5.3 4.8,9.6 10,10.9 c15.1,3.8 29.5,9.7 42.9,17.6 c4.6,2.7 10.3,2.5 14.7,-0.6000000000000001 l34.5,-24.8 c0.5,-0.30000000000000004 1,-0.5 1.5,-0.5 c0.4,0 1.2,0.1 1.9,0.8 l29.8,29.8 c0.9,0.9 1,2.3 0.30000000000000004,3.4 l-24.7,34.7 c-3.1,4.3 -3.3,10.1 -0.6000000000000001,14.7 c7.8,13.1 13.6,27.2 17.4,41.9 c1.3,5.2 5.6,9.1 10.8,9.9 l42,7.1 c1.3,0.2 2.2,1.3 2.2,2.6 v42.1 H451.9 z"
              id="svg_3"
              fill={isHovered ? hoverColor : color}
              fillOpacity="1"
            />
            <path
              d="M239.4,135.35583866930008 c-57,0 -103.3,46.3 -103.3,103.3 s46.3,103.3 103.3,103.3 s103.3,-46.3 103.3,-103.3 S296.4,135.35583866930008 239.4,135.35583866930008 zM239.4,314.9558386693001 c-42.1,0 -76.3,-34.2 -76.3,-76.3 s34.2,-76.3 76.3,-76.3 s76.3,34.2 76.3,76.3 S281.5,314.9558386693001 239.4,314.9558386693001 z"
              id="svg_4"
              fill={isHovered ? hoverColor : color}
              fillOpacity="1"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default SettingsIcon;
