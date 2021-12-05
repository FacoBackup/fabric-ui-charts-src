import hexToRgba from "./hexToRgba";

export default function transition(backwards, color, timestamp, drawContent){
    let start, previousTimeStamp

    const step = (t) => {
        if (start === undefined)
            start = t;
        const elapsed = t - start;
        const rgbaColor = hexToRgba(color, (elapsed) / timestamp)

        if (previousTimeStamp !== t)
            drawContent(rgbaColor)
        if (timestamp > elapsed ) {
            previousTimeStamp = t
            requestAnimationFrame(step);
        } else
            drawContent(rgbaColor)
    }

    requestAnimationFrame(step)

}