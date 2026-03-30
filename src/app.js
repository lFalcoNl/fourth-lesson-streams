import express from 'express';

const PORT =  process.env.PORT || 8000;

const app = express();


app.use(express.static('public'));

app.post('/upload', (req, res) => {
    //...
    // const writeStream = fs.createWriteStream(filePath);

    // writeStream.on('finish', () => {
    //     res.redirect('/');
    // });
})

app.get('/download', (req, res) => {
    //...
    //     res.redirect('/');
})

app.get('/download-compression', (req, res) => {
    // use zlib 
    //     res.redirect('/');
})


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
