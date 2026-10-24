import React from 'react';
import {Img} from 'remotion';
/** Static photographic textures use native images, avoiding canvas repaint stalls.
 * The parent world controls timing; Img blocks rendering until its asset is loaded.
 */
type Props=React.ComponentProps<typeof Img>&{premountFor?:number};
export const StableImage:React.FC<Props>=({premountFor:_premountFor,...props})=><Img {...props}/>;
