import {StableImage as CanvasImage} from './StableImage';
import React, {createContext,useContext} from 'react';
import {staticFile,useVideoConfig} from 'remotion';
import {WORLDS} from './choreography';
const serif='Georgia, serif';
export const CaptureLayer=createContext(false);
const Button:React.FC<{children:React.ReactNode;color?:string;light?:boolean}>=({children,color='#c6a66b',light=false})=><span style={{display:'inline-block',padding:'14px 24px',background:light?'#f3efe7':color,color:light?'#252a2b':'white',fontSize:17,fontWeight:500,letterSpacing:.1}}>{children} <svg style={{marginLeft:22,verticalAlign:"middle"}} width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 15L15 3M4 3H15V14" stroke="currentColor" strokeWidth="1.3"/></svg></span>;
const Nav:React.FC<{brand:string;items:string;dark?:boolean;sub?:string}>=({brand,items,dark=false,sub})=><div style={{position:'absolute',top:30,left:42,right:42,display:'flex',alignItems:'center',justifyContent:'space-between',color:dark?'#fff':'#27382f',transform:'translateZ(24px)'}}><div><div style={{fontFamily:'Syne',fontWeight:600,fontSize:29,letterSpacing:4}}>{brand}</div>{sub&&<div style={{fontSize:9,letterSpacing:3,marginTop:3}}>{sub}</div>}</div><div style={{fontSize:13,wordSpacing:17,opacity:.9}}>{items}</div></div>;
const Photo:React.FC<{id:string;position?:string;style?:React.CSSProperties}>=({id,position='center',style={}})=>{const{fps}=useVideoConfig();const ui=useContext(CaptureLayer);if(ui&&style.position!=='relative')return null;return <CanvasImage src={staticFile(`photos/${id}.png`)} premountFor={fps} style={{position:'absolute',inset:0,width:960,height:500,objectFit:'cover',objectPosition:position,...style}}/>};
const FeatureStrip:React.FC<{items:string[];color?:string;dark?:boolean}>=({items,color='#658f86',dark=false})=><div style={{position:'absolute',left:0,right:0,top:500,height:120,background:dark?'#202522':'#f5f1e9',display:'flex',padding:'28px 40px',gap:26,transform:'translateZ(18px)'}}>{items.map((v,i)=><div key={v} style={{flex:1,borderTop:`1px solid ${color}66`,paddingTop:10,color:dark?'#f3efe7':'#26352e'}}><div style={{fontSize:10,letterSpacing:2,color,marginBottom:7}}>0{i+1} /</div><div style={{fontSize:19,fontWeight:400}}>{v}</div></div>)}</div>;

const Dental=()=> <>
 <Photo id="dental" position="60% center"/>
 <div style={{position:'absolute',inset:'0 0 120px 0',background:'linear-gradient(90deg,rgba(246,244,236,.99),rgba(246,244,236,.91) 35%,rgba(246,244,236,0) 65%)'}}/>
 <Nav brand="AURORA" sub="CLÍNICA DENTAL" items="Nosotros  Tratamientos  Especialistas"/>
 <div style={{position:'absolute',left:44,top:140,width:415,transform:'translateZ(40px)'}}>
  <div style={{fontSize:12,letterSpacing:3,color:'#658f86'}}>SALUD · ESTÉTICA · CONFIANZA</div>
  <h1 style={{fontFamily:serif,fontWeight:400,fontSize:58,lineHeight:1.02,color:'#25483d',margin:'20px 0'}}>Tu sonrisa,<br/>en buenas manos.</h1>
  <p style={{fontSize:16,lineHeight:1.6,color:'#5a6b64',maxWidth:310}}>Odontología de precisión en un espacio pensado para vos.</p>
  <Button color="#658f86">Agendar una consulta</Button>
 </div>
 <FeatureStrip items={['Estética dental','Implantología','Nuestro equipo']}/>
 </>;
