import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';
export const fontsReady=Promise.all([
 loadFont({family:'Syne',url:staticFile('fonts/Syne.woff2'),weight:'400 800'}),
 loadFont({family:'Inter',url:staticFile('fonts/Inter.woff2'),weight:'100 900'}),
]);
