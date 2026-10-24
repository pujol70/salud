import {interpolate, Easing} from 'remotion';
export const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const smooth=(x:number)=>{const v=Math.max(0,Math.min(1,x));return v*v*(3-2*v)};
export const mix=(a:number,b:number,p:number)=>a+(b-a)*p;
export type Point={x:number;y:number};
export const SCREEN:Point[]=[{x:404,y:262},{x:1143,y:207},{x:1086,y:823},{x:318,y:765}];
export const laptopPath='M0 835 L299 789 L385 260 Q388 236 411 232 L1143 172 Q1171 168 1174 196 L1160 392 L1080 872 L1091 899 L852 971 Q778 997 737 990 L0 904 Z';
export const phonePath='M1144 390 L1307 384 Q1358 382 1361 430 L1320 905 Q1318 949 1273 947 L1097 929 Q1059 924 1065 878 L1108 432 Q1110 396 1144 390 Z';
export const sourceCamera=(t:number)=>({
 scale:interpolate(t,[0,3,7,23,26,28],[1,1.025,.77,.77,.84,.91],clamp),
 dy:interpolate(t,[0,7,23,26,28],[0,50,50,35,15],clamp),
 dx:interpolate(t,[0,25.8,27.4,28],[0,0,200,200],clamp),
});
export const sourcePoint=(p:Point,t:number):Point=>{
 const c=sourceCamera(t);
 return {x:960+(240+p.x*1440/1448-960)*c.scale+c.dx,y:540+(p.y*1080/1086-540)*c.scale+c.dy};
};

export type WorldSpec={
 id:string;category:string;brand:string;start:number;accent:string;dark:boolean;
 rx:number;ry:number;speed:number;tilt:number;phase:number;
 grand:{x:number;y:number;scale:number;angle:number};
};
export const WORLDS:WorldSpec[]=[
 {id:'dental',category:'Clínica dental',brand:'AURORA',start:3.1,accent:'#658f86',dark:false,rx:530,ry:290,speed:.53,tilt:.27,phase:0,grand:{x:443,y:575,scale:.69,angle:4}},
 {id:'realestate',category:'Inmobiliaria',brand:'AURA',start:5.0,accent:'#c6a66b',dark:true,rx:490,ry:320,speed:.57,tilt:-.15,phase:.10,grand:{x:1482,y:590,scale:.70,angle:-4}},
 {id:'legal',category:'Estudio jurídico',brand:'LEX',start:7.3,accent:'#c6ad7c',dark:true,rx:620,ry:225,speed:.47,tilt:.12,phase:-.18,grand:{x:294,y:205,scale:.38,angle:7}},
 {id:'commerce',category:'Tienda online',brand:'FORMA',start:8.9,accent:'#ad7656',dark:false,rx:570,ry:300,speed:.64,tilt:.35,phase:.15,grand:{x:1603,y:200,scale:.38,angle:-7}},
 {id:'architecture',category:'Arquitectura',brand:'ESTUDIO',start:10.5,accent:'#cdc1a7',dark:true,rx:550,ry:360,speed:.51,tilt:-.22,phase:.25,grand:{x:745,y:185,scale:.38,angle:3}},
 {id:'english',category:'Inglés · Profesora',brand:'WITH ANA',start:12.1,accent:'#cc8f72',dark:false,rx:610,ry:260,speed:.60,tilt:.23,phase:-.10,grand:{x:516,y:927,scale:.34,angle:3}},
 {id:'fashion',category:'Valentina · Modelo',brand:'VALENTINA',start:13.5,accent:'#d6c3a9',dark:true,rx:480,ry:350,speed:.68,tilt:-.29,phase:.20,grand:{x:1391,y:928,scale:.35,angle:-3}},
 {id:'civic',category:'Martín · Concejal',brand:'MARTÍN',start:14.9,accent:'#80918d',dark:false,rx:640,ry:240,speed:.56,tilt:.10,phase:-.12,grand:{x:1177,y:185,scale:.38,angle:-3}},
];
export type WorldPose={x:number;y:number;scale:number;rx:number;ry:number;rz:number;depth:number;reveal:number;settle:number;opacity:number;layer:number;parallax:number;age:number};
export const worldPose=(t:number,index:number):WorldPose=>{
 const w=WORLDS[index], age=t-w.start, origin=sourcePoint({x:737.75,y:514.25},t);
 const reveal=smooth(age/1.55);
 const theta=w.phase+Math.max(0,age-1.55)*w.speed;
 const depth=Math.sin(theta);
 const targetX=960+w.rx*Math.cos(theta);
 const targetY=552+w.ry*Math.sin(theta)-w.tilt*w.rx*Math.cos(theta);
 const dominant=index<2;
 const orbitalScale=interpolate(depth,[-1,1],dominant?[.36,.84]:[.25,.62]);
 const settle=smooth((t-22.8)/1.7);
 const fly=smooth(age/1.55);
 const gone=smooth((t-26)/.65);
 const scale=mix(mix(.66,orbitalScale,fly)+Math.sin(Math.PI*fly)*.45,w.grand.scale,settle);
 const x=mix(mix(origin.x,targetX,fly),w.grand.x,settle);
 const y=mix(mix(origin.y,targetY,fly),w.grand.y,settle);
 const front=age<1.7||depth>=0||settle>.15;
 return {x,y,scale,depth,reveal,settle,age,
  rx:mix(interpolate(depth,[-1,1],[12,-4]),0,settle),
  ry:mix(-Math.cos(theta)*(18+index*1.3),0,settle),
  rz:mix(Math.cos(theta)*(index%2===0?-6:6),w.grand.angle,settle),
  opacity:smooth(age/.18)*(1-gone),layer:front?30+Math.round((depth+1)*8)+(dominant?3:0):4+Math.round((depth+1)*3),
  parallax:Math.sin(t*.7+index)*4*reveal,
 };
};

