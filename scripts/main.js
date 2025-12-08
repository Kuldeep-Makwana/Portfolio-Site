/* ============================================
   ADVENTURE PORTFOLIO - MAIN JAVASCRIPT
   ============================================ */

// Global state object to track application state
const appState = {
    musicPlaying: false,
    selectedRole: null,
    currentPage: null,
};

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application when DOM is ready
 * Sets up all event listeners and initializes components
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Adventure Portfolio initialized');
    
    // Initialize audio
    initializeAudio();
    
    // Initialize music toggle button
    setupMusicToggle();
    
    // Initialize tab systems (Profile and Quests pages)
    setupProfileTabs();
    setupQuestTabs();
    
    // Initialize role selection
    setupRoleSelection();
    
    // Initialize achievement hover effects
    setupAchievementHover();

    // Initialize mini navigation
    setupMiniNav();
});

// ============================================
// AUDIO & MUSIC TOGGLE (index.html)
// ============================================

/**
 * Initialize the audio element and set up the background music
 * Creates audio element if it doesn't exist
 */
function initializeAudio() {
    const audioElement = document.getElementById('background-music');
    
    if (audioElement) {
        // Audio element exists, ensure it's set to loop
        audioElement.loop = true;
        console.log('Audio element initialized');
    }
}

/**
 * Set up the music toggle button functionality
 * Handles play/pause and icon state changes
 */
function setupMusicToggle() {
    const musicToggleBtn = document.getElementById('music-toggle');
    
    if (!musicToggleBtn) {
        console.log('Music toggle button not found on this page');
        return;
    }
    
    // Add click listener to music toggle button
    musicToggleBtn.addEventListener('click', toggleMusic);
}

/**
 * Toggle background music play/pause
 * Updates button icon and state
 */
function toggleMusic() {
    const audioElement = document.getElementById('background-music');
    const musicToggleBtn = document.getElementById('music-toggle');
    
    if (!audioElement) {
        console.error('Audio element not found');
        return;
    }
    
    // Toggle play/pause
    if (appState.musicPlaying) {
        audioElement.pause();
        appState.musicPlaying = false;
        musicToggleBtn.classList.remove('playing');
        musicToggleBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        audioElement.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
        appState.musicPlaying = true;
        musicToggleBtn.classList.add('playing');
        musicToggleBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
    
    console.log('Music toggled:', appState.musicPlaying ? 'Playing' : 'Paused');
}

// ============================================
// TAB SYSTEM - PROFILE PAGE (profile.html)
// ============================================

/**
 * Set up the tab system for the profile page
 * Handles tab switching and content panel visibility
 */
function setupProfileTabs() {
    const navTabs = document.querySelectorAll('.profile-nav .nav-tab');
    const contentPanels = document.querySelectorAll('.profile-content .content-panel');
    const extraBox = document.getElementById('extra-box');
    
    if (navTabs.length === 0) {
        console.log('Profile tabs not found on this page');
        return;
    }
    
    // Add click listener to each tab
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            handleTabClick(event, contentPanels, extraBox, 'profile');
        });
    });
    
    console.log('Profile tabs initialized');
}

/**
 * Set up the tab system for the quests page
 * Handles tab switching and content panel visibility
 */
function setupQuestTabs() {
    const navTabs = document.querySelectorAll('.quest-list-nav .nav-tab');
    const contentPanels = document.querySelectorAll('.quest-content .content-panel');
    
    if (navTabs.length === 0) {
        console.log('Quest tabs not found on this page');
        return;
    }
    
    // Add click listener to each tab
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            handleTabClick(event, contentPanels, null, 'quest');
        });
    });
    
    console.log('Quest tabs initialized');
}

/**
 * Handle tab click event
 * Switches active tab and displays corresponding content panel
 * 
 * @param {Event} event - The click event
 * @param {NodeList} contentPanels - All content panels
 * @param {Element} extraBox - Extra box element (profile only)
 * @param {string} pageType - Type of page ('profile' or 'quest')
 */
function handleTabClick(event, contentPanels, extraBox, pageType) {
    event.preventDefault();
    
    // Get the target panel ID from data-target attribute
    const targetId = event.currentTarget.getAttribute('data-target');
    
    // Get all tabs in the same navigation
    const allTabs = event.currentTarget.parentElement.querySelectorAll('.nav-tab');
    
    // Remove active class from all tabs
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to clicked tab
    event.currentTarget.classList.add('active');
    
    // Remove active class from all content panels
    contentPanels.forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Add active class to target content panel
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    
    // Special logic for profile page: show/hide extra box
    if (pageType === 'profile' && extraBox) {
        if (targetId === 'basic') {
            extraBox.style.display = 'flex';
        } else {
            extraBox.style.display = 'none';
        }
    }
    
    console.log('Tab switched to:', targetId);
}

// ============================================
// ROLE SELECTION (role.html)
// ============================================

/**
 * Set up the role selection functionality
 * Handles card selection and button state management
 */
