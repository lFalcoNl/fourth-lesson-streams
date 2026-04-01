import express from 'express';
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url'
import zlib from 'zlib';
import { pipeline } from 'stream';

const PORT = process.env.PORT || 8000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static('public'));

app.post('/upload', (req, res) => {
    const uploadDir = path.join(__dirname, 'uploads')
    fs.mkdirSync(uploadDir, { recursive: true })

    const fileName = path.basename(req.headers['filename'] || 'sample-2mb.txt')
    const filePath = path.join(uploadDir, fileName)

    const writeStream = fs.createWriteStream(filePath)

    pipeline(
        req,
        writeStream,
        (err) => {
            if (err) {
                console.error('Upload failed:', err)
                if (!res.headersSent) {
                    return res.status(500).send('Upload failed')
                }
            } else {
                console.log('File was uploaded')
                return res.redirect('/')
            }
        }
    );
});

app.get('/download', (req, res) => {
    const fileName = path.basename(req.query.filename || 'sample-2mb.txt')

    if (!fileName) {
        return res.status(400).send('File name is required')
    }
    const filePath = path.join(__dirname, 'uploads', fileName);
    console.log(filePath)

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('There is no such file')
    }

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    res.setHeader('Content-Type', 'application/octet-stream')

    pipeline(
        fs.createReadStream(filePath),
        res,
        (err) => {
            if (err) {
                console.error(err)
                if (!res.headersSent) {
                    res.status(500).send('Download failed')
                } else {
                    res.destroy(err)
                }
            }
        }
    );
})

app.get('/download-compression', (req, res) => {
    const safeFileName = path.basename(req.query.filename || '')

    if (!safeFileName) {
        return res.status(400).send('File name is required')
    }
    const filePath = path.join(__dirname, 'uploads', safeFileName)
    if (!fs.existsSync(filePath)) {
        return res.status(404).send('There is no such file')
    }
    res.setHeader('Content-Disposition', `attachment; filename="${safeFileName}.gz"`)
    res.setHeader('Content-Type', 'application/gzip')
    // res.setHeader('Content-Encoding', 'gzip');

    pipeline(
        fs.createReadStream(filePath),
        zlib.createGzip(),
        res,
        (err) => {
            if (err) {
                console.error(err);
                if (!res.headersSent) {
                    res.status(500).send('Compression failed')
                } else {
                    res.destroy(err)
                }
            }
        }
    );
})


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
