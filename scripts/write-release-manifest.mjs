import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')
const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
const releaseTag = process.env.OUROBOROS_PLUGIN_RELEASE_TAG ?? process.env.GITHUB_REF_NAME ?? null
const releaseVersion = process.env.OUROBOROS_PLUGIN_RELEASE_VERSION ?? versionFromReleaseTag(releaseTag) ?? packageJson.version
const artifactName = process.env.OUROBOROS_PLUGIN_ARTIFACT ?? artifactNameForRelease(releaseTag)

const manifest = {
	name: packageJson.name,
	pluginName: packageJson.pluginName,
	version: releaseVersion,
	packageVersion: packageJson.version,
	index: packageJson.index,
	icon: packageJson.icon,
	dockerCompose: packageJson.dockerCompose,
	releaseTag,
	artifactName,
	commit: process.env.GITHUB_SHA ?? null,
	ref: process.env.GITHUB_REF_NAME ?? null
}

await mkdir(dist, { recursive: true })
await writeFile(join(dist, 'plugin-release.json'), `${JSON.stringify(manifest, null, 2)}\n`)

function artifactNameForRelease(tag) {
	const suffix = tag ? safeFilePart(tag) : packageJson.version
	return `${packageJson.name}-${suffix}.zip`
}

function versionFromReleaseTag(tag) {
	if (!tag?.startsWith('v')) return null
	return tag.slice(1)
}

function safeFilePart(value) {
	return value.replaceAll('/', '-')
}
