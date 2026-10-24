import React from 'react';
export type DemoVariant='editorial'|'commerce'|'studio';
const Line:React.FC<{width?:number;color?:string;height?:number}>=({width=75,color='#c9c5d0',height=4})=>
  <div style={{width,height,background:color,borderRadius:3,flexShrink:0}}/>;

const Editorial=()=> <div style={{display:'flex',gap:14,padding:16,background:'#f5f2fc',height:155}}>
  <div style={{width:103,display:'flex',flexDirection:'column',gap:7,paddingTop:4}}>
    <div style={{fontSize:6,letterSpacing:2,color:'#6652a5',marginBottom:6}}>CREATIVE SPACES</div>
    <Line width={93} height={8} color="#35264f"/><Line width={76} height={8} color="#35264f"/>
    <div style={{height:2}}/><Line width={85}/><Line width={68}/>
    <div style={{width:52,height:15,marginTop:7,background:'#8866ca',borderRadius:3}}/>
  </div>
  <svg width="107" height="118" viewBox="0 0 107 118"><rect width="107" height="118" rx="6" fill="#e0d6f4"/><circle cx="61" cy="50" r="33" fill="#a68bd7"/><path d="M10 108L53 39L96 108Z" fill="#7453ac"/><circle cx="77" cy="24" r="9" fill="#f7e4bd"/></svg>
</div>;
const Commerce=()=> <div style={{padding:15,height:155,background:'#f1f7f3'}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}><div style={{display:'grid',gap:5}}><Line width={102} height={8} color="#214f43"/><Line width={69} color="#8fa99f"/></div><div style={{width:19,height:19,border:'1px solid #79a28f',borderRadius:20}}/></div>
  <div style={{display:'flex',gap:8}}>
    {['#c8dfd0','#d5e5dc','#e0e9df'].map((color,i)=><div key={color} style={{width:68}}><svg width="68" height="67" viewBox="0 0 68 67"><rect width="68" height="67" rx="4" fill={color}/><ellipse cx="34" cy="56" rx="20" ry="4" fill="#8fa99f" opacity=".25"/><path d={i===1?'M20 26Q34 8 48 26L43 55H25Z':'M25 19H43L47 55H21Z'} fill={i===1?'#568a73':'#80aa92'}/><path d="M28 20V15Q34 9 40 15V20" fill="none" stroke="#3c6e59" strokeWidth="2"/></svg><div style={{marginTop:6,display:'grid',gap:4}}><Line width={44} height={3} color="#66887a"/><Line width={24} height={3} color="#aac1b5"/></div></div>)}
  </div>
</div>;
const Studio=()=> <div style={{padding:15,background:'#fff3ea',height:155}}>
  <div style={{display:'flex',justifyContent:'space-between',marginBottom:14}}><div style={{display:'grid',gap:5}}><Line width={117} height={8} color="#744632"/><Line width={81} height={8} color="#744632"/></div><svg width="32" height="32" viewBox="0 0 32 32"><path d="M4 16H28M16 4V28M7 7L25 25M25 7L7 25" stroke="#c68057" strokeWidth="4"/></svg></div>
  <div style={{display:'flex',gap:9}}><svg width="132" height="77" viewBox="0 0 132 77"><rect width="132" height="77" rx="4" fill="#efccb6"/><circle cx="44" cy="40" r="27" fill="#be7955"/><path d="M61 66V12H113V66" fill="#d9a382"/><path d="M61 66L113 12" stroke="#fff1e6" strokeWidth="2"/></svg><div style={{display:'flex',flexDirection:'column',gap:7,paddingTop:8}}><Line width={64} color="#bd9986"/><Line width={54} color="#bd9986"/><Line width={59} color="#bd9986"/><div style={{width:46,height:14,marginTop:3,background:'#ad704d',borderRadius:3}}/></div></div>
</div>;

export const PortfolioCard:React.FC<{variant:DemoVariant}>=({variant})=> <div style={{width:252,height:180,borderRadius:10,overflow:'hidden',background:'#fff',border:'1px solid rgba(255,255,255,.9)',fontFamily:'Arial, sans-serif'}}>
  <div style={{height:25,display:'flex',alignItems:'center',gap:4,padding:'0 10px',background:'#fff'}}>
    {['#d8b8ab','#dbcfa9','#a7c2b1'].map(c=><span key={c} style={{width:4,height:4,borderRadius:4,background:c}}/>)}
    <div style={{height:8,width:115,borderRadius:3,background:'#f3f1ee',marginLeft:18}}/>
    <div style={{marginLeft:'auto',width:10,height:2,background:'#d4d0ca'}}/>
  </div>
  {variant==='editorial'?<Editorial/>:variant==='commerce'?<Commerce/>:<Studio/>}
</div>;
