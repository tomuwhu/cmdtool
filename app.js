#!/usr/bin/env node
var fs = require('fs')
var program = require('commander')
var co = require('co')
var prompt = require('co-prompt')
program
  .arguments('<file>')
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', 'The user\'s password')
  .action( file => {
    co( function *() {
        if (!program.username) program.username = yield prompt('username: ')
        if (!program.password) program.password = yield prompt.password('password: ')
        if (!file) file = yield prompt.password('file: ')
        if (file && program.username=='un' && program.password=='pw') {
            console.log('file: '+file)
            s=''
            fs.readFile(file, 'UTF-8', (err, data) => {
                s=data.split('\n')[0]
                console.log( s )
                fs.writeFile('export.txt', s, err => {})
            })
        } else console.log('wrong username or password')
     })
  })
  .parse(process.argv)
