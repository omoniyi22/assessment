import React, { useEffect, useState } from 'react';
import { createNode, getNodes } from './services/apis';
import NodeComponent from "./components/Node"


const App = () => {

	const [nodes, setNodes] = useState({})

	useEffect(() => {
		async function FetchNodes() {
			let nodes = await getNodes()
			setNodes(nodes)
		}
		FetchNodes()
	}, [])


	const CreateRootNode = async (data) => {
		let nodes = await createNode(data);
		setNodes(nodes)
	};

	const UpdateNode = (nodes) => {
		setNodes(nodes)
	}

	const NodeRender = ({ props }) => {

		let { value, parentId, ancestorIds, subTrees, hierarchy, id } = props

		if (subTrees && subTrees.length > 0) {
			return (
				<div>
					<NodeComponent  {...{ value, UpdateNode, parentId, ancestorIds, hierarchy, id }} />
					{subTrees.map((tree, index) => <NodeRender key={`${index}`} props={tree} />)}
				</div>
			)
		} else {
			return <NodeComponent  {...{ value, parentId, ancestorIds, hierarchy, id, UpdateNode }} />
		}
	}



  


	return (
		<div className="app container">
			<div className="section text-left">
				<h1 className=" title is-1">Node tree view</h1>
				
				{/* Create a new node when there is no node available  */}

				{!nodes.value ?
					<button onClick={() => CreateRootNode({ value: "root node" })}>Create Root Node</button> :
					<NodeRender props={nodes} />
				}

			</div>
		</div>
	);
}

export default App;