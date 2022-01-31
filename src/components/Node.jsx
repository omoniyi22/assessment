import React, { useState } from "react";
import { createNode, deleteNode, updateNode } from "../services/apis";
import "./node.css";

const NodeComponent = (props) => {
	let [nodeName, setNodeName] = useState("");

	const DeleteNode = async (id) => {
		let nodes = await deleteNode(id);
		await props.UpdateNode(nodes);
	};

	const CreateNode = async (data) => {
		if (nodeName) {
			let nodes = await createNode(data);
			await props.UpdateNode(nodes);
		}
	};

	const UpdateNode = async (id, data) => {
		if (nodeName) {
			let nodes = await updateNode(id, data);
			await props.UpdateNode(nodes);
		}
	};

	const handleChange = (event) => {
		event.preventDefault();
		if (event.target.value) {
			setNodeName(event.target.value);
		}
	};

	let { value, ancestorIds, hierarchy, id } = props;
	return (
		<div className="node-container">
			<div className="node" style={{ marginLeft: `${hierarchy * 14}px` }}>
				{value}
			</div>

			<button className="delete-btn" onClick={() => DeleteNode(id)}>
				delete
			</button>
			<div className="set-box">
				<button
					className="update-btn"
					onClick={() => UpdateNode(id, { value: nodeName })}
				>
					update
				</button>
				<input value={nodeName} onChange={handleChange} type="text" />
				<button
					className="create-btn"
					onClick={() =>
						CreateNode({ ancestorIds, value: nodeName, parentId: id })
					}
				>
					create
				</button>
			</div>
		</div>
	);
};

export default NodeComponent;
