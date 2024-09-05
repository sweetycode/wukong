const fs = require('fs')

const outputDir = `./rx/output`
const viewsDir = `./rx/blade`

function copyViews(from, to) {
    fs.mkdirSync(to, {recursive: true})
    const filenames = fs.readdirSync(from)
    for (let filename of filenames) {
        if (filename == '_static') {
            continue
        }
        const filePath = `${from}/${filename}`
        if (fs.statSync(filePath).isDirectory()) {
            copyViews(filePath, `${to}/${filename}`)
        } else if (filename.endsWith('.html')) {
            const destFilePath = `${to}/${filename.replace('.html', '.blade.php')}`
            fs.copyFileSync(filePath, destFilePath)
            console.log(`copy: ${filePath} -> ${destFilePath}`)
        }
    }
}

copyViews(outputDir, viewsDir)
