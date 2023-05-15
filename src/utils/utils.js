export const isMobile = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /mobile|android|ios|iphone|ipad|ipod|windows phone|iemobile|blackberry|opera mini/i.test(
    userAgent
  );
};
