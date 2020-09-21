const data = [{
    id: '1',
    name: 'test1',
    children: [
        {
            id: '11',
            name: 'test11',
            children: [
                {
                    id: '111',
                    name: 'test111'
                },
                {
                    id: '112',
                    name: 'test112'
                }
            ]

        },
        {
            id: '12',
            name: 'test12',
            children: [
                {
                    id: '121',
                    name: 'test121'
                },
                {
                    id: '122',
                    name: 'test122'
                }
            ]
        }
    ]
}];

function dfs(data,res=[]){
    let {id,children}=data
    res.push(id)
    if(children){
        for (const item of children) {
            dfs(item,children)
        }
    }
    console.log('res----',res)
    return res
}
dfs(data)