const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const crypto=require('node:crypto');
const assert=require('node:assert/strict');
const root=process.cwd();
const master=path.resolve(root,'../videos/bisel-digital-beyond-the-screen.mp4');
const preview=path.resolve(root,'../videos/bisel-digital-beyond-the-screen-preview.mp4');
const run=(args)=>execFileSync('ffmpeg',args,{encoding:'utf8',maxBuffer:8e6});
const info=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',master],{encoding:'utf8'}));
const video=info.streams.find(s=>s.codec_type==='video');
const audio=info.streams.find(s=>s.codec_type==='audio');
assert.equal(video.codec_name,'h264');assert.equal(video.width,1920);assert.equal(video.height,1080);
assert.equal(video.r_frame_rate,'30/1');assert.equal(Number(video.nb_frames),840);
assert(Math.abs(Number(info.format.duration)-28)<.05);assert.equal(audio.codec_name,'aac');assert.equal(audio.channels,2);
run(['-v','error','-xerror','-i',master,'-f','null','-']);
console.log('PASS: Full decode, 1920x1080 H.264, 840 frames, 30fps, 28s, AAC stereo.');
const proc=require('node:child_process').spawnSync('ffmpeg',['-hide_banner','-i',master,'-vf','blackdetect=d=0.1:pix_th=0.03:pic_th=0.98','-an','-f','null','-'],{encoding:'utf8',maxBuffer:8e6});
assert.equal(proc.status,0);assert(!proc.stderr.includes('black_start:'),'Unexpected black segment');
run(['-v','error','-i',master,'-vf','scale=1280:720','-c:v','libx264','-crf','20','-preset','medium','-c:a','aac','-b:a','160k','-movflags','+faststart','-y',preview]);
const times=[0,2,4.2,6.5,9,11.5,13,15.5,18,21.5,24.8,27.5];
fs.mkdirSync('review/keyframes',{recursive:true});
for(const time of times){const name=`frame-${time.toFixed(1).replace('.','-')}s.jpg`;run(['-v','error','-ss',String(time),'-i',master,'-frames:v','1','-q:v','2','-y','review/keyframes/'+name]);}
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
fs.writeFileSync('/tmp/bisel-fontconfig.conf','<fontconfig><dir>/usr/share/fonts</dir><cachedir>/tmp/bisel-font-cache</cachedir></fontconfig>');
fs.mkdirSync('/tmp/bisel-font-cache',{recursive:true});process.env.FONTCONFIG_FILE='/tmp/bisel-fontconfig.conf';
const sharp=require('sharp');
(async()=>{
const chosen=[0,4.2,6.5,9,13,15.5,21.5,24.8,27.5];
const captions=['00:00 · Origen','00:04 · Dental','00:06 · Inmobiliaria','00:09 · Jurídico y tienda','00:13 · Nuevas experiencias','00:15 · Ocho mundos','00:21 · Órbitas','00:24 · Constelación','00:27 · Bisel Digital'];
const parts=[];
for(let i=0;i<9;i++){
 const name=`review/keyframes/frame-${chosen[i].toFixed(1).replace('.','-')}s.jpg`;
 parts.push({input:await sharp(name).resize(640,360).toBuffer(),left:i%3*640,top:Math.floor(i/3)*392});
 parts.push({input:Buffer.from(`<svg width="640" height="32"><rect width="640" height="32" fill="#16181c"/><text x="17" y="22" fill="#f3efe7" font-family="DejaVu Sans" font-size="15">${captions[i]}</text></svg>`),left:i%3*640,top:Math.floor(i/3)*392+360});
}
await sharp({create:{width:1920,height:1176,channels:3,background:'#16181c'}}).composite(parts).jpeg({quality:94}).toFile('review/contact-sheet.jpg');
fs.copyFileSync('review/keyframes/frame-24-8s.jpg','review/hero-constellation.jpg');
const sourceEqual=hash('public/source-devices.png')===hash('../remotion-hero/public/devices-plate.png');
const report={master:info,master_sha256:hash(master),master_size_bytes:fs.statSync(master).size,preview_size_bytes:fs.statSync(preview).size,full_decode:'passed',black_segments:'none detected (threshold 98%, >=0.1s)',reference_access:'HTTPS CONNECT rejected with 403; original illustrative compositions used per brief',source_plate_same_as_previous:sourceEqual,source_plate_sha256:hash('public/source-devices.png'),worlds:8,keyframes:times,audio_origin:'Original procedural synthesis, no third-party samples',composition_id:'BiselDigital-BeyondTheScreen'};
fs.writeFileSync('review/validation.json',JSON.stringify(report,null,2)+'\n');
console.log('Prepared 720p preview, 12 keyframes, contact sheet and validation.json.');
})().catch(e=>{console.error(e);process.exit(1)});
