# 排序算法总结

## 插入排序算法

```javascript
let testArray=[5,2,6,3,8,9,0,4,10,3,100,24,66,32,67,76,12,15];

function insetSort(arr){
    let length=arr.length;
    for(let i=1;i<length;i++){
        let j=i,temp=arr[i];
        while(j>0 && arr[j-1]>temp){
            arr[j]=arr[j-1];
            j--
        }
        arr[j]=temp
    }
    return arr
}

console.time('insert')
let result=insetSort(testArray)
console.timeEnd('insert')
console.log("插入排序",result)

```
## 归并排序算法

```javascript
function mergeSort(arr){
    let arrRes=mergeSortRec(arr)
    console.log('归并排序',arrRes)
}
function mergeSortRec(arr){
    let length=arr.length;
    if(length==1){
        return arr
    }
    let md=Math.floor(length/2)
    let left=arr.slice(0,md),right=arr.slice(md,length);
    return merge(mergeSortRec(left),mergeSortRec(right))
}
const merge=function(left,right){
    let result=[],ileft=0,iright=0;
    while(ileft<left.length && iright<right.length){
        if(left[ileft]<right[iright]){
            result.push(left[ileft++])
        }else{
            result.push(right[iright++])
        }
    }
    while(ileft<left.length){
        result.push(left[ileft++])
    }
    while(iright<right.length){
        result.push(right[iright++])
    }
    return result
}

console.time('merge')
mergeSort(testArray)
console.timeEnd('merge')
```
## 快速排序

```javascript
function quickSort(arr){
    quick(arr,0,arr.length-1)
    console.log('快速排序',arr)
    return arr
}

const quick=function(arr,left,right){
    var  index
    if(arr.length>1){
        index=position(arr,left,right)
        if(left<index-1){
            quick(arr,left,index-1)
        }
        if(right>index){
            quick(arr,index,right)
        }
    }
}

const position=function(arr,left,right){
    let pivot=arr[Math.floor((left+right)/2)],i=left,j=right;
    while(i<=j){
        while(arr[i]<pivot){
            i++
        }
        while(arr[j]>pivot){
            j--
        }
        if(i<=j){
            [arr[i],arr[j]]=[arr[j],arr[i]]
            i++
            j--
        }
    }
    return i
}

console.time('quick')
quickSort(testArray)
console.timeEnd('quick')
```

## 冒泡排序

```javascript
function bubbleSort(arr){
    let length=arr.length;
    for(let i=0;i<length;i++){
        for(let j=0;j<length-1-i;j++){
            if(arr[j]>arr[j+1]){
                [arr[j],arr[j+1]]=[arr[j+1],arr[j]]
            }
        }
    }
    return arr
}
```