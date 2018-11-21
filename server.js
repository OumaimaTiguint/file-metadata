'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});



app.post('/api/fileanalyse',upload.single('upfile'), (req, res) => {
  const upfile = req.file;
  
  if(typeof upfile === 'undefined') res.json({error: 'file failed to upload'});
  
  return res.json({
    name: upfile.originalname,
    type: upfile.mimetype,
    size: upfile.size
  });
  
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
