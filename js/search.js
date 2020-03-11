// 搜索算法

const Sort=require('./sort')
class Search {
    constructor(arr){
        this.array=arr
    }
    //顺序搜索
    sequentialSearch(item){
        let length=this.array.length
        for(let i=0;i<length;i++){
            if(item==this.array[i]){
                return i
            }
        }
        return -1
    }
    //二分法排序
    binarySearch(item){
        let array=Sort.quickSort(this.array);
        let low=0,high=array.length-1,mid,element;
        while(low<=high){
            mid=Math.floor((low+high)/2)
            element=array[mid]
            if(element<item){
                low=mid+1
            }else if(element>item){
                high=mid-1
            }else{
                return mid
            }
        }
        return -1
    }

}
let arr=[5,4,3,2,1]
let sequeSearch=new Search(arr).sequentialSearch(0)
let binarySearch=new Search(arr).binarySearch(2)

console.log('sequeSearch',sequeSearch)
console.log('binarySearch',binarySearch)