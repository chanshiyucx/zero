import fs from 'fs'
import { spawn } from 'node:child_process'
import { defineDocumentType } from '@contentlayer/source-files'
import { makeSource } from 'contentlayer/source-remote-files'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import rehypeImageSizes from './utils/rehypeImageSizes'

const POST_PATH = '時雨'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `${POST_PATH}/**/*.md`,
  contentType: 'mdx',
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    no: {
      type: 'number',
      resolve: (post) => Number(post._raw.sourceFilePath.match(/\d{4}\/\d{2}/)[0].replace(/\//g, '')),
    },
    title: {
      type: 'string',
      resolve: (post) => post._raw.sourceFileName.replace(/^\d+-/g, '').replace(/.md/g, '').replace(/-/g, ' '),
    },
  },
}))

const syncContentFromGit = async (contentDir: string) => {
  const syncRun = async () => {
    const gitUrl = 'git@github.com:chanshiyucx/blog.git'
    if (fs.existsSync(contentDir)) {
      await runBashCommand(`cd ${contentDir} && git pull`)
    } else {
      await runBashCommand(`git clone --depth 1 --single-branch ${gitUrl} ${contentDir}`)
    }
    await runBashCommand(`cp -r ${contentDir}/IMAGES public/`)
  }

  let wasCancelled = false
  let syncInterval: ReturnType<typeof setInterval>

  const syncLoop = async () => {
    console.log('Syncing content files from git')

    await syncRun()

    if (wasCancelled) return
    syncInterval = setTimeout(syncLoop, 1000 * 60)
  }

  // Block until the first sync is done
  await syncLoop()

  return () => {
    wasCancelled = true
    clearTimeout(syncInterval)
  }
}

const runBashCommand = (command: string) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, [], { shell: true })
    child.stdout.setEncoding('utf8')
    child.stdout.on('data', (data) => process.stdout.write(data))
    child.stderr.setEncoding('utf8')
    child.stderr.on('data', (data) => process.stderr.write(data))
    child.on('close', function (code) {
      if (code === 0) {
        resolve(void 0)
      } else {
        reject(new Error(`Command failed with exit code ${code}`))
      }
    })
  })

export default makeSource({
  syncFiles: syncContentFromGit,
  contentDirPath: 'content',
  contentDirInclude: [POST_PATH],
  documentTypes: [Post],
  disableImportAliasWarning: true,
  mdx: {
    rehypePlugins: [
      [rehypeExternalLinks, { rel: ['nofollow'] }],
      [rehypePrettyCode, { theme: 'github-dark' }],
      [rehypeImageSizes, { root: 'public' }],
    ],
    remarkPlugins: [remarkGfm],
  },
})
