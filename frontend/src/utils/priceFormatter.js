const formatPrice = (number) => {
  return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default formatPrice;
