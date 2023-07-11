import fs from 'fs'
import { spawn } from 'node:child_process'
import type { Inspiration } from './type'
import { defineDocumentType } from '@contentlayer/source-files'
import { makeSource } from 'contentlayer/source-remote-files'
import { bundleMDX } from 'mdx-bundler'
import rehypeExternalLinks from 'rehype-external-links'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import rehypeImageSizes from './utils/rehypeImageSizes'

const POST_PATH = '時雨'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `${POST_PATH}/**/*.md`,
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
      resolve: (post) => `/posts/${post.title}`,
    },
    summary: {
      type: 'json',
      resolve: async (post) => {
        let raw = post.description
        if (!raw) {
          const regex = /^(.+)?\r?\n\s*(.+)?(\r?\n)?/
          const result = regex.exec(post.body.raw)
          raw = result ? result[2] : ''
        }
        const { code } = await bundleMDX({ source: raw })
        return { code, raw }
      },
    },
    inspiration: {
      type: 'json',
      resolve: async (post) => {
        const list: Inspiration[] = []
        if (post.category === '一心净土') {
          const regex = /^(.+)(\r?\n)?/
          const section = post.body.raw.split('## ').filter((e) => e.replace(/[\r\n]/g, '').length)
          for (const e of section) {
            const result = regex.exec(e)
            const title = result ? result[0] : ''
            const raw = e.slice(title.length)
            const { code } = await bundleMDX({ source: raw })
            list.push({ title, raw, code })
          }
        }
        return list.reverse()
      },
    },
  },
}))

const syncContentFromGit = async (contentDir: string) => {
  const syncRun = async () => {
    const gitUrl = 'https://github.com/chanshiyucx/blog.git'
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
      [rehypePrettyCode, { theme: 'material-theme-lighter' }],
      [rehypeImageSizes, { root: 'public' }],
    ],
    remarkPlugins: [remarkGfm],
  },
})
