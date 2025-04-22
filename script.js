const navLinks = document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
document.body.classList.toggle("show-mobile-menu");
} );

menuCloseButton.addEventListener("click", () => menuOpenButton.click ());
navLinks.forEach(link => {
  link.addEventListener("click", () => menuOpenButton.click());
}

);

//Initialize Swiper
const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 25,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },


    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }

    }
  });
  // Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Menu functionality
  const menuOpenButton = document.getElementById('menu-open-button');
  const menuCloseButton = document.getElementById('menu-close-button');
  const navMenu = document.querySelector('.nav-menu');

  if (menuOpenButton) {
      menuOpenButton.addEventListener('click', function() {
          navMenu.classList.add('active');
      });
  }

  if (menuCloseButton) {
      menuCloseButton.addEventListener('click', function() {
          navMenu.classList.remove('active');
      });
  }

  // Initialize Swiper for testimonials if available
  if (typeof Swiper !== 'undefined') {
      const swiper = new Swiper('.swiper', {
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {
              el: '.swiper-pagination',
              clickable: true,
          },
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
          breakpoints: {
              320: {
                  slidesPerView: 1,
                  spaceBetween: 20
              },
              768: {
                  slidesPerView: 2,
                  spaceBetween: 30
              },
              1024: {
                  slidesPerView: 3,
                  spaceBetween: 30
              }
          }
      });
  }

  // Registration System
  // Initialize local storage for users if it doesn't exist
  if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
  }

  // Convert the existing login form to a registration form
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
      // Modify form attributes
      contactForm.id = 'registration-form';
      
      // Get existing form fields
      const formInputs = contactForm.querySelectorAll('.form-input');
      
      // First input should be for name
      if (formInputs[0]) {
          formInputs[0].name = 'name';
          formInputs[0].placeholder = 'Your name';
          formInputs[0].type = 'text';
      }
      
      // Second input should be for email
      if (formInputs[1]) {
          formInputs[1].name = 'email';
          formInputs[1].type = 'email';
          formInputs[1].placeholder = 'Your email';
      }
      
      // Change textarea to password field
      if (formInputs[2]) {
          const passwordField = document.createElement('input');
          passwordField.type = 'password';
          passwordField.placeholder = 'Your password';
          passwordField.className = 'form-input';
          passwordField.name = 'password';
          passwordField.required = true;
          
          formInputs[2].parentNode.replaceChild(passwordField, formInputs[2]);
      }
      
      // Change button text
      const submitButton = contactForm.querySelector('.submit-button');
      if (submitButton) {
          submitButton.textContent = 'Register';
      }
      
      // Add event listener for form submission
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();
          
          const name = contactForm.querySelector('[name="name"]').value.trim();
          const email = contactForm.querySelector('[name="email"]').value.trim();
          const password = contactForm.querySelector('[name="password"]').value;
          
          // Basic validation
          if (!name) {
              alert('Please enter your name');
              return;
          }
          
          if (!email) {
              alert('Please enter your email');
              return;
          }
          
          if (!isValidEmail(email)) {
              alert('Please enter a valid email address');
              return;
          }
          if (!password || password.length < 6) {
            alert('Please enter a password with at least 6 characters');
            return;
        }
        
        // Check if email already exists
        const users = JSON.parse(localStorage.getItem('users'));
        const existingUser = users.find(user => user.email === email);
        
        if (existingUser) {
            if (existingUser.isConfirmed) {
                alert('This email is already registered. Please login.');
            } else {
                alert('This email is already registered but not confirmed. Please check your email for confirmation link.');
            }
            return;
        }
        
        // Generate confirmation token
        const token = generateToken(32);
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            password: password, // In a real app, you would hash this password
            confirmationToken: token,
            isConfirmed: false,
            registeredAt: new Date().toISOString()
        };
        
        // Store user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Send "email" (simulation)
        sendConfirmationEmail(newUser);
        
        // Show confirmation message
        contactForm.innerHTML = `
            <div class="confirmation-message">
                <h3>Registration Successful!</h3>
                <p>A confirmation email has been sent to <strong>${email}</strong>.</p>
                <p>Please check your email and click the confirmation link to activate your account.</p>
                <p><strong>Note:</strong> Since this is a simulation, please click the link below to see the confirmation page:</p>
                <p><a href="confirm.html?token=${token}" class="confirm-link">Confirm Your Email</a></p>
            </div>
        `;
    });
}

// Check if we're on confirmation page
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

if (token && window.location.pathname.includes('confirm.html')) {
    confirmEmail(token);
}
});

// Helper functions
function isValidEmail(email) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
}

function generateToken(length) {
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let token = '';
for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
}
return token;
}

function sendConfirmationEmail(user) {
// In a real app, this would send an actual email
// Here we're just simulating the process
console.log(`Email sent to ${user.email} with token ${user.confirmationToken}`);

// Store the "sent email" in local storage for demo purposes
const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
sentEmails.push({
    to: user.email,
    subject: 'Confirm Your Registration',
    token: user.confirmationToken,
    sentAt: new Date().toISOString()
});
localStorage.setItem('sentEmails', JSON.stringify(sentEmails));
}

function confirmEmail(token) {
const confirmationMessageDiv = document.getElementById('confirmation-message');
if (!confirmationMessageDiv) return;

const users = JSON.parse(localStorage.getItem('users') || '[]');
const userIndex = users.findIndex(user => user.confirmationToken === token);

if (userIndex === -1) {
    confirmationMessageDiv.innerHTML = `
        <div class="error-icon">
            <i class="fas fa-exclamation-circle"></i>
        </div>
        <h2 class="confirmation-title">Invalid Token</h2>
        <p class="confirmation-text">The confirmation link is invalid or has expired.</p>
            <a href="index.html" class="back-button">Back to Home</a>
        `;
        return;
    }
    
    const user = users[userIndex];
    
    if (user.isConfirmed) {
        confirmationMessageDiv.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2 class="confirmation-title">Already Confirmed</h2>
            <p class="confirmation-text">Your email has already been confirmed. You can now log in.</p>
            <a href="index.html#contact" class="back-button">Go to Login</a>
        `;
        return;
    }
    
    // Confirm user
    user.isConfirmed = true;
    user.confirmedAt = new Date().toISOString();
    user.confirmationToken = null;
    
    users[userIndex] = user;
    localStorage.setItem('users', JSON.stringify(users));
    
    confirmationMessageDiv.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h2 class="confirmation-title">Email Confirmed!</h2>
        <p class="confirmation-text">Thank you, ${user.name}! Your email has been confirmed successfully.</p>
        <p class="confirmation-text">You can now log in with your email and password.</p>
        <a href="index.html#contact" class="back-button">Go to Login</a>
    `;
}

  