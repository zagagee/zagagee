// ========== PROFILE IMAGE UPLOAD ==========
const profileInput = document.getElementById('profileInput');
const profileImage = document.getElementById('profileImage');

// Load profile image from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        profileImage.src = savedImage;
    }
    loadProjects();
    loadProfileData();
});

// Handle profile image upload
profileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file!');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB!');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageData = event.target.result;
            localStorage.setItem('profileImage', imageData);
            profileImage.src = imageData;
            alert('Profile picture updated successfully!');
        };
        reader.readAsDataURL(file);
    }
});

// Click on image to upload
profileImage.addEventListener('click', () => {
    profileInput.click();
});

// ========== PROJECTS MANAGEMENT ==========
let projects = [];

function loadProjects() {
    const saved = localStorage.getItem('projects');
    projects = saved ? JSON.parse(saved) : [];
    displayProjects();
}

function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function displayProjects() {
    const grid = document.getElementById('portfolioGrid');
    
    if (projects.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h3>📁 No Projects Yet</h3>
                <p>Click "+ Add Project" to showcase your work</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = projects.map((project, index) => `
        <div class="portfolio-card">
            <img src="${project.image}" alt="${project.title}" class="portfolio-image">
            <div class="portfolio-content">
                <span class="portfolio-category">${project.category}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${project.tech ? `
                    <div class="portfolio-tech">
                        ${project.tech.split(',').map(t => `<span class="tech-tag">${t.trim()}</span>`).join('')}
                    </div>
                ` : ''}
                ${project.link ? `<a href="${project.link}" target="_blank" class="portfolio-link">View Project →</a>` : ''}
                <div class="portfolio-actions">
                    <button class="btn-edit" onclick="editProject(${index})">Edit</button>
                    <button class="btn-delete" onclick="deleteProject(${index})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function openProjectModal() {
    document.getElementById('projectModal').style.display = 'block';
    document.getElementById('projectForm').reset();
    document.getElementById('imagePreview').innerHTML = '';
}

function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
}

function editProject(index) {
    const project = projects[index];
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectCategory').value = project.category;
    document.getElementById('projectTech').value = project.tech;
    document.getElementById('projectLink').value = project.link;
    document.getElementById('imagePreview').innerHTML = `<img src="${project.image}" alt="Project">`;

    const form = document.getElementById('projectForm');
    form.onsubmit = (e) => {
        e.preventDefault();
        const imagePreview = document.getElementById('imagePreview').querySelector('img');
        if (!imagePreview) {
            alert('Please select an image!');
            return;
        }
        projects[index] = {
            title: document.getElementById('projectTitle').value,
            description: document.getElementById('projectDescription').value,
            category: document.getElementById('projectCategory').value,
            image: imagePreview.src,
            tech: document.getElementById('projectTech').value,
            link: document.getElementById('projectLink').value
        };
        saveProjects();
        displayProjects();
        closeProjectModal();
        alert('Project updated successfully!');
    };
    openProjectModal();
}

function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects.splice(index, 1);
        saveProjects();
        displayProjects();
    }
}

// Handle project image preview
document.getElementById('projectImage')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            document.getElementById('imagePreview').innerHTML = `<img src="${event.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
});

// Submit project form
document.getElementById('projectForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const imagePreview = document.getElementById('imagePreview').querySelector('img');
    if (!imagePreview) {
        alert('Please select a project image!');
        return;
    }

    const newProject = {
        title: document.getElementById('projectTitle').value,
        description: document.getElementById('projectDescription').value,
        category: document.getElementById('projectCategory').value,
        image: imagePreview.src,
        tech: document.getElementById('projectTech').value,
        link: document.getElementById('projectLink').value
    };

    projects.push(newProject);
    saveProjects();
    displayProjects();
    closeProjectModal();
    alert('Project added successfully!');
    document.getElementById('projectForm').reset();
    document.getElementById('imagePreview').innerHTML = '';
});

