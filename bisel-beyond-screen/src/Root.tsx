import React from 'react';
import {Composition,Folder,Still} from 'remotion';
import {Film as BiselDigital_BeyondTheScreen} from './Film';
import {InterfaceCapture} from './Surfaces';
export const RemotionRoot:React.FC=()=> <>
 <Composition id="BiselDigital-BeyondTheScreen" component={BiselDigital_BeyondTheScreen} durationInFrames={840} fps={30} width={1920} height={1080}/>
 <Folder name="Editable-interface-assets">
  <Still id="DentalInterface" component={InterfaceCapture} width={1920} height={1240} defaultProps={{index:0}}/>
  <Still id="RealestateInterface" component={InterfaceCapture} width={1920} height={1240} defaultProps={{index:1}}/>
  <Still id="LegalInterface" component={InterfaceCapture} width={1920} height={1240} defaultProps={{index:2}}/>
  <Still id="CommerceInterface" component={InterfaceCapture} width={1920} height={1240} defaultProps={{index:3}}/>
  <Still id="ArchitectureInterface" component={InterfaceCapture} width={1920} height={1240} defaultProps={{index:4}}/>
  <Still id="EnglishInterface" component={InterfaceCapture} width={1920} height={1240} defaultProps={{index:5}}/>
  <Still id="FashionInterface" component={InterfaceCapture} width={1920} height={1240} defaultProps={{index:6}}/>
  <Still id="CivicInterface" component={InterfaceCapture} width={1920} height={1240} defaultProps={{index:7}}/>
 </Folder>
</>;
