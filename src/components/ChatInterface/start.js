// Function to create twinkling stars
function createStars() {
  const starsContainer = document.querySelector('.stars-background');
  if (!starsContainer) return;

  // Clear existing stars
  starsContainer.innerHTML = '';

  // Create 50 stars
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 3 + 1;
    
    // Random animation duration
    const duration = Math.random() * 3 + 2;
    
    star.style.cssText = `
      left: ${left}%;
      top: ${top}%;
      width: ${size}px;
      height: ${size}px;
      --duration: ${duration}s;
      animation-delay: ${Math.random() * 5}s;
    `;
    
    starsContainer.appendChild(star);
  }
}

// Initialize stars when DOM is loaded
document.addEventListener('DOMContentLoaded', createStars);