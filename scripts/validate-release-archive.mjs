import { spawnSync } from "node:child_process"
import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join, resolve } from "node:path"

const root = process.cwd()
const archive = resolve(process.argv[2] ?? "")

assert(process.argv[2], "usage: npm run validate:archive -- <archive.zip>")
assert(existsSync(archive), `release archive does not exist: ${archive}`)

runUnzip(["-t", archive])
const entries = new Set(
	runUnzip(["-Z1", archive])
		.split(/\r?\n/u)
		.filter(Boolean),
)

for (const required of [
	"package.json",
	"plugin-release.json",
	"index.html",
	"ngrefactor.html",
	"icon.svg",
	"compose.yml",
	"Dockerfile",
	"requirements.txt",
	"app/main.py",
]) {
	assert(entries.has(required), `release archive is missing ${required}`)
}

const archivedManifest = runUnzip(["-p", archive, "plugin-release.json"]).trim()
const builtManifest = (
	await readFile(join(root, "dist", "plugin-release.json"), "utf8")
).trim()
assert(
	archivedManifest === builtManifest,
	"archived release manifest does not match the validated build manifest",
)

console.log(`Validated release archive ${archive}.`)

function runUnzip(args) {
	const result = spawnSync("unzip", args, { encoding: "utf8" })
	if (result.status !== 0) {
		throw new Error(result.stderr || result.stdout || "unzip failed")
	}
	return result.stdout
}

function assert(condition, message) {
	if (!condition) throw new Error(message)
}
