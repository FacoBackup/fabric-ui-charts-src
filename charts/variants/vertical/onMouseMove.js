import PropTypes from "prop-types";

export default function onMouseMove (props) {
    let drawn = undefined
    props.points.forEach((p, i) => {
        if (props.event.x  >= p.x && props.event.x  <= p.x2 && props.event.y <= p.y  && props.event.y >= p.y2) {
            drawn = true

            props.drawChart()
            props.ctx.fillStyle = '#333333'
            const x = (props.event.width - props.event.x) <= 100 ? props.event.x - 100 : props.event.x
            props.ctx.roundRect(x, props.event.y, 100, 50, 5).fill()

            props.ctx.fillStyle = 'white'
            props.ctx.fillText(`Axis: ${p.axis}`, x + 6, props.event.y+ 20)
            props.ctx.fillText(`Value: ${p.value}`, x + 6, props.event.y+ 40)
        } else if (drawn === undefined)
            drawn = false
    })

    if (drawn === false)
        props.drawChart()
}

onMouseMove.propTypes={
    event: PropTypes.object.isRequired,
    points: PropTypes.array.isRequired,

    ctx:  PropTypes.object.isRequired,
    drawChart: PropTypes.func.isRequired

}