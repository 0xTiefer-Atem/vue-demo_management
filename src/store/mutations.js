import {INCREMENT} from "./mutations-types";

export default {
  //上面的state是自动往这里面的函数里传入的
  add(state) {
    state.counter++
  },
  sub(state) {
    state.counter--
  },

  //额外参数叫做payload 载荷
  addCount(state, payLoad) {
    //普通风格操作
    // state.counter += payLoad;

    //特殊风格操作
    state.counter += payLoad.num;
  },
  addStudent(state, stu) {
    state.students.push(stu)

    //当动态的往state里面添加数据时，
    // 利用 Vue.set(); 可以实现响应式添加数据
    // Vue.delete(); 可以实现动态删除数据
  },
  [INCREMENT]() {
  }
}
