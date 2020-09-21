class LazyManClass{
    constructor(name){
        console.log(`Hi I am ${name}`)
        this.taskList=[]
        setTimeout(() => {
            this.next()
        }, 0);
    }
    sleep(time){
        let that=this
        let fn=(function (time) {
             return function () {
                setTimeout(() => {
                    console.log(`等待了${time}秒...`) 
                    that.next()
                 }, time*1000); 
             }
        })(time)
        this.taskList.push(fn)
        return this
    }
    sleepFirst(time){
        let that=this
        let fn=(function (time) {
            return function () {
                setTimeout(() => {
                    console.log(`等待了${time}秒...`)
                    that.next()
                }, time*1000);
            }
        })(time)
        this.taskList.unshift(fn)
        return this
    }
    eat(sth){
        let that=this
        let fn=(function(sth) {
            return function () {
                console.log(`I am eating ${sth}`)
                that.next()
            }
        })(sth)
        this.taskList.push(fn)
        return this
    }
    drink(sth){
        let that=this;
        let fn=(function (water) {
            return function () {
                console.log(`喝了${water}...`)
                that.next()
            }
        })(sth)
        this.taskList.push(fn)
        return this
    }
    next(){
        let fn =this.taskList.shift()
        fn && fn()
    }
}

function LazyMan(name){
    return new LazyManClass(name)
}

LazyMan('Tom').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food').drink('10000ml牛奶')