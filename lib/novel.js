/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const util = require('util')
const execPromise = util.promisify(exec)

// Get all txt files recursively
function getTxtFiles(dir) {
  let results = []
  const list = fs.readdirSync(dir)

  list.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat && stat.isDirectory()) {
      results = results.concat(getTxtFiles(filePath))
    } else if (path.extname(file) === '.txt') {
      results.push(filePath)
    }
  })

  return results
}

// Convert txt to epub
async function convertToEpub(filePath) {
  // Get author name from parent directory
  const author = path.basename(path.dirname(filePath))
  // Get relative path from current working directory
  const relativePath = path.relative(process.cwd(), filePath)

  console.log(`Converting to epub: ${relativePath} by ${author}`)

  try {
    const command = `./kaf-cli -tips=0 -format epub -author "${author}" -filename "${relativePath}" --lang zh`
    const { stdout, stderr } = await execPromise(command)

    if (stdout) console.log('Conversion output:', stdout)
    if (stderr) console.error('Conversion error:', stderr)

    console.log(`Successfully converted ${relativePath} to epub`)
  } catch (error) {
    console.error(`Failed to convert ${relativePath} to epub:`, error)
  }
}

// Process single file
async function processFile(filePath) {
  console.log(`Start processing: ${filePath}`)

  try {
    let content = fs.readFileSync(filePath, {
      encoding: 'utf8',
    })

    // Remove BOM
    content = content.replace(/^\uFEFF/, '')
    content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

    let lines = content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    content = lines.join('\n\n')

    fs.writeFileSync(filePath, content, {
      encoding: 'utf8',
    })

    console.log(`Finished processing: ${filePath}`)

    await convertToEpub(filePath)
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error)
  }
}

// Main process
async function main() {
  try {
    const currentDir = process.cwd()
    const txtFiles = getTxtFiles(currentDir)

    // Process files sequentially
    for (const file of txtFiles) {
      await processFile(file)
    }

    console.log('All files processed successfully')
  } catch (error) {
    console.error('Error occurred:', error)
  }
}

// Run the main process
main()
