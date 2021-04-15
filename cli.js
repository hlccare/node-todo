const { program } = require('commander');
const api = require('./index.js')

program
    .option('-x, --xxx', 'xxxxxxx')


program
    .command('add <names...>')
    .description('add a task')
    .action((names) => {
        console.log(names.join(' '));
        api.add(names)
    });

program
    .command('clear')
    .description('clear all tasks')
    .action((names) => {
        console.log('clear');
    });

program.parse(process.argv);


