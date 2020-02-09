export default {
  //context 就相当于store 对象
  aUpdateSate(context, payload) {
    setTimeout(() => {
      context.commit('');
      console.log(payload);
    }, 1000)
  }
}
