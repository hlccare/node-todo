const homedir = require('os').homedir()
const home = process.env.HOME || homedir //环境变量
const p = require('path')
const dbPath = p.join(home, '.todo')
const fs = require('fs')
const { title } = require('process')

module.exports.add = (title) => {
    fs.readFile(dbPath, { flag: 'a+' }, (error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            let list
            try {
                list = JSON.parse(data.toString())
            } catch (error2) {
                list = []
            }
            const task = {
                title: title,
                done: false
            }
            list.push(task)
            const string = JSON.stringify(list)
            fs.writeFile(dbPath, string + '\n', (error3) => {
                if (error3) {
                    console.log(error3)
                }
            })
        }
    })
}