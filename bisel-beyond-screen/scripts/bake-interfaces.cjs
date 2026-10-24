const {execFileSync}=require('node:child_process');
const fs=require('node:fs');
fs.mkdirSync('public/layouts',{recursive:true});
const subjects=[['Dental','dental'],['Realestate','realestate'],['Legal','legal'],['Commerce','commerce'],['Architecture','architecture'],['English','english'],['Fashion','fashion'],['Civic','civic']];
for(const [comp,id] of subjects){
 execFileSync(process.execPath,['node_modules/@remotion/cli/remotion-cli.js','still','src/index.ts',comp+'Interface','public/layouts/'+id+'-interface.png','--browser-executable=/usr/bin/chromium','--log=error'],{stdio:'inherit'});
 console.log('Baked transparent 2x interface:',id);
}
