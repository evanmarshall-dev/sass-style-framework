const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const backToTopButton = document.getElementById('theBay-btt');

  // Function to toggle the visibility of the button based on scroll position
  const toggleBackToTopButton = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      backToTopButton.classList.add('show'); // Add the 'show' class
    } else {
      backToTopButton.classList.remove('show'); // Remove the 'show' class
    }
  };

  // Toggle the visibility when the page is loaded
  toggleBackToTopButton();

  // Toggle the visibility when the user scrolls
  window.addEventListener('scroll', toggleBackToTopButton);

  backToTopButton.addEventListener('click', () => {
    scrollToTop();
  });
});
