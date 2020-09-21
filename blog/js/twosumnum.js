let nums=[2,7,11,15];
let target=9;

function getsumIndex(nums,target){
    let map=new Map()
    nums.forEach((value,i)=> {
        console.log(value,i)
        let index=target-value;
        let flag=map.has(index)
        if(flag){
            return [map.get(index),i]
        }
        map.set(value,i)
    });
}

console.log(getsumIndex(nums,target))