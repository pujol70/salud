"""Original procedural score. No samples or third-party recordings. Fixed seed."""
import math, random, wave, array
RATE=32000
DURATION=28
rng=random.Random(7019)
starts=[3.1,5,7.3,8.9,10.5,12.1,13.5,14.9]
chords=[[110,130.8128,164.8138,195.9977,246.9417],[87.3071,110,130.8128,164.8138,195.9977],[130.8128,164.8138,195.9977,246.9417,293.6648],[97.9989,123.4708,146.8324,220,261.6256]]
out=array.array('h');low=0.;prev=0.
for n in range(RATE*DURATION):
 t=n/RATE
 fade=min(1,t/2.2,max(0,(28-t)/1.25))
 energy=.7+.3*min(1,t/20)
 sample=0.
 for k,notes in enumerate(chords):
  center=k*6.3+2
  env=math.exp(-((t-center)/5.0)**4)
  for j,f in enumerate(notes):
   amp=.0065*env/(1+j*.14)
   sample+=amp*(math.sin(2*math.pi*f*t+.18*math.sin(t*.31+j))+.16*math.sin(2*math.pi*(f*2.003)*t))
 sample+=.006*math.sin(2*math.pi*43.65*t)*(.65+.35*math.sin(t*.23)**2)
 low=.975*low+.025*rng.uniform(-1,1)
 hiss=low-prev;prev=low
 left=right=sample*energy
 for i,s in enumerate(starts):
  age=t-s
  if -.12<age<.85:
   env=math.sin(math.pi*(age+.12)/.97)**2
   whoosh=(hiss*1.5+low*.15)*env*.36
   tone=.009*math.sin(2*math.pi*(390+145*max(0,age))*age)*env*math.exp(-max(0,age)*5)
   pan=min(1,max(0,(age+.12)/.97))
   left+=(whoosh+tone)*math.cos(pan*math.pi/2)
   right+=(whoosh+tone)*math.sin(pan*math.pi/2)
 # Soft activation and final harmonic resolution.
 for s,f in [(1.7,523.251),(26.05,523.251),(26.28,659.255),(26.55,783.991)]:
  a=t-s
  if a>=0:
   bell=.018*math.sin(2*math.pi*f*a)*math.exp(-a*2.0)*(1-math.exp(-a*22))
   left+=bell;right+=bell
 left*=fade;right*=fade
 out.append(max(-32767,min(32767,int(left*32767))))
 out.append(max(-32767,min(32767,int(right*32767))))
with wave.open('/tmp/bisel-original-score.wav','wb') as w:
 w.setnchannels(2);w.setsampwidth(2);w.setframerate(RATE);w.writeframes(out.tobytes())
print('Created original 28s stereo score, seed 7019.')
