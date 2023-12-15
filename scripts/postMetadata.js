const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

let fileCount = 0
const metaDataList = []
const mdxDirectory = 'src/data/posts'
const metaFile = 'posts.json'
const metaFilePath = `src/data/${metaFile}`
const countFilePath = `src/data/count.json`

const postCount = {}

// Execution
generatePostMetaData()

function generatePostMetaData() {
  fs.readdir(mdxDirectory, (err, files) => {
    if (err) {
      console.error('Error reading directory: ', err)
      return
    }

    files.forEach((file) => {
      const properties = ['title', 'description', 'category', 'date', 'tags', 'published']
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
          const category = data.category
          if (!postCount[category]) postCount[category] = 0
          postCount[category]++

          metaDataList.push({
            ...data,
            path: fileName,
          })
        }
      }
    })

    if (fileCount === metaDataList.length) {
      const jsonMetadata = JSON.stringify(metaDataList)
      fs.writeFile(metaFilePath, jsonMetadata, (err) => {
        if (err) {
          console.error('Error writing metadata file:', err)
          return
        }
        console.log('Post Metadata file created successfully!')
      })

      const jsonPostCount = JSON.stringify(postCount)
      fs.writeFile(countFilePath, jsonPostCount, (err) => {
        if (err) {
          console.error('Error writing count metadata file:', err)
          return
        }
        console.log('Count Metadata file created successfully!')
      })
    } else {
      console.error(`Fail to write ${fileName}`)
    }
  })
}
