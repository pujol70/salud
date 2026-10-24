import {StableImage as CanvasImage} from './StableImage';
import React from 'react';
import {AbsoluteFill,interpolate,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {Audio} from '@remotion/media';
import {WebsiteSurfaces} from './Surfaces';
import {clamp,smooth,sourceCamera,sourcePoint,SCREEN,laptopPath,phonePath,worldPose,emergenceQuad,quadMatrix,WORLDS} from './choreography';
import './fonts';

const SourceScene:React.FC<{foreground?:boolean}>=({foreground=false})=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 const{fps}=useVideoConfig();
 const c=sourceCamera(t);
 return <AbsoluteFill style={{zIndex:foreground?10:1,transform:`translate(${c.dx}px,${c.dy}px) scale(${c.scale})`,transformOrigin:'960px 540px',pointerEvents:'none'}}>
  {foreground?<svg viewBox="0 0 1448 1086" preserveAspectRatio="none" width="1440" height="1080" style={{position:'absolute',left:240,top:0}}>
   <defs><clipPath id="hardware"><path d={laptopPath}/><path d={phonePath}/></clipPath></defs>
   <image href={staticFile('source-devices.png')} width="1448" height="1086" preserveAspectRatio="none" clipPath="url(#hardware)"/>
  </svg>:<div style={{position:'absolute',left:240,top:0,width:1440,height:1080,maskImage:'linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)'}}><CanvasImage src={staticFile('source-devices.png')} premountFor={fps} style={{width:1440,height:1080,maskImage:'linear-gradient(transparent,#000 15%,#000 82%,transparent)'}}/></div>}
 </AbsoluteFill>;
};

const ComputerScreenPortal:React.FC=()=>{
 const{fps}=useVideoConfig();const t=useCurrentFrame()/fps;
 const quad=SCREEN.map(p=>sourcePoint(p,t));
 const points=quad.map(p=>`${p.x},${p.y}`).join(' ');
 const awaken=smooth((t-.8)/.6)*(1-smooth((t-2.9)/.5));
 const birth=WORLDS.reduce((sum,w)=>sum+Math.exp(-Math.pow((t-w.start)/.30,2)),0);
 const sweep=interpolate(t,[.8,3],[-200,1200],clamp);
 return <svg width="1920" height="1080" style={{position:'absolute',inset:0,zIndex:12,pointerEvents:'none'}}>
  <defs>
   <clipPath id="actual-screen"><polygon points={points}/></clipPath>
   <linearGradient id="gold-scan" x1="0" x2="1"><stop stopColor="#c6a66b" stopOpacity="0"/><stop offset=".5" stopColor="#ead9b2" stopOpacity=".7"/><stop offset="1" stopColor="#c6a66b" stopOpacity="0"/></linearGradient>
   <linearGradient id="beam"><stop stopColor="#e6d3a3" stopOpacity=".13"/><stop offset="1" stopColor="#e6d3a3" stopOpacity="0"/></linearGradient>
  </defs>
  <g clipPath="url(#actual-screen)">
   <polygon points={points} fill="#e6d3a3" opacity={awaken*.045+birth*.075}/>
   <path d={`M${sweep+250} 120L${sweep+60} 850`} stroke="url(#gold-scan)" strokeWidth="45" opacity={awaken*.6}/>
   <path d={`M${sweep+250} 120L${sweep+60} 850`} stroke="#eddfbd" strokeWidth="1.5" opacity={awaken*.65}/>
  </g>
  <polygon points={`${quad[1].x},${quad[1].y} 1770,100 1820,820 ${quad[2].x},${quad[2].y}`} fill="url(#beam)" opacity={Math.min(.4,birth*.18)}/>
 </svg>;
};

export const WebsiteWorld:React.FC<{index:number}>=({index})=>{
 const {fps}=useVideoConfig();const t=useCurrentFrame()/fps;
 const p=worldPose(t,index),w=WORLDS[index];
 if(p.age<0||p.opacity<.001)return null;
 const blur=p.depth<0&&p.settle<.1?Math.max(0,-p.depth*.75):0;
 const edge=Math.exp(-Math.pow((p.age-.55)/.55,2))*.42;
 return <div data-world={w.id} data-depth={p.depth} data-layer={p.layer} style={{
  position:'absolute',left:0,top:0,width:960,height:620,zIndex:p.layer,
  transform:quadMatrix(emergenceQuad(t,index)),transformOrigin:'0 0',opacity:p.opacity,
  filter:blur>.35?'blur(.5px)':'none',boxShadow:'0 16px 26px rgba(0,0,0,.28)',
 }}>
  <WebsiteSurfaces index={index} parallax={p.parallax}/>
  <div style={{position:'absolute',inset:0,border:`1px solid rgba(230,211,163,${edge})`,boxShadow:`0 0 ${12*edge}px rgba(230,211,163,${edge*.3})`,pointerEvents:'none'}}/>
 </div>;
};