const Realestate=()=> <>
 <Photo id="realestate"/>
 <div style={{position:'absolute',inset:'0 0 120px 0',background:'linear-gradient(0deg,rgba(8,20,24,.85),transparent 75%)'}}/>
 <Nav brand="AURA" sub="INMOBILIARIA" dark items="Propiedades  Proyectos  Contacto"/>
 <div style={{position:'absolute',left:44,top:245,color:'white',transform:'translateZ(35px)'}}><div style={{fontSize:12,letterSpacing:3}}>ESPACIOS QUE INSPIRAN</div><h1 style={{fontFamily:serif,fontSize:61,fontWeight:400,lineHeight:1.04,margin:'14px 0'}}>Tu próxima<br/>gran dirección.</h1></div>
 <div style={{position:'absolute',right:40,top:370,color:'#fff',textAlign:'right',transform:'translateZ(45px)'}}><div style={{fontSize:11,letterSpacing:2}}>RESIDENCIA · VISTA ABIERTA</div><div style={{fontFamily:serif,fontSize:31,marginTop:10}}>Colección exclusiva</div></div>
 <div style={{position:'absolute',left:44,right:44,top:466,height:90,background:'#f3efe7',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 26px',boxShadow:'0 14px 28px #0002',transform:'translateZ(56px)'}}>{['Ubicación','Tipo de propiedad','Rango de inversión'].map(v=><div key={v}><div style={{fontSize:10,color:'#79766f',marginBottom:8,letterSpacing:1}}>{v.toUpperCase()}</div><div style={{fontSize:15,color:'#242c2c'}}>Seleccionar</div></div>)}<Button>Buscar</Button></div>
 <div style={{position:'absolute',left:0,right:0,top:500,height:120,background:'#e9e5dc',zIndex:-1}}/>
 <div style={{position:'absolute',left:45,bottom:19,fontSize:12,color:'#5d655f'}}>Casas · Departamentos · Proyectos &nbsp; — &nbsp; Ver colección completa ›</div>
 </>;
const Legal=()=> <>
 <Photo id="legal"/>
 <div style={{position:'absolute',inset:'0 0 120px 0',background:'linear-gradient(90deg,rgba(10,25,22,.95),rgba(10,25,22,.55) 55%,transparent)'}}/>
 <Nav brand="LEX" sub="ESTUDIO JURÍDICO" dark items="El estudio  Áreas  Profesionales"/>
 <div style={{position:'absolute',top:145,left:45,color:'#f7f0df',maxWidth:570,transform:'translateZ(34px)'}}><div style={{fontSize:12,letterSpacing:4,color:'#c6ad7c'}}>CRITERIO. EXPERIENCIA. CONFIANZA.</div><h1 style={{fontFamily:serif,fontSize:64,lineHeight:1.04,fontWeight:400,margin:'22px 0'}}>La claridad que<br/>cada decisión merece.</h1><p style={{fontSize:16,lineHeight:1.6,color:'#d3d7cb'}}>Asesoramiento jurídico con perspectiva y compromiso.</p><Button color="#9b865e">Coordinar una consulta</Button></div>
 <FeatureStrip dark color="#c6ad7c" items={['Derecho empresarial','Patrimonio y familia','Equipo profesional']}/>
 </>;
const Commerce=()=> <>
 <Photo id="commerce"/>
 <div style={{position:'absolute',inset:'0 0 120px 0',background:'linear-gradient(90deg,rgba(237,223,204,.94),rgba(237,223,204,.3) 49%,transparent 68%)'}}/>
 <Nav brand="FORMA" items="Colección  Objetos  Nuestra historia"/>
 <div style={{position:'absolute',top:152,left:45,width:390,color:'#4b362b',transform:'translateZ(40px)'}}><div style={{fontSize:12,letterSpacing:4}}>MENOS, PERO MEJOR.</div><h1 style={{fontFamily:serif,fontSize:69,lineHeight:1,fontWeight:400,margin:'20px 0'}}>Objetos para<br/>vivir despacio.</h1><p style={{fontSize:16,maxWidth:290,lineHeight:1.7}}>Materiales honestos.<br/>Diseño que perdura.</p><Button color="#9c6a4a">Explorar colección</Button></div>
 <div style={{position:'absolute',right:34,bottom:144,padding:'13px 20px',background:'#f5efe4ee',color:'#503b2f',transform:'translateZ(65px)'}}><div style={{fontSize:10,letterSpacing:2}}>EDICIÓN ATELIER</div><div style={{fontSize:17,marginTop:6}}>Cuero natural · Hecho para durar</div></div>
 <FeatureStrip color="#ad7656" items={['Diseño esencial','Materiales nobles','Entrega a tu medida']}/>
 </>;
const Architecture=()=> <>
 <Photo id="architecture"/>
 <div style={{position:'absolute',inset:'0 0 120px 0',background:'linear-gradient(0deg,rgba(0,0,0,.65),transparent 75%)'}}/>
 <Nav brand="ESTUDIO" dark items="Obras  Pensamiento  Contacto"/>
 <div style={{position:'absolute',left:42,top:302,color:'#fff',transform:'translateZ(24px)'}}><div style={{fontSize:12,letterSpacing:3}}>ARQUITECTURA PARA HABITAR</div><h1 style={{fontFamily:'Syne',fontSize:66,fontWeight:400,lineHeight:1.05,margin:'17px 0'}}>La forma del silencio.</h1></div>
 <div style={{position:'absolute',right:38,top:433,color:'#fff',fontSize:14}}>Casa Horizonte &nbsp; / &nbsp; 2026 &nbsp; ›</div>
 <div style={{position:'absolute',top:500,height:120,left:0,right:0,background:'#e7e4dc',display:'flex',padding:'25px 44px',gap:55}}><div style={{fontSize:11,letterSpacing:2,lineHeight:2}}>OBRAS SELECCIONADAS<br/><span style={{fontSize:20,letterSpacing:0}}>Espacio. Luz. Materia.</span></div><Photo id="architecture" style={{position:'relative',width:145,height:78,objectPosition:'left',marginLeft:'auto'}}/><div style={{fontSize:12,lineHeight:1.8}}>Residencial<br/>Comercial<br/>Todos los proyectos ›</div></div>
 </>;
const English=()=> <>
 <Photo id="english" position="center"/>
 <div style={{position:'absolute',inset:'0 0 120px 0',background:'linear-gradient(90deg,rgba(248,241,226,.98),rgba(248,241,226,.88) 39%,transparent 64%)'}}/>
 <Nav brand="WITH ANA" sub="ENGLISH, WITH PURPOSE" items="Método  Clases  Tu nivel"/>
 <div style={{position:'absolute',top:145,left:45,width:450,color:'#484e46',transform:'translateZ(38px)'}}><div style={{fontSize:12,letterSpacing:3,color:'#ad755c'}}>TU MUNDO, CON MÁS PALABRAS.</div><h1 style={{fontFamily:serif,fontSize:62,fontWeight:400,lineHeight:1.03,margin:'20px 0'}}>Inglés para<br/>lo que viene.</h1><p style={{fontSize:16,lineHeight:1.7,width:310}}>Clases reales, a tu ritmo.<br/>Confianza para dar el próximo paso.</p><Button color="#bb8469">Encontrá tu clase</Button></div>
 <FeatureStrip color="#bb8469" items={['A1–A2 · Primeros pasos','B1–B2 · Conversación','Online · A tu medida']}/>
 </>;
const Fashion=()=> <>
 <Photo id="fashion" style={{height:620}} position="center"/>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(7,9,10,.75),transparent 67%)'}}/>
 <Nav brand="VALENTINA" dark items="Portfolio  Perfil  Booking"/>
 <div style={{position:'absolute',top:222,left:42,color:'#f5efe7',transform:'translateZ(38px)'}}><div style={{fontSize:11,letterSpacing:5}}>MODEL · EDITORIAL · FASHION</div><h1 style={{fontFamily:serif,fontSize:104,lineHeight:.88,fontWeight:400,letterSpacing:-3,margin:'24px 0'}}>Presence<br/><i>in motion.</i></h1><div style={{fontSize:13,letterSpacing:2,marginTop:28}}>DESCUBRIR PORTFOLIO &nbsp; ›</div></div>
 <div style={{position:'absolute',left:44,right:44,bottom:27,display:'flex',justifyContent:'space-between',color:'#ddd8ce',fontSize:11,letterSpacing:2,transform:'translateZ(20px)'}}><span>EDITORIAL / 001</span><span>PERFIL · MEDIDAS · BOOKING</span></div>
 </>;
const Civic=()=> <>
 <Photo id="civic"/>
 <div style={{position:'absolute',inset:'0 0 120px 0',background:'linear-gradient(0deg,rgba(15,35,32,.8),transparent 85%)'}}/>
 <Nav brand="MARTÍN" sub="EJEMPLO · CONCEJAL" dark items="Propuestas  Agenda  Participá"/>
 <div style={{position:'absolute',left:44,top:263,color:'#fff',transform:'translateZ(30px)'}}><div style={{fontSize:12,letterSpacing:3}}>INFORMACIÓN Y PARTICIPACIÓN CIUDADANA</div><h1 style={{fontFamily:'Syne',fontSize:62,fontWeight:500,lineHeight:1.05,margin:'18px 0'}}>Tu comunidad,<br/>más cerca.</h1></div>
 <div style={{position:'absolute',right:38,top:410,transform:'translateZ(45px)'}}><Button color="#718d82">Consultar agenda</Button></div>
 <FeatureStrip color="#718d82" items={['Espacios públicos','Agenda vecinal','Contacto ciudadano']}/>
 </>;

export const WebsiteExperience:React.FC<{index:number;parallax:number;hideCategory?:boolean}>=({index,parallax,hideCategory=false})=>{
 const w=WORLDS[index];
 return <div style={{position:'relative',width:960,height:620,fontFamily:'Inter',perspective:1600,transformStyle:'preserve-3d'}}>
  {!hideCategory&&<div style={{position:'absolute',top:-46,left:0,color:'#f3efe7',fontSize:31,fontFamily:'Syne',fontWeight:500,letterSpacing:.2,textShadow:'0 2px 12px #000a',whiteSpace:'nowrap'}}><span style={{color:'#c6a66b',fontSize:19,marginRight:14}}>0{index+1}</span>{w.category}</div>}
  <div style={{position:'absolute',inset:0,transform:`translate3d(${parallax*.35}px,${-parallax*.2}px,0)`,transformStyle:'preserve-3d'}}>
   {index===0?<Dental/>:index===1?<Realestate/>:index===2?<Legal/>:index===3?<Commerce/>:index===4?<Architecture/>:index===5?<English/>:index===6?<Fashion/>:<Civic/>}
  </div>
 </div>;
};
