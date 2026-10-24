const fs=require('node:fs');
const {execFileSync}=require('node:child_process');
fs.mkdirSync('out',{recursive:true});fs.mkdirSync('../videos',{recursive:true});
try{
 execFileSync(process.execPath,['node_modules/@remotion/cli/remotion-cli.js','render','src/index.ts','BiselDigital-BeyondTheScreen','out/base-film.mp4','--codec=h264','--crf=17','--pixel-format=yuv420p','--concurrency=2','--timeout=120000','--browser-executable=/usr/bin/chromium'],{stdio:'inherit'});
 execFileSync('ffmpeg',['-hide_banner','-i','out/base-film.mp4','-vf',"tmix=frames=2:weights='1 7':enable='between(t,3,22)'",'-filter_threads','2','-c:v','libx264','-crf','18','-preset','medium','-pix_fmt','yuv420p','-c:a','copy','-movflags','+faststart','-y','../videos/bisel-digital-beyond-the-screen.mp4'],{stdio:'inherit'});
 console.log('Final motion-blurred master exported.');
}catch(e){process.exit(e.status||1)}
