/** From: https://github.com/richardgirges/express-fileupload/tree/master/example
 * 
 * Simple file upload.
 * Helper script to test puppeteer file upload function.
 */
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const path = require('path');

const PORT = 5000
//app.use('/', express.static(__dirname + '/index.html'));
// default options
app.use(fileUpload());
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/ping', function(req, res) {
  res.send('pong');
});


app.post('/upload', function(req, res) {
  let Files;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send('No files were uploaded.');
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  Files = req.files.Files;

  uploadPath = 'uploads/' + Files.name;

  Files.mv(uploadPath, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
/*
    res.send(`<html><body>
      <h1>Upload page</h1>
      <div class="upload-result">
          File uploaded to ${uploadPath}
      </div>
    </body></html>`);
    
*/
    
    res.json({ fileName: Files.name, filePath: uploadPath });
  });
});
    

app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});
