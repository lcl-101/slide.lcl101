const a:string = "Hello typescript";
let arr: number[] = [1,2,3];
let x:[string, number];
x = ['string', 2];
enum Color {Red,Green}
let c:Color = Color.Green;
console.log(c);

class Site {
    name():void {
        console.log('test');
    }
}
const obj = new Site();
obj.name();

console.log("TypeScript Number 属性: ");
console.log("最大值为: " + Number.MAX_VALUE);
console.log("最小值为: " + Number.MIN_VALUE);
console.log("负无穷大: " + Number.NEGATIVE_INFINITY);
console.log("正无穷大:" + Number.POSITIVE_INFINITY);

interface Test {
    name: string
    fun: ()=>string
}
const test1:Test = {
    name: 'test',
    fun: () => {
        return 'fun'
    }
};

console.log(test1.name);
console.log(test1.fun());