const CinematicLighting:React.FC=()=>{
 const{fps}=useVideoConfig();const t=useCurrentFrame()/fps;
 const energy=smooth((t-2)/5)*(1-smooth((t-25.8)/1));
 return <>
  <AbsoluteFill style={{zIndex:16,pointerEvents:'none',background:'radial-gradient(ellipse at 52% 46%,transparent 45%,rgba(7,9,12,.40) 100%)'}}/>
  <svg width="1920" height="1080" style={{position:'absolute',inset:0,zIndex:15,pointerEvents:'none',opacity:energy*.7}}>
   {Array.from({length:24},(_,i)=>{
    const x=80+(i*197.17+t*(4+i%3))%1760,y=70+(i*137.3-t*(2+i%4)+2000)%940;
    return <circle key={i} cx={x} cy={y} r={i%3===0?1.3:.7} fill="#e6d3a3" opacity={.12+.12*Math.sin(t*.4+i)**2}/>;
   })}
   {WORLDS.map((w,i)=>{
    const p=worldPose(t,i);const a=p.age;
    if(a<.4||a>2.2)return null;
    const origin=sourcePoint({x:1140,y:400},t);
    return <path key={w.id} d={`M${origin.x} ${origin.y} Q${origin.x+210} ${origin.y-80-i*8} ${p.x} ${p.y}`} fill="none" stroke="#dbc492" strokeWidth=".7" opacity={Math.sin((a-.4)/1.8*Math.PI)*.20}/>;
   })}
  </svg>
 </>;
};

const VisualScene:React.FC=()=>{
 const{fps}=useVideoConfig();
 return <AbsoluteFill style={{background:'#16181c',perspective:1400,isolation:'isolate',overflow:'hidden'}}>
  <CanvasImage src={staticFile('source-background.jpg')} premountFor={fps} style={{position:'absolute',inset:-8,width:1936,height:1096,objectFit:'cover',zIndex:0}}/>
  <SourceScene/>
  <WebsiteWorld index={0}/>
  <WebsiteWorld index={1}/>
  <WebsiteWorld index={2}/>
  <WebsiteWorld index={3}/>
  <WebsiteWorld index={4}/>
  <WebsiteWorld index={5}/>
  <WebsiteWorld index={6}/>
  <WebsiteWorld index={7}/>
  <SourceScene foreground/>
  <ComputerScreenPortal/>
  <CinematicLighting/>
 </AbsoluteFill>;
};

const BrandReveal:React.FC=()=>{
 const{fps}=useVideoConfig();const t=useCurrentFrame()/fps;
 const show=smooth((t-26.05)/.95);
 return <AbsoluteFill style={{zIndex:100,opacity:show,pointerEvents:'none',background:'linear-gradient(90deg,rgba(15,18,22,.98),rgba(15,18,22,.88) 28%,rgba(15,18,22,.40) 51%,transparent 72%)'}}>
  <div style={{position:'absolute',left:106,top:330,color:'#f3efe7',translate:`0 ${12*(1-show)}px`}}>
   <div style={{fontFamily:'Inter',fontSize:12,letterSpacing:5,color:'#c6a66b',marginBottom:34}}>DISEÑO WEB · EXPERIENCIAS DIGITALES</div>
   <div style={{fontFamily:'Syne',fontWeight:600,fontSize:74,letterSpacing:-2,lineHeight:1.1}}>BISEL DIGITAL</div>
   <div style={{height:2,width:96*show,background:'linear-gradient(90deg,#9c7f48,#e6d3a3,#c6a66b)',margin:'32px 0'}}/>
   <div style={{fontFamily:'Inter',fontSize:35,fontWeight:300,lineHeight:1.36}}>Que tu web responda<br/>antes que tú</div>
   <div style={{fontFamily:'Inter',fontSize:23,color:'#c6a66b',marginTop:37,letterSpacing:.3}}>biseldigital.com</div>
  </div>
 </AbsoluteFill>;
};

export const Film:React.FC=()=>{
 const{fps}=useVideoConfig();
 const t=useCurrentFrame()/fps;
 return <AbsoluteFill style={{background:'#16181c'}}>
  <VisualScene/>
  <BrandReveal/>
  <Audio src={staticFile('soundtrack.wav')} premountFor={fps} volume={.8}/>
 </AbsoluteFill>;
};
