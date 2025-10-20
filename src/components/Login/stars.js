// Generate twinkling stars
function createStars() {
  const starsContainer = document.getElementById('stars-container');
  const starCount = 50; // Number of stars
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    const starSize = Math.random();
    
    // Assign star size class
    if (starSize < 0.6) {
      star.classList.add('star', 'small');
    } else if (starSize < 0.9) {
      star.classList.add('star', 'medium');
    } else {
      star.classList.add('star', 'large');
    }
    
    // Make some stars golden
    if (Math.random() < 0.3) {
      star.classList.add('golden');
    }
    
    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // Random animation delay
    star.style.animationDelay = `${Math.random() * 5}s`;
    
    starsContainer.appendChild(star);
  }
  
  // Add some shooting stars
  createShootingStars();
}

function createShootingStars() {
  const starsContainer = document.getElementById('stars-container');
  
  for (let i = 0; i < 3; i++) {
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    
    // Random position and animation
    shootingStar.style.left = `${Math.random() * 20}%`;
    shootingStar.style.top = `${Math.random() * 20}%`;
    shootingStar.style.animationDelay = `${Math.random() * 10}s`;
    shootingStar.style.animationDuration = `${3 + Math.random() * 4}s`;
    
    starsContainer.appendChild(shootingStar);
  }
}

// Initialize stars when page loads
document.addEventListener('DOMContentLoaded', createStars);