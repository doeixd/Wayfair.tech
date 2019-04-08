const express = require("express")
const app = express()
const port = 80
const fs = require("fs")
const dayjs = require('dayjs')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('dist'))

let transporter = nodemailer.createTransport({
  host: "smtp.fastmail.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: "patrick@wayfair.tech",
    pass: "m7gzxgf8qb3wm7dm"
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
})

let mailOptions = (text) => {
  return {
    from: 'patrick@wayfair.tech',
    to: 'doeixd@gmail.com',
    subject: 'From The Site',
    text: text
  }
}

let send = (opts) => {
  transporter.sendMail(opts, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent!');
    }
  });
}

app.post('/contact', (req, res) => {
  let { email, message } = req.body
  let full =
`${dayjs().format("h:mmA MM/DD/YYYY ") }

Email: ${email}
Text: ${message}
____________________________________

`
  let options = mailOptions(full)
  send(options)

  fs.appendFileSync("message.txt", full)
  res.json({code: '200'})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