function setupRoleSelection() {
    const roleCards = document.querySelectorAll('.role-card');
    const startBtn = document.getElementById('start-btn');
    
    if (roleCards.length === 0) {
        console.log('Role cards not found on this page');
        return;
    }
    
    // Add click listener to each role card
    roleCards.forEach(card => {
        card.addEventListener('click', function() {
            handleRoleSelect(this, roleCards, startBtn);
        });
    });
    
    // Add click listener to start button
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            if (appState.selectedRole) {
                const rolePages = {
                    'fighter': 'fighter.html',
                    'mage': 'maintenence.html',
                    'archer': 'archer.html'
                };
                const page = rolePages[appState.selectedRole] || 'profile.html';
                window.location.href = page;
            }
        });
    }
    
    console.log('Role selection initialized');
}

/**
 * Handle role card selection
 * Updates selected state and enables start button
 * 
 * @param {Element} selectedCard - The clicked role card
 * @param {NodeList} allCards - All role cards
 * @param {Element} startBtn - The start button
 */
function handleRoleSelect(selectedCard, allCards, startBtn) {
    // Remove selected class from all cards
    allCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked card
    selectedCard.classList.add('selected');
    
    // Store selected role
    appState.selectedRole = selectedCard.getAttribute('data-role');
    
    // Enable start button
    if (startBtn) {
        startBtn.disabled = false;
    }
    
    console.log('Role selected:', appState.selectedRole);
}

// ============================================
// ACHIEVEMENT HOVER EFFECTS (achievements.html)
// ============================================

/**
 * Set up achievement badge hover effects
 * Displays achievement details on hover
 */
function setupAchievementHover() {
    const achievementBadges = document.querySelectorAll('.achieve-badge');
    
    if (achievementBadges.length === 0) {
        console.log('Achievement badges not found on this page');
        return;
    }
    
    // Add mouseover listener to each badge
    achievementBadges.forEach(badge => {
        badge.addEventListener('mouseover', function() {
            handleAchievementHover(this);
        });
    });
    
    console.log('Achievement hover effects initialized');
}

/**
 * Handle achievement badge hover
 * Updates the achievement details panel with hovered badge data
 * 
 * @param {Element} badge - The hovered achievement badge
 */
function handleAchievementHover(badge) {
    // Get data attributes from badge
    const title = badge.getAttribute('data-title');
    const description = badge.getAttribute('data-desc');
    
    // Update achievement details
    const titleElement = document.getElementById('achieve-title');
    const descElement = document.getElementById('achieve-desc');
    
    if (titleElement) {
        titleElement.textContent = title;
    }
    
    if (descElement) {
        descElement.textContent = description;
    }
    
    console.log('Achievement hovered:', title);
}

// ============================================
// CHART.JS INITIALIZATION (profile.html)
// ============================================

/**
 * Initialize Chart.js chart on profile page
 * Creates a skills proficiency chart
 */
function initializeChart() {
    const chartCanvas = document.getElementById('myChart');
    
    if (!chartCanvas) {
        console.log('Chart canvas not found on this page');
        return;
    }
    
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.error('Chart.js library not loaded');
        return;
    }
    
    // Create chart context
    const ctx = chartCanvas.getContext('2d');
    
    // Create chart
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HTML', 'CSS', 'BOOTSTRAP', 'JavaScript', 'UI/UX', 'Php', 'Laravel', 'MySQL' ],
            datasets: [{
                label: 'Skill Proficiency',
                data: [98, 85, 76, 40, 90, 80, 70, 85],
                borderColor: '#FFD700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: '#000000ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#FFFFFF',
                        font: {
                            family: "'DM Sans', sans-serif",
                            size: 12
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: '#000000ff',
                        font: {
                            family: "'DM Sans', sans-serif"
                        }
                    },
                    grid: {
                        color: 'rgba(255, 217, 0, 0.22)'
                    },
                    pointLabels: {
                        color: '#FFFFFF',
                        font: {
                            family: "'DM Sans', sans-serif",
                            size: 12
                        }
                    }
                }
            }
        }
    });
    
    console.log('Chart initialized');
}

// Initialize chart when profile page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeChart);
} else {
    initializeChart();
}

// ============================================
// MINI NAVIGATION (Back/Home)
// ============================================
// function setupMiniNav() {
//     const backBtn = document.getElementById('nav-back');
//     if (backBtn) {
//         backBtn.addEventListener('click', () => {
//             if (window.history.length > 1) {
//                 window.history.back();
//             } else {
//                 window.location.href = 'index.html';
//             }
//         });
//     }
// }

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Log current application state
 * Useful for debugging
 */
function logAppState() {
    console.log('Current App State:', appState);
}

/**
 * Reset application state
 * Clears all selections and state
 */
function resetAppState() {
    appState.musicPlaying = false;
    appState.selectedRole = null;
    console.log('App state reset');
}

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Global error handler
 * Logs errors to console for debugging
 */
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

console.log('Main.js loaded successfully');
