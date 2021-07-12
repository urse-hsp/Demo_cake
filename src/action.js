export const addGoods = (goods) => {
  return {
    type: "ADD_GOODS",
    goods: goods,
  };
};
export const changNum = (n, index, boole) => {
  return {
    type: "CHANGNUM",
    index: index,
    n: n,
    boole: boole,
  };
};
export const AFfirm = (boole, index) => {
  return {
    type: "AFFIRM",
    boole: boole,
    index: index,
  };
};

export const Calculate = (index) => {
  return {
    type: "CALCULATE",
    index: index,
  };
};

export const CheckAll = () => {
  return {
    type: "CHECKALL",
  };
};

export const logIn = (boole) => {
  return {
    type: "LOGIN",
    boole: boole,
  };
};

export const update = () => {
  return {
    type: "UPDATE",
  };
};
