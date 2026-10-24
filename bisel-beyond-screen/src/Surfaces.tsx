import {StableImage as CanvasImage} from './StableImage';
import React from 'react';
import {AbsoluteFill,staticFile,useVideoConfig} from 'remotion';
import {WORLDS} from './choreography';
import {CaptureLayer,WebsiteExperience} from './Websites';
import './fonts';
export const InterfaceCapture:React.FC<{index:number}>=({index})=> <AbsoluteFill style={{background:'transparent'}}><div style={{scale:2,transformOrigin:'0 0',width:960,height:620}}><CaptureLayer.Provider value={true}><WebsiteExperience index={index} parallax={0} hideCategory/></CaptureLayer.Provider></div></AbsoluteFill>;
export const WebsiteSurfaces:React.FC<{index:number;parallax:number}>=({index,parallax})=>{
 const w=WORLDS[index],{fps}=useVideoConfig();
 return <div style={{position:'relative',width:960,height:620,perspective:1600,transformStyle:'preserve-3d'}}>
  <div style={{position:'absolute',top:-46,left:0,color:'#f3efe7',fontSize:31,fontFamily:'Syne',fontWeight:500,letterSpacing:.2,textShadow:'0 2px 12px #000a',whiteSpace:'nowrap'}}><span style={{color:'#c6a66b',fontSize:19,marginRight:14}}>0{index+1}</span>{w.category}</div>
  <CanvasImage src={staticFile(`photos/${w.id}.png`)} premountFor={fps} style={{position:'absolute',left:0,top:0,width:960,height:index===6?620:500,objectFit:'cover',transform:`translate3d(${-parallax*.2}px,${parallax*.1}px,0)`}}/>
  <CanvasImage src={staticFile(`layouts/${w.id}-interface.png`)} premountFor={fps} style={{position:'absolute',inset:0,width:960,height:620,transform:`translate3d(${parallax*.35}px,${-parallax*.2}px,12px)`}}/>
 </div>;
};
