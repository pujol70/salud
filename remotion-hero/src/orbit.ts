import {interpolate} from 'remotion';

export const DEVICE_GEOMETRY = {
  // All coordinates use the 1448 × 1086 composition coordinate system.
  laptopScreen: [[404,262],[1143,207],[1086,823],[318,765]],
  phoneScreen: [[1121,405],[1337,399],[1306,928],[1080,902]],
  screenCenter: {x:737.75,y:514.25},
  // Precise occlusion contours are independent of the animated card geometry.
  laptopSilhouette: 'M0 835 L299 789 L385 260 Q388 236 411 232 L1143 172 Q1171 168 1174 196 L1160 392 L1080 872 L1091 899 L852 971 Q778 997 737 990 L0 904 Z',
  phoneSilhouette: 'M1144 390 L1307 384 Q1358 382 1361 430 L1320 905 Q1318 949 1273 947 L1097 929 Q1059 924 1065 878 L1108 432 Q1110 396 1144 390 Z',
} as const;

export const smoothstep = (v:number) => v*v*(3-2*v);
const clamp = {extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;

/** Pure, periodic orbit: sample(t + period) === sample(t), including reveal. */
export const orbitState = (frame:number, offset:number, period:number) => {
  const p=(((frame+offset)%period)+period)%period/period;
  const theta=interpolate(p,[0,1],[Math.PI/2,Math.PI/2+2*Math.PI]);
  const depth=Math.sin(theta);
  const reveal=smoothstep(interpolate(p,[0,.10,.90,1],[0,1,1,0],clamp));
  // A tilted ellipse changes depth outside the device silhouettes, avoiding pops.
  const x=reveal*570*Math.cos(theta);
  const y=reveal*(-24+260*Math.sin(theta)-.36*570*Math.cos(theta));
  return {
    x,y,depth,reveal,
    scale:reveal*interpolate(depth,[-1,1],[.58,1.13]),
    opacity:reveal,
    rotateX:interpolate(depth,[-1,1],[19,7]),
    rotateY:-12*Math.cos(theta),
    rotateZ:-7*Math.cos(theta),
    // The photographic foreground is always 10. No translateZ sorting conflict.
    zIndex:depth>=0?20+Math.round(depth*10):5+Math.round((depth+1)*3),
    shadowBlur:interpolate(depth,[-1,1],[9,26]),
  };
};
