const checkIfMobileScreen = (): boolean => {
  if (window.innerWidth <= 450) {
    return true;
  } else {
    return false;
  }
};

export { checkIfMobileScreen };
