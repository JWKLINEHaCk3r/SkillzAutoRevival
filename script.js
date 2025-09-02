// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling with validation and feedback
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let valid = true;

    // Clear previous error messages
    document.getElementById('name-error').textContent = '';
    document.getElementById('email-error').textContent = '';
    document.getElementById('message-error').textContent = '';

    if (!name) {
        document.getElementById('name-error').textContent = 'Please enter your name.';
        valid = false;
    }

    if (!email) {
        document.getElementById('email-error').textContent = 'Please enter your email.';
        valid = false;
    } else {
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailPattern.test(email)) {
            document.getElementById('email-error').textContent = 'Please enter a valid email address.';
            valid = false;
        }
    }

    if (!message) {
        document.getElementById('message-error').textContent = 'Please enter your message.';
        valid = false;
    }

    if (!valid) {
        return;
    }

    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Add scroll animations for service cards and testimonials
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .testimonial').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

/* Fix floating logo click issue */
document.querySelector('.floating-logo').addEventListener('click', () => {
    window.location.href = '#hero';
});

/* Fix floating logo click issue */
document.querySelector('.floating-logo').addEventListener('click', () => {
    window.location.href = '#hero';
});

// Header background change on scroll with smooth transition
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        header.style.transition = 'background-color 0.3s ease';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.transition = 'background-color 0.3s ease';
    }
});

/* Chat widget toggle */
const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.getElementById('chat-box');
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

chatToggle.addEventListener('click', () => {
    const expanded = chatToggle.getAttribute('aria-expanded') === 'true';
    chatToggle.setAttribute('aria-expanded', !expanded);
    if (expanded) {
        chatBox.hidden = true;
    } else {
        chatBox.hidden = false;
        chatInput.focus();
    }
});

/* Simple mock AI chat logic for Lexus */
const lexusResponses = [
    "Hi! I'm Lexus, your virtual assistant. How can I help you today?",
    "That's great to hear! Can you tell me more about your car?",
    "We offer premium detailing services including exterior, interior, and paint correction.",
    "Would you like to schedule an appointment or get a quote?",
    "Thank you for chatting with me! I'll send your message to Jay, the owner."
];

let chatStep = 0;

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message', sender);
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendEmailSimulation(chatTranscript) {
    // Simulate sending email to skillzautorevival@icloud.com
    console.log("Sending chat transcript to skillzautorevival@icloud.com:");
    console.log(chatTranscript);
    alert("Your conversation has been sent to Skillz Auto Revival owner. Thank you!");
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = chatInput.value.trim();
    if (!userInput) return;

    addMessage(userInput, 'user');
    chatInput.value = '';

    setTimeout(() => {
        if (chatStep < lexusResponses.length) {
            addMessage(lexusResponses[chatStep], 'bot');
            chatStep++;
            if (chatStep === lexusResponses.length) {
                // After last message, simulate sending email
                let transcript = Array.from(chatMessages.children).map(div => div.textContent).join('\n');
                sendEmailSimulation(transcript);
                chatStep = 0; // reset chat
                chatMessages.innerHTML = ''; // clear chat
            }
        }
    }, 1000);
});
