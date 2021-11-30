import useChart from "../../hooks/useChart";
import React, {useEffect} from "react";
import PropTypes from "prop-types";
import onMouseMove from "./onMouseMove";
import drawGrid from "./drawGrid";
import chartPropsTemplate from "../../templates/chartPropsTemplate";


export default function useLineChart(props) {
    let xBefore, yBefore

    const drawLine = ({axis, value, position, context}) => {
        const pVariation = (value * 100) / biggest
        const height = ((pVariation * (ref.current.height - labelSpacing * 2 - 4)) / 100)
        let x = (position * ((ref.current.width - labelSpacing * 2) / (props.data.length - 1))) + labelSpacing * 1.5,
            y = (ref.current.height - labelSpacing) - height - 8

        if (points.length === 0)
            setPoints(prevState => {
                return [...prevState, {x: x, y: y, axis: axis, value: value}]
            })

        context.strokeStyle = props.color ? props.color : '#0095ff'
        context.fillStyle = props.color ? props.color : '#0095ff'

        context.beginPath();
        context.arc(x, y, 4, 0, 2 * Math.PI);
        context.fill();
        context.stroke();

        if (position > 0) {
            context.beginPath();
            context.moveTo(xBefore, yBefore);

            context.lineTo(x, y);
            context.stroke();
        }

        xBefore = x
        yBefore = y
    }

    const drawChart = (ctx, clear) => {
        if (clear)
            clearCanvas()
        drawGrid({
            ctx: context,
            iterations: iterations,
            labelPadding: labelSpacing,
            data: props.data,
            element: ref.current,
            color: props.color,
            axisKey: props.axis.field
        })
        props.data.forEach((el, index) => {
            drawLine({
                axis: el[props.axis.field],
                value: el[props.value.field],
                context: ctx,
                position: index
            })
        })
    }

    const {
        points, setPoints, parentRef,
        theme, biggest, ref, iterations,
        labelSpacing, context,
        clearCanvas, width, height
    } = useChart({
        axisKey: props.axis.field,
        data: props.data,
        valueKey: props.value.field,
        onMouseMove: event => onMouseMove({
            ctx: context,
            event: event,
            points: points,
            drawChart: () => drawChart(context, true),
        })
    })

    useEffect(() => {
        if (context) {
            context.setLineDash([3, 3])
            context.fillStyle = theme.themes.mfc_color_primary
            context.font = "600 14px Roboto";
            drawChart(context, true)
        }
    }, [props.data, context, width, height, theme])


    return {ref, width, height, parentRef}
}


useLineChart.propTypes = chartPropsTemplate