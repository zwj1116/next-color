# code review

- 软件研发中心前端开发规范

## ✨ 对象合并（张深深）
### Object.assign(target,...sources)
* target：目标对象，sources：源对象。用于将所有非继承属性、可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
* 属性被后续参数中具有相同属性的其他对象覆盖；
* 目标对象的属性与源对象的属性相同，源的会覆盖目标的属性。
```
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);

console.log(target); // Object { a: 1, b: 4, c: 5 };
console.log(returnedTarget); // Object { a: 1, b: 4, c: 5 };
```
### ...
* 三点是es6中出现的扩展运算符。作用是遍历当前使用的对象能够访问到的所有属性，并将属性放入当前对象中
```
var a = {"a":"a",b:"b"};
var b = {...a} //{"a":"a","b":"b"};
var c = {...a,"b":"b1"} //{"a":"a","b":"b1"};
var d = {...a,...{"a":"a1","b":"b1"}} //{"a":"a1","b":"b1"};
```
* 解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。
```
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2;
x.a.b // 2
```

## ✨ 减少if嵌套（张深深）
```
if (a === 0) {
step();
}
-------------------------------------------------
if (a !== 0) return;
step();
```

## ✨ 可选链操作符（ ?. ）（张深深）
* 可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。
* ?. 操作符的功能类似于 . 链式操作符，不同之处在于，在引用为空( null ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined。
* 与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。
```
const person = {
    details: {
        name: {
            newName: "aa",
        }
    },
}
const personNewName = person.details.name.newName;
```
* 上面代码person.details.name任何一层数据有问题或者不存在，js会报错。改进:
```
const personNewName = person && person.details && person.details.name person.details.name.newName || '';
```
* 代码变得非常不优雅，会有多个&&代码量也很大。可选链可以解决：
```
const personFirstName = person?.details?.name?.firstName;
```
* 从 JS 层面，它表示如果 person 的值为 null 或者 undefined，就不会报错而返回 undefined，否则才继续访问后面的 details 属性。

## ✨ 空值合并运算符(??)（张深深）
* 当一个表达式是 null 或者 undefined 时为变量设置一个默认值。
```
let firstName = null;
let username = firstName ?? "Guest"; // Guest。
```

## ✨ 空值赋值运算符(??=)（张深深）
* 当 ??= 左侧的值为 null、undefined 的时候，才会将右侧变量的值赋值给左侧变量。
```
let firstName = null;
firstName ??= "Guest"; // Guest
```
## ✨ let 与const 使用场景（王可）
>普通变量都必须使用 let 才可以修改值，由于 ref 对象是个引用类型，所以可以在 const 定义的时候，直接通过 .value 来修改。

## ✨ ref 与 reactive 使用场景（王可）
 * ref
```
 const count = ref(0); //基本数据类型
 const data = ref<string[]>([]); //引用对象
```
>不管传递原始值还是引用值类型给ref，返回的响应式数据对象本质都是由RefImpl类构造出来的对象。但不同的是里头的value，一个是原始值，一个是Proxy对象

* reactive

   相对于 ref，它的局限性在于只适合对象、数组。

```
let uids: number[] = reactive([ 1, 2, 3 ]);
// 丢失响应性的步骤

uids = [];

// 异步获取数据后，模板依然是空数组
setTimeout( () => {
  uids.push(1);
}, 1000);

使用以下代替

// 不会破坏响应性
uids.length = 0;
```

>如果你使用 reactive 定义数组，只能使用那些不会改变引用地址的操作,数据解构也会使其丢失响应性.
>最好只在功能单一、代码量少的组件里使用，比如一个表单组件，通常表单的数据都放在一个对象里。(reactive) 数据的更新，都是修改这个对象对应的值，按照对象的写法去维护你的数据。
## ✨ 数组操作特殊场景可以用ES6 MAP代替（崔晋）
```
var  map = new Map();
map.set("foo", true);
map.set("bar", false)
map.size // 2
```
* MAP基本用法
```
const map = new Map();
map.set('edition', 6)        // 键是字符串
map.set(262, 'standard')     // 键是数值
map.set(undefined, 'nah')    // 键是 undefined
map.get('edition')    // 6
map.has('edition')     // true
map.delete('edition')
```
* MAP的遍历
```
const map = new Map();
map.forEach((value, key) => {
    console.log(value,key)
});
```
## ✨ 数组的部分基础操作（胡家豪）
* Array.concat(),创建并返回一个新数组
```
var a = [1,2,3];       
var b = a.concat(4,5);               
console.log(a); //返回的还是[1,2,3]
console.log(b); //返回[1,2,3,4,5] 
```
* Array.slice()方法，返回指定数组的片段或者子数组
```
var a = [1,2,3,4,5];
a.slice(0,3); //返回[1,2,3] 第一个参数是截取开始的位置（包括），第二个参数是截取结束的位置（不包括）           
a.slice(3); //返回[4,5]             
a.slice(1,-1); //返回[2,3,4] 负数表示倒数 
```
* Array.splice()方法，用来删除或插入元素
```
var a = [1,2,3,4,5,6,7,8];             
var b = a.splice(1,2); //第一个参数是截取的起始位置（包括），第二个参数是截取的个数，之后的参数就是添加在元数组的新值                 
console.log(b); //返回[2, 3]
```
* push()方法与pop()方法
```
push()方法在数组的尾部添加一个或者多个元素，并返回数组的新长度
pop()方法删除数组的最后一个元素，并返回它的删除值
```
* unshift()方法与shift()方法
```
unshift()方法在数组头部添加一个或者多个元素，并返回数组的新长度
shift()方法删除数组的第一个元素，并返回它的删除值
```
* fill()方法
```
a = Array(5).fill(0)
console.log(b); //返回[0, 0, 0, 0, 0]
```