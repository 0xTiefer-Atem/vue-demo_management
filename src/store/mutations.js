
export default {
  //上面的state是自动往这里面的函数里传入的

  updateStaffId(state, payLoad){
    state.staff_id = payLoad;
    // console.log(state.staff_id);
  },
  logOutUser(state) {
    state.staff_id = ''
  },

  //额外参数叫做payload 载荷
  addCount(state, payLoad) {
    //普通风格操作
    // state.counter += payLoad;

    //特殊风格操作
    state.counter += payLoad.num;
  }
}