/** A perspective-correct CSS homography from a 960 × 620 website to any quad. */
export const quadMatrix=(quad:Point[],width=960,height=620)=>{
 const from=[[0,0],[width,0],[width,height],[0,height]];
 const a:number[][]=[];
 for(let i=0;i<4;i++){
  const [x,y]=from[i],{x:u,y:v}=quad[i];
  a.push([x,y,1,0,0,0,-u*x,-u*y,u]);
  a.push([0,0,0,x,y,1,-v*x,-v*y,v]);
 }
 for(let c=0;c<8;c++){
  let pivot=c;for(let r=c+1;r<8;r++)if(Math.abs(a[r][c])>Math.abs(a[pivot][c]))pivot=r;
  [a[c],a[pivot]]=[a[pivot],a[c]];
  const d=a[c][c];if(Math.abs(d)<1e-12)throw Error('Degenerate portal quad');
  for(let j=c;j<9;j++)a[c][j]/=d;
  for(let r=0;r<8;r++)if(r!==c){const f=a[r][c];for(let j=c;j<9;j++)a[r][j]-=f*a[c][j]}
 }
 const h=a.map(row=>row[8]);
 return `matrix3d(${[h[0],h[3],0,h[6],h[1],h[4],0,h[7],0,0,1,0,h[2],h[5],0,1].join(',')})`;
};
export const poseQuad=(p:WorldPose):Point[]=>{
 const rz=p.rz*Math.PI/180, ry=p.ry*Math.PI/180, rx=p.rx*Math.PI/180;
 return [[-480,-310],[480,-310],[480,310],[-480,310]].map(([x0,y0])=>{
  const x=x0*p.scale,y=y0*p.scale;
  const x1=x*Math.cos(ry),z1=-x*Math.sin(ry);
  const y1=y*Math.cos(rx)-z1*Math.sin(rx),z=y*Math.sin(rx)+z1*Math.cos(rx);
  const persp=1400/(1400-z);
  return {x:p.x+(x1*Math.cos(rz)-y1*Math.sin(rz))*persp,y:p.y+(x1*Math.sin(rz)+y1*Math.cos(rz))*persp};
 });
};
export const emergenceQuad=(t:number,index:number)=>{
 const p=worldPose(t,index), target=poseQuad(p), amount=Easing.bezier(.22,1,.36,1)(Math.max(0,Math.min(1,p.age/.85)));
 const start=SCREEN.map(v=>sourcePoint(v,t));
 return target.map((v,i)=>({x:mix(start[i].x,v.x,amount),y:mix(start[i].y,v.y,amount)}));
};
