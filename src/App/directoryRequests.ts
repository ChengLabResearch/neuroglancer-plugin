export type DirectoryData = {
	type: string
	data: {
		directoryPath: string | null
		directoryName: string | null
		nodes: NodeChildren
	}
}

export type FileSystemNode = {
	name: string
	path: string
	children?: NodeChildren
}

export type NodeChildren = {
	[key: string]: FileSystemNode
}

export type ParsedDirectoryContentsResponse = {
	path: string
	nodes: NodeChildren
	error: Record<string, unknown> | null
}

export function createDirectoryContentsRequest(path: string, sequence: number) {
	const requestId = `loadfile-${sequence}`
	return {
		requestId,
		message: {
			type: "request-directory-contents",
			data: {
				path,
				recursive: true,
				requestId,
			},
		},
	}
}

export function parseDirectoryContentsResponse(
	message: unknown,
	activeRequestId: string | null,
): ParsedDirectoryContentsResponse | null {
	if (!activeRequestId || !isRecord(message) || !isRecord(message.data)) {
		return null
	}

	const data = message.data
	if (data.requestId !== activeRequestId || typeof data.path !== "string") {
		return null
	}

	const error = isRecord(data.error) ? data.error : null
	const errorCode = typeof error?.code === "string" ? error.code : null
	const responseNodes = isRecord(data.nodes)
		? (data.nodes as NodeChildren)
		: {}
	const nodes =
		errorCode === "denied" ||
		errorCode === "not-found" ||
		errorCode === "internal"
			? {}
			: responseNodes

	return { path: data.path, nodes, error }
}

export function applyDirectoryContentsResponse(
	current: DirectoryData | null,
	response: ParsedDirectoryContentsResponse,
): DirectoryData | null {
	if (!current || current.data.directoryPath !== response.path) {
		return current
	}

	return {
		...current,
		data: {
			...current.data,
			nodes: response.nodes,
		},
	}
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}
