// export default {
//   //相当于计算属性，对state里的变量进行某些操作后再返回
//   //state默认传入
//   powerCounter(state){
//     return state.counter * state.counter
//   },
//   more20stu(state) {
//     return state.students.filter(s => s.age > 20)
//   },
//
//   //里面还可以传入getters
//   more20stuLength(state, getters) {
//     return getters.more20stu.length
//   },
//
//   //在函数里面传入自己需要的参数
//   moreAgeStu(state) {
//     // return function (age) {
//     //   return state.students.filter( s => s.age > age)
//     // }
//
//     //或者简化写成箭头函数
//     return age => state.students.filter( s => s.age > age)
//   }
//
// }