// ========== PROFILE DATA MANAGEMENT ==========
let profileData = {
    name: 'Welcome to My Portfolio',
    title: 'Creative Developer & Designer',
    description: 'I create beautiful and functional digital experiences',
    about: 'I\'m a passionate developer with expertise in creating beautiful, functional, and user-friendly websites and applications.',
    email: 'basilnzoputagamil.com',
    phone: '+1 (234) 567-890',
    whatsapp: '+1 (234) 567-890',
    location: 'Your City, Your Country',
    experience: '10+',
    projects: '50+',
    clients: '30+'
};

function loadProfileData() {
    const saved = localStorage.getItem('profileData');
    if (saved) {
        profileData = JSON.parse(saved);
    }
    updateProfileDisplay();
}

function updateProfileDisplay() {
    document.getElementById('heroName').textContent = profileData.name;
    document.getElementById('heroTitle').textContent = profileData.title;
    document.getElementById('heroDescription').textContent = profileData.description;
    
    document.getElementById('aboutTitle').textContent = 'About Me';
    document.getElementById('aboutDescription').textContent = profileData.about;
    
    document.getElementById('stat1-number').textContent = profileData.experience;
    document.getElementById('stat1-label').textContent = 'Years Experience';
    document.getElementById('stat2-number').textContent = profileData.projects;
    document.getElementById('stat2-label').textContent = 'Projects Completed';
    document.getElementById('stat3-number').textContent = profileData.clients;
    document.getElementById('stat3-label').textContent = 'Happy Clients';
    
    document.getElementById('contactEmail').textContent = profileData.email;
    document.getElementById('contactPhone').textContent = profileData.phone;
    document.getElementById('contactWhatsapp').textContent = profileData.whatsapp;
    document.getElementById('contactLocation').textContent = profileData.location;

    // Update email link
    const emailLinks = document.querySelectorAll('a[href*="mailto"]');
    emailLinks.forEach(link => {
        link.href = `mailto:${profileData.email}`;
    });

    // Update phone link
    const phoneLinks = document.querySelectorAll('a[href*="tel"]');
    phoneLinks.forEach(link => {
        link.href = `tel:${profileData.phone}`;
    });
}

function openSettingsModal() {
    // Load current data into form
    document.getElementById('settingName').value = profileData.name;
    document.getElementById('settingTitle').value = profileData.title;
    document.getElementById('settingDescription').value = profileData.description;
    document.getElementById('settingEmail').value = profileData.email;
    document.getElementById('settingPhone').value = profileData.phone;
    document.getElementById('settingWhatsapp').value = profileData.whatsapp;
    document.getElementById('settingLocation').value = profileData.location;
    document.getElementById('settingExperience').value = profileData.experience;
    document.getElementById('settingProjects').value = profileData.projects;
    document.getElementById('settingClients').value = profileData.clients;

    document.getElementById('settingsModal').style.display = 'block';
}

function closeSettingsModal() {
    document.getElementById('settingsModal').style.display = 'none';
}

// Submit settings form
document.getElementById('settingsForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    profileData = {
        name: document.getElementById('settingName').value,
        title: document.getElementById('settingTitle').value,
        description: document.getElementById('settingDescription').value,
        about: document.getElementById('settingDescription').value,
        email: document.getElementById('settingEmail').value,
        phone: document.getElementById('settingPhone').value,
        whatsapp: document.getElementById('settingWhatsapp').value,
        location: document.getElementById('settingLocation').value,
        experience: document.getElementById('settingExperience').value,
        projects: document.getElementById('settingProjects').value,
        clients: document.getElementById('settingClients').value
    };

    localStorage.setItem('profileData', JSON.stringify(profileData));
    updateProfileDisplay();
    closeSettingsModal();
    alert('Profile updated successfully!');
});

// ========== CONTACT FORM ==========
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    document.getElementById('contactForm').reset();
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ========== CLOSE MODAL ON OUTSIDE CLICK ==========
window.addEventListener('click', (e) => {
    const projectModal = document.getElementById('projectModal');
    const settingsModal = document.getElementById('settingsModal');
    
    if (e.target === projectModal) {
        closeProjectModal();
    }
    if (e.target === settingsModal) {
        closeSettingsModal();
    }
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.portfolio-card, .service-card, .stat-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});