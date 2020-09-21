class PromiseA{
    constructor(fn){
        this.state='pending';
        this.value=undefined;
        this.reason=undefined;
        let resolve=value=>{
            if(this.state=='pending'){
                this.state='fulfilled';
                this.value=value
            }
        }
        let reject=value=>{
            if(this.state=='pending'){
                this.state='rejected'
                this.reason=value
            }
        }
        try {
            fn(resolve,reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onResolve,onReject){
        switch (this.state) {
            case 'fulfilled':
                onResolve(this.value)
                break;
            case 'rejected':
                onReject(this.reason)
                break;
            default:
                break;
        }
    }
}

function add(){
    console.log(1+3)
    throw Error('类型错误')
    return 1+3
}

new PromiseA((resolve,reject)=>{
    let result=add()
    resolve(result)
}).then((res)=>{
    console.log('res---',res)
},err=>{
    console.log('err',err)
})