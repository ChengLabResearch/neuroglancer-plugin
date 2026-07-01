import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')
const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))

const manifest = {
	name: packageJson.name,
	pluginName: packageJson.pluginName,
	version: packageJson.version,
	index: packageJson.index,
	icon: packageJson.icon,
	dockerCompose: packageJson.dockerCompose,
	artifactName: `${packageJson.name}-${packageJson.version}.zip`,
	commit: process.env.GITHUB_SHA ?? null,
	ref: process.env.GITHUB_REF_NAME ?? null
}

await mkdir(dist, { recursive: true })
await writeFile(join(dist, 'plugin-release.json'), `${JSON.stringify(manifest, null, 2)}\n`)
