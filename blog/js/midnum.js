let nums1 = [1,2,3,5, 9]
let nums2 = [2,4,6,8]

function mergeSort(arr1,arr2){
    let sortRes=merge(arr1,arr2)
    let len=sortRes.length
    let mid=len>>1
    let result
    if(len%2==0){
        result=(sortRes[mid]+sortRes[mid-1])/2
    }else{
        result=sortRes[mid]
    }
    return result
}
function merge(arr1,arr2){
    let result=[];
    let llen=arr1.length;
    let rlen=arr2.length;
    let i=j=0;
    while(i<llen && j<rlen){
        if(arr1[i]<arr2[j]){
            result.push(arr1[i++])
        }else{
            result.push(arr2[j++])
        }
    }
    while(i<llen){
        result.push(arr1[i++])
    }
    while(j<rlen){
        result.push(arr2[j++])
    }
    return result
}

let result = mergeSort(nums1,nums2)
console.log(result)