const fs=require('node:fs'),ts=require('typescript'),Module=require('node:module'),assert=require('node:assert/strict');
const path=require('node:path').resolve('src/choreography.ts');
const js=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText;
const m=new Module(path,module);m.filename=path;m.paths=Module._nodeModulePaths(require('node:path').dirname(path));m._compile(js,path);
const {WORLDS,worldPose,emergenceQuad,poseQuad,quadMatrix,sourcePoint,SCREEN}=m.exports;
assert.equal(WORLDS.length,8);assert.equal(new Set(WORLDS.map(w=>w.id)).size,8);
let samples=0;
for(let i=0;i<8;i++){
 const w=WORLDS[i];
 const birth=emergenceQuad(w.start,i);
 birth.forEach((p,k)=>{const ref=sourcePoint(SCREEN[k],w.start);assert(Math.hypot(p.x-ref.x,p.y-ref.y)<1e-8)});
 let previous=worldPose(w.start,i).x;
 for(let f=1;f<=40;f++){
  const p=worldPose(w.start+f/30,i);assert(p.x>=previous-.001,'Emergence must move right');previous=p.x;
 }
 let front=false,back=false;
 for(let f=Math.ceil(w.start*30);f<690;f++){
  const p=worldPose(f/30,i);
  Object.values(p).forEach(v=>assert(Number.isFinite(v)));
  if(p.layer>10)front=true;else back=true;
  samples++;
 }
 assert(front&&back,`${w.id} must have front and back passes`);
 const pose=worldPose(25.5,i);assert(pose.opacity>.99);assert(pose.layer>10);
 if(i<2)assert(pose.scale>=.69);
 const quad=emergenceQuad(25.5,i);
 quad.forEach(p=>assert(p.x>0&&p.x<1920&&p.y>0&&p.y<1080,'Grand formation clips'));
 // Evaluate the actual CSS projective matrix at all four corners.
 const values=quadMatrix(quad).slice(9,-1).split(',').map(Number);
 [[0,0],[960,0],[960,620],[0,620]].forEach(([x,y],k)=>{
  const d=values[3]*x+values[7]*y+values[15];
  const u=(values[0]*x+values[4]*y+values[12])/d;
  const v=(values[1]*x+values[5]*y+values[13])/d;
  assert(Math.hypot(u-quad[k].x,v-quad[k].y)<1e-6,'Homography corner mismatch');
 });
}
console.log(`PASS: ${samples} finite motion samples; eight rightward launches; eight front/back crossings; exact portal corner mapping; unclipped eight-world final formation with two dominant subjects.`);
