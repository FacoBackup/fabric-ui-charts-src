import PropTypes from "prop-types";
import onMouseMove from "./onMouseMove";
import getAngle from "../utils/getAngle";

export default function onHoverPieSlice(props) {
    let drawn = undefined
    const isInside = ((props.event.x - props.placement.cx) ** 2 + (props.event.y - props.placement.cy) ** 2) < props.placement.radius ** 2

    if (isInside) {
        props.points.forEach((p, i) => {
            let pointAngle = getAngle({x: props.event.x - props.placement.cx, y: props.event.y - props.placement.cy})

            if(pointAngle < 0)
                pointAngle +=6.28319

            if (pointAngle>= p.startAngle && pointAngle<= p.endAngle) {

                const placement = {
                    align: 'middle',
                    justify:'end'
                }
                drawn = true

                console.log('HERE')
                // if (i === props.ctx.lastOnHover)
                    props.ctx.tooltip(
                        {...p, width: 20,height: 20, x: props.event.x, y: props.event.y},
                        'rgba(0,0,0,.75)',
                        props.event,
                        placement,
                        () => props.drawChart(i)
                    )
                // else
                //     props.ctx.opacityTransition(false, '#000', 250, (color) => {
                //         props.ctx.tooltip(
                //             {...p, width: 20,height: 20, x: props.event.x, y: props.event.y},
                //             color,
                //             props.event,
                //             placement,
                //             () => props.drawChart(i)
                //         )
                //     }, .75)

                CanvasRenderingContext2D.prototype.lastOnHover = i
            }
        })
    }
    else
        drawn = false
    if (drawn === false) {
        CanvasRenderingContext2D.prototype.lastOnHover = undefined
        props.drawChart()
    }
}

onHoverPieSlice.propTypes = {
    event: PropTypes.object.isRequired,
    points: PropTypes.array.isRequired,

    ctx: PropTypes.object.isRequired,
    drawChart: PropTypes.func.isRequired,

    placement: PropTypes.object

}