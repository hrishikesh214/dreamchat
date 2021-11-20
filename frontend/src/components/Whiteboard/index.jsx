import React from "react"
import { SketchField, Tools } from "react-sketch-whiteboard"

class SketchFieldDemo extends React.Component {
	render() {
		return (
			<SketchField
				backgroundColor="black"
				width="1024px"
				height="768px"
				tool={Tools.Pencil}
				lineColor="white"
				lineWidth={3}
			/>
		)
	}
}

export default SketchFieldDemo
