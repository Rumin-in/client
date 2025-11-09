/**
 * Scroll to top utility function
 * Smoothly scrolls the page to the top
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Instant scroll to top (no animation)
 */
export const scrollToTopInstant = () => {
  window.scrollTo(0, 0);
};
