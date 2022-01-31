export const nodesArranger = async (Nodes) => {

	let result = {}

	if (Nodes && Nodes.length < 1) return (result)

	else {

		Nodes = Nodes.map(data => ({ ...data, subTrees: [] }))

		Nodes = Nodes.reverse()
		
		// seperate the root node from the other nodes
		let RootNode = Nodes.find(data => data.parentId === 0)

		let otherNodes = Nodes.filter(data => data.parentId)
		let predecessor

		// Put sub nodes(subtree) into parent nodes till the end
		const NewLoop = (tree) => {
			predecessor = otherNodes.filter(others => tree.id === others.parentId)
			otherNodes = otherNodes.filter(others => tree.id !== others.parentId)

			predecessor = [...predecessor]

			if (predecessor.length < 0) {
				return { ...tree }
			} else if (predecessor.length > 0) {
				return { ...tree, subTrees: predecessor.map(NewLoop) }
			} else {
				return tree
			}
		}
		result = await NewLoop(RootNode)
	}
	return result
}