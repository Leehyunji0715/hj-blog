const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const mdxDirectory = 'src/data/posts'
const metaFile = 'posts.json'
const metaFileDirectory = `src/data/${metaFile}`
const metaDataList = []
let fileCount = 0

// Execution
generatePostMetaData()

function generatePostMetaData() {
  fs.readdir(mdxDirectory, (err, files) => {
    if (err) {
      console.error('Error reading directory: ', err)
      return
    }

    files.forEach((file) => {
      const properties = ['title', 'description', 'date', 'tags', 'published']
      const doesNotHave = []

      if (path.extname(file) === '.mdx') {
        fileCount++

        const fileName = path.basename(file, path.extname(file))
        const filePath = path.join(mdxDirectory, file)
        const mdxContent = fs.readFileSync(filePath, 'utf-8')
        const { data } = matter(mdxContent)

        for (const property of properties) {
          if (!data[property]) {
            doesNotHave.push(property)
          }
        }

        if (doesNotHave.length) {
          console.error(`Error: '${file}' does not have property '${doesNotHave}'`)
        } else {
          metaDataList.push({
            ...data,
            path: fileName,
          })
        }
      }
    })

    if (fileCount === metaDataList.length) {
      const jsonMetadata = JSON.stringify(metaDataList)
      fs.writeFile(metaFileDirectory, jsonMetadata, (err) => {
        if (err) {
          console.error('Error writing metadata file:', err)
          return
        }
        console.log('Metadata file created successfully!')
      })
    } else {
      console.error(`Fail to write ${fileName}`)
    }
  })
}
