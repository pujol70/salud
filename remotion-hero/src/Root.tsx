import React from 'react';
import {AbsoluteFill, CanvasImage, Composition, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {PortfolioCard, type DemoVariant} from './PortfolioCard';
import {DEVICE_GEOMETRY, orbitState} from './orbit';

const FloatingCard:React.FC<{variant:DemoVariant;phaseSeconds:number}>=({variant,phaseSeconds})=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const orbit=orbitState(frame,phaseSeconds*fps,10*fps);
  return <div data-card={variant} data-depth={orbit.depth} data-layer={orbit.zIndex} style={{
    position:'absolute',left:DEVICE_GEOMETRY.screenCenter.x-126,top:DEVICE_GEOMETRY.screenCenter.y-90,
    width:252,height:180,zIndex:orbit.zIndex,opacity:orbit.opacity,
    // Explicit CSS perspective + 3D orientation; scale supplies smooth depth.
    transform:`translate3d(${orbit.x}px,${orbit.y}px,0) rotateX(${orbit.rotateX}deg) rotateY(${orbit.rotateY}deg) rotateZ(${orbit.rotateZ}deg) scale(${orbit.scale})`,
    transformOrigin:'50% 50%',backfaceVisibility:'hidden',
    filter:`drop-shadow(0 ${7+orbit.depth*3}px ${orbit.shadowBlur}px rgba(20,12,8,0.28))`,
  }}><PortfolioCard variant={variant}/></div>;
};

export const HeroOrbitLoop:React.FC=()=>{
  const {fps,width,height}=useVideoConfig();
  return <AbsoluteFill style={{background:'#16120f',perspective:'1200px',perspectiveOrigin:`${DEVICE_GEOMETRY.screenCenter.x}px ${DEVICE_GEOMETRY.screenCenter.y}px`,overflow:'hidden',isolation:'isolate'}}>
    <CanvasImage src={staticFile('devices-plate.png')} premountFor={fps} style={{position:'absolute',left:'50%',top:'50%',translate:'-50% -50%',width,height,zIndex:0}}/>
    <FloatingCard variant="editorial" phaseSeconds={0}/>
    <FloatingCard variant="commerce" phaseSeconds={10/3}/>
    <FloatingCard variant="studio" phaseSeconds={20/3}/>
    {/* Same static photograph, clipped to the hardware. Rear cards are occluded. */}
    <svg data-device-foreground viewBox="0 0 1448 1086" width={width} height={height} style={{position:'absolute',inset:0,zIndex:10,pointerEvents:'none'}}>
      <defs><clipPath id="devices-occlusion"><path d={DEVICE_GEOMETRY.laptopSilhouette}/><path d={DEVICE_GEOMETRY.phoneSilhouette}/></clipPath></defs>
      <image href={staticFile('devices-plate.png')} width="1448" height="1086" preserveAspectRatio="none" clipPath="url(#devices-occlusion)"/>
    </svg>
  </AbsoluteFill>;
};

export const RemotionRoot:React.FC=()=> <Composition id="HeroOrbitLoop" component={HeroOrbitLoop} durationInFrames={300} fps={30} width={1448} height={1086}/>;
