import fs from 'fs'
import { spawn } from 'node:child_process'
import { defineDocumentType } from '@contentlayer/source-files'
import { makeSource } from 'contentlayer/source-remote-files'
import { bundleMDX } from 'mdx-bundler'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import rehypeImageSizes from './lib/rehype-image-sizes'

const REPO_URL = 'https://github.com/chanshiyucx/zen.git'

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `./blog/**/*.md`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'string',
      required: true,
    },
    category: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      required: true,
    },
    description: {
      type: 'string',
      required: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (blog) => {
        const { sourceFileDir, sourceFileName } = blog._raw
        return `/${sourceFileDir}/${sourceFileName.replace(/^(\d+-)|(.md)$/g, '')}`
      },
    },
    slug: {
      type: 'string',
      resolve: (blog) => {
        const { sourceFileName } = blog._raw
        return `${sourceFileName.replace(/^(\d+-)|(.md)$/g, '')}`
      },
    },
    summary: {
      type: 'json',
      resolve: async (blog) => {
        let raw = blog.description
        if (!raw) {
          const regex = /^(.+)?\r?\n\s*(.+)?(\r?\n)?/
          const result = regex.exec(blog.body.raw)
          raw = result ? result[2] : ''
        }
        const { code } = await bundleMDX({ source: raw })
        return { code, raw }
      },
    },
  },
}))

const syncContentFromGit = async (contentDirPath: string) => {
  const syncRun = async () => {
    if (fs.existsSync(contentDirPath)) {
      await runBashCommand(`cd ${contentDirPath} && git pull`)
    } else {
      await runBashCommand(
        `git clone --depth 1 --single-branch ${REPO_URL} ${contentDirPath}`,
      )
    }
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
    console.log(`Run bash command: ${command}`)
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
  contentDirPath: 'public/zen',
  documentTypes: [Blog],
  disableImportAliasWarning: true,
  mdx: {
    rehypePlugins: [
      [rehypeExternalLinks, { rel: ['nofollow'] }],
      [rehypePrettyCode, { theme: 'one-dark-pro', showLineNumbers: true }],
      [rehypeImageSizes, { root: 'public' }],
    ],
    remarkPlugins: [remarkGfm],
  },
})
