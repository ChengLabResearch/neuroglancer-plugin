import { spawn } from "node:child_process"
import { once } from "node:events"
import { join } from "node:path"

const root = process.cwd()
const host = "127.0.0.1"
const port = 4173
const server = spawn(
	process.execPath,
	[
		join(root, "node_modules", "vite", "bin", "vite.js"),
		"--host",
		host,
		"--port",
		String(port),
		"--strictPort",
	],
	{ cwd: root, stdio: ["ignore", "pipe", "pipe"] },
)

let output = ""
server.stdout.on("data", (chunk) => {
	output += chunk
})
server.stderr.on("data", (chunk) => {
	output += chunk
})

try {
	for (const page of ["/", "/ngrefactor.html"]) {
		const response = await waitForResponse(`http://${host}:${port}${page}`)
		const html = await response.text()
		assert(response.ok, `${page} returned HTTP ${response.status}`)
		assert(html.includes("<html"), `${page} did not return HTML`)
	}
	console.log("Validated Vite development entry points.")
} finally {
	if (server.exitCode === null) {
		const exited = once(server, "exit")
		server.kill()
		await Promise.race([exited, delay(5_000)])
	}
}

async function waitForResponse(url) {
	const deadline = Date.now() + 15_000
	while (Date.now() < deadline) {
		if (server.exitCode !== null) {
			throw new Error(`Vite exited before serving ${url}:\n${output}`)
		}
		try {
			return await fetch(url)
		} catch {
			await delay(100)
		}
	}
	throw new Error(`Timed out waiting for ${url}:\n${output}`)
}

function delay(milliseconds) {
	return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function assert(condition, message) {
	if (!condition) throw new Error(message)
}
