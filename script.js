const someFunc = () => {
  console.log("Hello");
};
const someFunc1 = (callback) => {
  callback();
};
someFunc1(someFunc);
