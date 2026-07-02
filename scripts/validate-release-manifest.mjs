import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const dist = join(root, 'dist')
const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))
const releaseTag = process.env.OUROBOROS_PLUGIN_RELEASE_TAG ?? process.env.GITHUB_REF_NAME ?? null
const releaseVersion = process.env.OUROBOROS_PLUGIN_RELEASE_VERSION ?? versionFromReleaseTag(releaseTag) ?? packageJson.version
const artifactName = process.env.OUROBOROS_PLUGIN_ARTIFACT ?? artifactNameForRelease(releaseTag)

assert(existsSync(join(dist, 'package.json')), 'release layout is missing package.json')
assert(existsSync(join(dist, packageJson.index)), `release layout is missing ${packageJson.index}`)
assert(existsSync(join(dist, packageJson.icon)), `release layout is missing ${packageJson.icon}`)
assert(
	existsSync(join(dist, packageJson.dockerCompose)),
	`release layout is missing ${packageJson.dockerCompose}`
)

const manifest = JSON.parse(await readFile(join(dist, 'plugin-release.json'), 'utf8'))

assert(manifest.name === packageJson.name, 'manifest name mismatch')
assert(manifest.pluginName === packageJson.pluginName, 'manifest pluginName mismatch')
assert(manifest.version === releaseVersion, 'manifest release version mismatch')
assert(manifest.packageVersion === packageJson.version, 'manifest package version mismatch')
assert(manifest.releaseTag === releaseTag, 'manifest release tag mismatch')
assert(manifest.artifactName === artifactName, 'manifest artifact name mismatch')
assert(manifest.index === packageJson.index, 'manifest index mismatch')
assert(manifest.icon === packageJson.icon, 'manifest icon mismatch')
assert(manifest.dockerCompose === packageJson.dockerCompose, 'manifest compose path mismatch')

console.log(`Validated Neuroglancer release layout for ${releaseTag ?? packageJson.version}.`)

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

function assert(condition, message) {
	if (!condition) throw new Error(message)
}
