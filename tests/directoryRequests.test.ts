import assert from "node:assert/strict"
import test from "node:test"

import {
	applyDirectoryContentsResponse,
	createDirectoryContentsRequest,
	parseDirectoryContentsResponse,
	type DirectoryData,
	type NodeChildren,
} from "../src/App/directoryRequests.ts"

const initialDirectory: DirectoryData = {
	type: "send-directory-contents",
	data: {
		directoryPath: "/data/current",
		directoryName: "current",
		nodes: {},
	},
}

const nodes: NodeChildren = {
	"state.json": {
		name: "state.json",
		path: "/data/current/state.json",
	},
}

function response(
	requestId: string | null,
	path = "/data/current",
	error?: Record<string, unknown>,
	responseNodes: NodeChildren = nodes,
) {
	return {
		type: "send-directory-contents-response",
		data: { requestId, path, nodes: responseNodes, error },
	}
}

test("creates unique recursive directory requests", () => {
	const first = createDirectoryContentsRequest("/data/first", 1)
	const second = createDirectoryContentsRequest("/data/second", 2)

	assert.equal(first.requestId, "loadfile-1")
	assert.equal(second.requestId, "loadfile-2")
	assert.deepEqual(first.message.data, {
		path: "/data/first",
		recursive: true,
		requestId: "loadfile-1",
	})
})

test("applies a matching recursive response", () => {
	const parsed = parseDirectoryContentsResponse(
		response("loadfile-2"),
		"loadfile-2",
	)
	assert.ok(parsed)

	const updated = applyDirectoryContentsResponse(initialDirectory, parsed)
	assert.deepEqual(updated?.data.nodes, nodes)
})

test("ignores missing and stale responses after rapid root changes", () => {
	assert.equal(
		parseDirectoryContentsResponse(response("loadfile-1"), "loadfile-2"),
		null,
	)
	assert.equal(
		parseDirectoryContentsResponse(response(null), "loadfile-2"),
		null,
	)
	assert.equal(parseDirectoryContentsResponse(response(null), null), null)
})

test("does not apply a response for a different directory path", () => {
	const parsed = parseDirectoryContentsResponse(
		response("loadfile-2", "/data/old"),
		"loadfile-2",
	)
	assert.ok(parsed)
	assert.equal(
		applyDirectoryContentsResponse(initialDirectory, parsed),
		initialDirectory,
	)
})

for (const code of ["denied", "not-found", "internal"]) {
	test(`${code} responses expose an empty tree`, () => {
		const parsed = parseDirectoryContentsResponse(
			response("loadfile-2", "/data/current", {
				code,
				message: `${code} response`,
			}),
			"loadfile-2",
		)
		assert.ok(parsed)
		assert.deepEqual(parsed.nodes, {})
	})
}

test("limit responses preserve partial results", () => {
	const parsed = parseDirectoryContentsResponse(
		response("loadfile-2", "/data/current", {
			code: "limit",
			message: "result limit reached",
			truncated: true,
		}),
		"loadfile-2",
	)
	assert.ok(parsed)
	assert.deepEqual(parsed.nodes, nodes)
})
