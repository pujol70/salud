const assert=require('node:assert/strict');
const fs=require('node:fs');
const Module=require('node:module');
const ts=require('typescript');
// Compile the actual implementation, then test the mathematical boundary.
const filename=require('node:path').resolve('src/orbit.ts');
const {outputText}=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}});
const m=new Module(filename,module);m.filename=filename;m.paths=Module._nodeModulePaths(require('node:path').dirname(filename));m._compile(outputText,filename);
const {orbitState,DEVICE_GEOMETRY}=m.exports;
let boundarySamples=0,layerSamples=0;
for(const offset of [0,100,200]){
 for(const frame of [-.001,0,.001,17.5,74.9,75.1,150,224.9,225.1,299,300]){
  const a=orbitState(frame,offset,300), b=orbitState(frame+300,offset,300);
  for(const key of Object.keys(a))assert(Math.abs(a[key]-b[key])<1e-8,`${key}: discontinuity at ${frame}`);
  boundarySamples++;
 }
 for(let f=0;f<300;f++){
  const s=orbitState(f,offset,300);
  assert(s.depth>=0?s.zIndex>10:s.zIndex<10,'Incorrect foreground/back ordering');
  assert(s.scale>=0 && s.scale<=1.13+1e-8);
  assert(s.opacity>=0 && s.opacity<=1);
  layerSamples++;
 }
 // Evaluate the two one-sided derivatives at the export boundary.
 const eps=.0001;
 for(const key of ['x','y','scale','opacity']){
  const before=orbitState(300-eps,offset,300)[key];
  const at=orbitState(0,offset,300)[key];
  const after=orbitState(eps,offset,300)[key];
  assert(Math.abs((at-before)/eps-(after-at)/eps)<.001,`Velocity jump in ${key}`);
 }
}
const birth=orbitState(0,0,300);
assert.equal(birth.x,0);assert.equal(birth.y,0);assert.equal(birth.scale,0);
assert.equal(DEVICE_GEOMETRY.screenCenter.x,737.75);
assert(orbitState(30,0,300).scale>orbitState(150,0,300).scale);
console.log(`PASS: ${boundarySamples} periodic samples, ${layerSamples} depth/layer samples, 3 velocity boundaries; spawn center and front/back scale verified.`);
