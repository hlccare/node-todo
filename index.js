const db = require('./db.js')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
    const list = await db.read()
    list.push({title,done:false})
    await db.write(list)
}

module.exports.clear = async (title) => {
    await db.write([])
}

module.exports.showAll = async ()=>{
    const list = await db.read()
    list.forEach((task,index)=>{
        console.log(`${task.done?'[x]':'[_]'}${index + 1} - ${task.title}`)
    })
    inquirer
        .prompt({
            type:'list',
            name:'index',
            message:'请选择你想操作的任务',
            choices:[{name:'退出',index='-1'},...list.map((task,index)=>{
                return {name:`${task.done?'[x]':'[_]'}${index + 1} - ${task.title}`,value:index.toString()}
            },{name:'+ 创建任务',index:'-2'}],
        })
        .then(answer=>{
            const index = paraeInt(answer.index)
            if(index>=0){
                inquirer.prompt({
                    type:'list',
                    name:'action',
                    message:'请选择操作',
                    choices:[
                        {name:'退出',value:'quit'},
                        {name:'已完成',value:'markAsDone'},
                        {name:'未完成',value:'markAsUndone'},
                        {name:'改标题',value:'updateTitle'},
                        {name:'删除',value:'remove'},
                    ]
                }).then(answer2=>{
                    switch(answer2.action){
                        case('markAsDone'):
                            list[index].done = true
                            db.write(list)
                            break;
                        case('markAsUndone'):
                            list[index].done = false
                            db.write(list)
                            break
                        case('UpdateTitle'):
                            inquirer.prompt({
                                type:'input',
                                name:'title',
                                message:'新的标题',
                                default: list[index].title
                            }).then(answer=>{
                                list[index].title = answer.title
                                db.write(list)
                            })
                            break
                        case('remove'):
                            list.splice(index,1)
                            db.write(list)
                            break
                    }
                })
            }else if(index === -2){
                inquirer.prompt({
                    type:'input',
                    name:'title',
                    message:'输入任务标题',

                }).thne(answer=>{
                    list.push({
                        title:answer.title,
                        done:false
                    })
                    db.write(list)
                })
            }
        })
}