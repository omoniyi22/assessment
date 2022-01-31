import { nodesArranger } from "./arranger"

let BASE = 'http://localhost:4000'


export const getNodes = async () => {
	let allNodes = await fetch(`${BASE}/node`)
	allNodes = await allNodes.json()
	allNodes = await nodesArranger(allNodes)
	return allNodes
}

export const createNode = async (data) => {
	await fetch(`${BASE}/node`, {
		method: "POST", headers: {
			'Content-Type': 'application/json',
		}, body: JSON.stringify(data)
	})
	return await getNodes()
}

export const deleteNode = async (id) => {
	await fetch(`${BASE}/node/${id}`, {
		method: "DELETE"
	})
	return await getNodes()
}

export const updateNode = async (id, data) => {
	await fetch(`${BASE}/node/${id}`, {
		method: "PATCH", headers: {
			'Content-Type': 'application/json',
		}, body: JSON.stringify(data)
	})
	return await getNodes()
}