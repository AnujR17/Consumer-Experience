/* ═══════════════════════════════════════════════════════════════════════════════
   CONSUMER EXPERIENCE RESEARCH - MAIN JAVASCRIPT
   Handles navigation, animations, scroll effects, and chart initialization
   ═══════════════════════════════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────────────────────────────────
// COLOR PALETTE - Matching CSS Variables
// ─────────────────────────────────────────────────────────────────────────────────
const COLORS = {
    electricBlue: '#4DA3FF',
    citrusPop: '#FFD55E',
    leafGreen: '#52D681',
    purpleSplash: '#B490FF',
    peachPop: '#FF9E8C',
    coralFemale: '#F26B6B',
    tealMale: '#2AA8A1',
    dark: '#1a1a2e',
    gray600: '#6c757d',
    gray400: '#ced4da',
    white: '#ffffff'
};

// Color palette arrays for charts
const PRIMARY_PALETTE = [
    COLORS.electricBlue,
    COLORS.citrusPop,
    COLORS.leafGreen,
    COLORS.purpleSplash,
    COLORS.peachPop
];

const GENDER_PALETTE = [COLORS.coralFemale, COLORS.tealMale];

const AGE_PALETTE = [
    COLORS.citrusPop,
    COLORS.peachPop,
    COLORS.coralFemale,
    COLORS.purpleSplash
];

const LIKERT_PALETTE = [
    COLORS.coralFemale,    // Strongly Disagree / Not Important
    COLORS.peachPop,       // Disagree / Somewhat Important
    COLORS.citrusPop,      // Neutral
    COLORS.leafGreen,      // Agree / Quite Important
    COLORS.tealMale        // Strongly Agree / Extremely Important
];

// ─────────────────────────────────────────────────────────────────────────────────
// DOM READY
// ─────────────────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initProgressBar();
    initBackToTop();
    initCounterAnimation();
    initIntersectionObserver();
    initDarkModeToggle();
    
    // Register Chart.js plugins
    if (typeof Chart !== 'undefined') {
        Chart.register(ChartDataLabels);
        setChartDefaults();
        
        // Initialize lazy chart loading - charts animate when scrolled into view
        initLazyCharts();
    }
});

// Track which charts have been initialized
const initializedCharts = new Set();

// ─────────────────────────────────────────────────────────────────────────────────
// LAZY CHART INITIALIZATION - Charts animate when scrolled into viewport
// ─────────────────────────────────────────────────────────────────────────────────
function initLazyCharts() {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const canvas = entry.target;
                const chartId = canvas.id;
                
                // Only initialize once
                if (!initializedCharts.has(chartId)) {
                    initializedCharts.add(chartId);
                    initChartById(chartId);
                    
                    // Add animated class to parent for CSS effects
                    const parent = canvas.closest('.chart-animate');
                    if (parent) {
                        parent.classList.add('animated');
                    }
                }
            }
        });
    }, { threshold: 0.2, rootMargin: '50px' });
    
    // Observe all chart canvases
    document.querySelectorAll('canvas[id]').forEach(canvas => {
        chartObserver.observe(canvas);
    });
}

function initChartById(chartId) {
    switch(chartId) {
        // Demographics
        case 'genderChart': initGenderChart(); break;
        case 'ageChart': initAgeChart(); break;
        case 'occupationChart': initOccupationChart(); break;
        case 'educationChart': initEducationChart(); break;
        // EDA
        case 'shoppingFrequencyChart': initShoppingFrequencyChart(); break;
        case 'shoppingMotivationChart': initShoppingMotivationChart(); break;
        case 'storeImportanceChart': initStoreImportanceChart(); break;
        case 'vmImpactChart': initVMImpactChart(); break;
        // Validation
        case 'alphaChart': initAlphaChart(); break;
        case 'kmoChart': initKMOChart(); break;
        // Factor Analysis
        case 'screePlotChart': initScreePlotChart(); break;
        case 'discriminantHeatmap': initDiscriminantHeatmap(); break;
        case 'correlationHeatmap': initCorrelationHeatmap(); break;
        case 'factorCorrelationChart': initFactorCorrelationChart(); break;
        // Inferential Statistics
        case 'effectSizeChart': initEffectSizeChart(); break;
        case 'anovaEffectChart': initANOVAEffectChart(); break;
        // Clustering
        case 'clusterRadarChart': initClusterRadarChart(); break;
        // New charts
        case 'attributeRankingChart': initAttributeRankingChart(); break;
        case 'genderAgeChart': initGenderAgeChart(); break;
        default: console.log('Unknown chart:', chartId);
    }
}

// ─────────────────────────────────────────────────────────────────────────────────
// DARK MODE TOGGLE
// ─────────────────────────────────────────────────────────────────────────────────
function initDarkModeToggle() {
    const toggle = document.getElementById('darkModeToggle');
    if (!toggle) return;
    
    // Check for saved preference
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkNow = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkNow);
        toggle.innerHTML = isDarkNow ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Update chart colors for dark mode
        updateChartsForTheme(isDarkNow);
    });
}

function updateChartsForTheme(isDark) {
    Chart.helpers.each(Chart.instances, (chart) => {
        if (chart.options.scales) {
            const textColor = isDark ? '#e5e7eb' : '#6c757d';
            const gridColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
            
            if (chart.options.scales.x) {
                chart.options.scales.x.ticks.color = textColor;
                chart.options.scales.x.grid.color = gridColor;
            }
            if (chart.options.scales.y) {
                chart.options.scales.y.ticks.color = textColor;
                chart.options.scales.y.grid.color = gridColor;
            }
            if (chart.options.scales.r) {
                chart.options.scales.r.ticks.color = textColor;
                chart.options.scales.r.grid.color = gridColor;
                chart.options.scales.r.pointLabels.color = textColor;
            }
        }
        if (chart.options.plugins && chart.options.plugins.legend) {
            chart.options.plugins.legend.labels.color = isDark ? '#e5e7eb' : '#6c757d';
        }
        chart.update();
    });
}

// ─────────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────────
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ─────────────────────────────────────────────────────────────────────────────────
// PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────────────────
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ─────────────────────────────────────────────────────────────────────────────────
// SCROLL EFFECTS
// ─────────────────────────────────────────────────────────────────────────────────
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ─────────────────────────────────────────────────────────────────────────────────
// BACK TO TOP BUTTON
// ─────────────────────────────────────────────────────────────────────────────────
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ─────────────────────────────────────────────────────────────────────────────────
// COUNTER ANIMATION
// ─────────────────────────────────────────────────────────────────────────────────
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Create observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ─────────────────────────────────────────────────────────────────────────────────
// INTERSECTION OBSERVER FOR ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────────
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Initialize charts when they come into view
                if (entry.target.classList.contains('chart-container')) {
                    const canvas = entry.target.querySelector('canvas');
                    if (canvas && canvas.dataset.chartType) {
                        initChart(canvas);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.overview-card, .method-card, .nav-card, .chart-container, .stat-box, .finding-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Chart scroll animation observer
    const chartAnimObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                chartAnimObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.chart-animate').forEach(el => {
        chartAnimObserver.observe(el);
    });
}

// Add animate-in class styles
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ─────────────────────────────────────────────────────────────────────────────────
// CHART.JS DEFAULTS
// ─────────────────────────────────────────────────────────────────────────────────
function setChartDefaults() {
    Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = COLORS.gray600;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.padding = 20;
    Chart.defaults.plugins.tooltip.backgroundColor = COLORS.dark;
    Chart.defaults.plugins.tooltip.titleColor = COLORS.white;
    Chart.defaults.plugins.tooltip.bodyColor = COLORS.white;
    Chart.defaults.plugins.tooltip.padding = 12;
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.plugins.tooltip.displayColors = true;
    Chart.defaults.plugins.tooltip.boxPadding = 6;
    
    // Default data labels settings
    Chart.defaults.plugins.datalabels = {
        display: false
    };
}

// ─────────────────────────────────────────────────────────────────────────────────
// CHART UTILITIES
// ─────────────────────────────────────────────────────────────────────────────────

/**
 * Create a gradient for chart backgrounds
 */
function createGradient(ctx, colorStart, colorEnd, vertical = true) {
    const gradient = vertical 
        ? ctx.createLinearGradient(0, 0, 0, 400)
        : ctx.createLinearGradient(0, 0, 400, 0);
    gradient.addColorStop(0, colorStart);
    gradient.addColorStop(1, colorEnd);
    return gradient;
}

/**
 * Add transparency to a hex color
 */
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Common chart animation options
 */
const chartAnimations = {
    duration: 1200,
    easing: 'easeOutQuart',
    delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default') {
            delay = context.dataIndex * 100 + context.datasetIndex * 50;
        }
        return delay;
    }
};

/**
 * Common chart options
 */
function getCommonOptions(title = '') {
    return {
        responsive: true,
        maintainAspectRatio: false,
        animation: chartAnimations,
        plugins: {
            title: {
                display: !!title,
                text: title,
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    bottom: 20
                }
            },
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true,
                    font: {
                        size: 12
                    }
                }
            },
            datalabels: {
                display: false
            }
        }
    };
}

/**
 * Bar chart specific options
 */
function getBarOptions(horizontal = false) {
    return {
        ...getCommonOptions(),
        indexAxis: horizontal ? 'y' : 'x',
        scales: {
            x: {
                grid: {
                    display: !horizontal,
                    drawBorder: false,
                    color: hexToRgba(COLORS.gray400, 0.3)
                },
                ticks: {
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                grid: {
                    display: horizontal,
                    drawBorder: false,
                    color: hexToRgba(COLORS.gray400, 0.3)
                },
                ticks: {
                    font: {
                        size: 11
                    }
                }
            }
        }
    };
}

/**
 * Doughnut/Pie chart specific options
 */
function getDoughnutOptions(cutout = '60%') {
    return {
        ...getCommonOptions(),
        cutout: cutout,
        plugins: {
            ...getCommonOptions().plugins,
            datalabels: {
                display: true,
                color: COLORS.white,
                font: {
                    weight: 'bold',
                    size: 12
                },
                formatter: (value, ctx) => {
                    const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return percentage > 5 ? percentage + '%' : '';
                }
            }
        }
    };
}

// ─────────────────────────────────────────────────────────────────────────────────
// EXPORT FOR USE IN OTHER FILES
// ─────────────────────────────────────────────────────────────────────────────────
window.ChartColors = COLORS;
window.ChartPalettes = {
    primary: PRIMARY_PALETTE,
    gender: GENDER_PALETTE,
    age: AGE_PALETTE,
    likert: LIKERT_PALETTE
};
window.ChartUtils = {
    createGradient,
    hexToRgba,
    getCommonOptions,
    getBarOptions,
    getDoughnutOptions
};

// ─────────────────────────────────────────────────────────────────────────────────
// INDIVIDUAL CHART FUNCTIONS (for lazy loading)
// ─────────────────────────────────────────────────────────────────────────────────

// Gender Distribution Chart
function initGenderChart() {
    const ctx = document.getElementById('genderChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Female', 'Male'],
            datasets: [{
                data: [96, 58],
                backgroundColor: [COLORS.coralFemale, COLORS.tealMale],
                borderColor: [COLORS.white, COLORS.white],
                borderWidth: 4,
                hoverOffset: 15,
                hoverBorderWidth: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '55%',
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1500,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 25,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: { size: 14, weight: '600' }
                    }
                },
                datalabels: {
                    display: true,
                    color: COLORS.white,
                    font: { weight: 'bold', size: 18 },
                    textShadowColor: 'rgba(0,0,0,0.3)',
                    textShadowBlur: 4,
                    formatter: (value, ctx) => {
                        const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return percentage + '%\n(' + value + ')';
                    },
                    textAlign: 'center'
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            const pct = ((ctx.raw / total) * 100).toFixed(1);
                            return `${ctx.label}: ${ctx.raw} respondents (${pct}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Age Distribution Chart
function initAgeChart() {
    const ctx = document.getElementById('ageChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['18-25 Years', '35-45 Years', '26-34 Years', 'Above 45 Years'],
            datasets: [{
                label: 'Number of Respondents',
                data: [67, 33, 31, 23],
                backgroundColor: [
                    hexToRgba(COLORS.citrusPop, 0.85),
                    hexToRgba(COLORS.peachPop, 0.85),
                    hexToRgba(COLORS.electricBlue, 0.85),
                    hexToRgba(COLORS.purpleSplash, 0.85)
                ],
                borderColor: [COLORS.citrusPop, COLORS.peachPop, COLORS.electricBlue, COLORS.purpleSplash],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            ...getBarOptions(true),
            indexAxis: 'y',
            animation: chartAnimations,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: COLORS.dark,
                    font: { weight: 'bold', size: 12 },
                    formatter: (value) => value + ' (' + ((value/154)*100).toFixed(1) + '%)'
                }
            },
            scales: {
                x: { beginAtZero: true, max: 80, grid: { display: false }, ticks: { display: false } },
                y: { grid: { display: false }, ticks: { font: { size: 12, weight: '500' } } }
            }
        }
    });
}

// Occupation Distribution Chart
function initOccupationChart() {
    const ctx = document.getElementById('occupationChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Paid Employment', 'Student', 'Business', 'House Wife'],
            datasets: [{
                data: [66, 56, 27, 5],
                backgroundColor: [COLORS.electricBlue, COLORS.leafGreen, COLORS.purpleSplash, COLORS.peachPop],
                borderColor: COLORS.white,
                borderWidth: 3,
                hoverOffset: 10
            }]
        },
        options: {
            ...getDoughnutOptions('55%'),
            animation: { animateRotate: true, animateScale: true, duration: 1500, easing: 'easeOutQuart' },
            plugins: {
                ...getDoughnutOptions('55%').plugins,
                legend: {
                    position: 'bottom',
                    labels: { padding: 15, usePointStyle: true, font: { size: 11, weight: '500' } }
                },
                datalabels: {
                    display: true,
                    color: COLORS.white,
                    font: { weight: 'bold', size: 12 },
                    formatter: (value, ctx) => {
                        const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(0);
                        return percentage > 5 ? percentage + '%' : '';
                    }
                }
            }
        }
    });
}

// Education Level Chart
function initEducationChart() {
    const ctx = document.getElementById('educationChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Degree (Bachelor\'s)', 'Postgraduate', 'HSC/Diploma'],
            datasets: [{
                label: 'Number of Respondents',
                data: [96, 51, 6],
                backgroundColor: [
                    hexToRgba(COLORS.leafGreen, 0.85),
                    hexToRgba(COLORS.purpleSplash, 0.85),
                    hexToRgba(COLORS.citrusPop, 0.85)
                ],
                borderColor: [COLORS.leafGreen, COLORS.purpleSplash, COLORS.citrusPop],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            ...getBarOptions(true),
            indexAxis: 'y',
            animation: chartAnimations,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: COLORS.dark,
                    font: { weight: 'bold', size: 12 },
                    formatter: (value) => value + ' (' + ((value/154)*100).toFixed(1) + '%)'
                }
            },
            scales: {
                x: { beginAtZero: true, max: 120, grid: { display: false }, ticks: { display: false } },
                y: { grid: { display: false }, ticks: { font: { size: 12, weight: '500' } } }
            }
        }
    });
}

// ─────────────────────────────────────────────────────────────────────────────────
// NEW CHART: Gender × Age Cross-tabulation
// ─────────────────────────────────────────────────────────────────────────────────
function initGenderAgeChart() {
    const ctx = document.getElementById('genderAgeChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['18-25', '26-34', '35-45', '45+'],
            datasets: [
                {
                    label: 'Female',
                    data: [42, 19, 21, 14],
                    backgroundColor: hexToRgba(COLORS.coralFemale, 0.8),
                    borderColor: COLORS.coralFemale,
                    borderWidth: 2,
                    borderRadius: 6
                },
                {
                    label: 'Male',
                    data: [25, 12, 12, 9],
                    backgroundColor: hexToRgba(COLORS.tealMale, 0.8),
                    borderColor: COLORS.tealMale,
                    borderWidth: 2,
                    borderRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: chartAnimations,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { usePointStyle: true, padding: 15, font: { size: 12, weight: '500' } }
                },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'top',
                    color: COLORS.dark,
                    font: { weight: 'bold', size: 10 },
                    formatter: (value) => value
                },
                tooltip: {
                    callbacks: {
                        afterLabel: (ctx) => {
                            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            return `${((ctx.raw / total) * 100).toFixed(1)}% of ${ctx.dataset.label}`;
                        }
                    }
                }
            },
            scales: {
                x: { grid: { display: false }, ticks: { font: { size: 11, weight: '500' } } },
                y: { beginAtZero: true, grid: { color: hexToRgba(COLORS.gray400, 0.2) }, ticks: { stepSize: 10 } }
            }
        }
    });
}

// Keep legacy function for backwards compatibility
function initDemographicsCharts() {
    // Now handled by lazy loading
}

// ─────────────────────────────────────────────────────────────────────────────────
// EDA CHARTS - Individual Functions
// ─────────────────────────────────────────────────────────────────────────────────

// Shopping Frequency Chart
function initShoppingFrequencyChart() {
    const ctx = document.getElementById('shoppingFrequencyChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Once in 3 months', 'Once a month', 'Once in 6 months', 'Once a year'],
            datasets: [{
                data: [62, 58, 24, 10],
                backgroundColor: [COLORS.electricBlue, COLORS.citrusPop, COLORS.leafGreen, COLORS.purpleSplash],
                borderColor: COLORS.white,
                borderWidth: 3,
                hoverOffset: 10
            }]
        },
        options: {
            ...getDoughnutOptions('55%'),
            animation: { animateRotate: true, animateScale: true, duration: 1500, easing: 'easeOutQuart' },
            plugins: {
                legend: { position: 'bottom', labels: { padding: 12, usePointStyle: true, font: { size: 11 } } },
                datalabels: {
                    display: true,
                    color: COLORS.white,
                    font: { weight: 'bold', size: 12 },
                    formatter: (value, ctx) => {
                        const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                        const pct = ((value / total) * 100).toFixed(0);
                        return pct > 6 ? pct + '%' : '';
                    }
                }
            }
        }
    });
}

// Shopping Motivation Chart
function initShoppingMotivationChart() {
    const ctx = document.getElementById('shoppingMotivationChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Variety in life', 'Keep up with trends', 'Try new outlets', 'Feel relaxed', 'For fun'],
            datasets: [{
                data: [70, 38, 16, 13, 13],
                backgroundColor: [
                    hexToRgba(COLORS.electricBlue, 0.85),
                    hexToRgba(COLORS.citrusPop, 0.85),
                    hexToRgba(COLORS.leafGreen, 0.85),
                    hexToRgba(COLORS.purpleSplash, 0.85),
                    hexToRgba(COLORS.peachPop, 0.85)
                ],
                borderColor: [COLORS.electricBlue, COLORS.citrusPop, COLORS.leafGreen, COLORS.purpleSplash, COLORS.peachPop],
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: chartAnimations,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: COLORS.dark,
                    font: { weight: 'bold', size: 11 },
                    formatter: (value) => value + ' (' + ((value/150)*100).toFixed(1) + '%)'
                }
            },
            scales: {
                x: { beginAtZero: true, max: 85, grid: { display: false }, ticks: { display: false } },
                y: { grid: { display: false }, ticks: { font: { size: 11, weight: '500' } } }
            }
        }
    });
}

// Store Importance Chart
function initStoreImportanceChart() {
    const ctx = document.getElementById('storeImportanceChart');
    if (!ctx) return;
    
    const storeData = [
        { label: 'Store Cleanliness', mean: 4.68 },
        { label: 'Parking Facility', mean: 4.60 },
        { label: 'Digital Payment', mean: 4.57 },
        { label: 'Fast Checkout', mean: 4.45 },
        { label: 'Return Policy', mean: 4.36 }
    ];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: storeData.map(d => d.label),
            datasets: [{
                data: storeData.map(d => d.mean),
                backgroundColor: storeData.map((_, i) => hexToRgba(PRIMARY_PALETTE[i % PRIMARY_PALETTE.length], 0.85)),
                borderColor: storeData.map((_, i) => PRIMARY_PALETTE[i % PRIMARY_PALETTE.length]),
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: chartAnimations,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: COLORS.dark,
                    font: { weight: 'bold', size: 11 },
                    formatter: (value) => value.toFixed(2)
                }
            },
            scales: {
                x: { beginAtZero: false, min: 4.0, max: 5.0, grid: { color: hexToRgba(COLORS.gray400, 0.2) } },
                y: { grid: { display: false }, ticks: { font: { size: 11, weight: '500' } } }
            }
        }
    });
}

// VM Impact Chart
function initVMImpactChart() {
    const ctx = document.getElementById('vmImpactChart');
    if (!ctx) return;
    
    const vmData = [
        { label: 'Lighting & Music', mean: 4.09 },
        { label: 'AI/VR/AR', mean: 3.90 },
        { label: 'Creative Displays', mean: 3.78 },
        { label: 'Signage & Graphics', mean: 3.72 },
        { label: 'Window Displays', mean: 3.67 }
    ];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: vmData.map(d => d.label),
            datasets: [{
                data: vmData.map(d => d.mean),
                backgroundColor: vmData.map((_, i) => hexToRgba([COLORS.purpleSplash, COLORS.peachPop, COLORS.coralFemale, COLORS.citrusPop, COLORS.gray400][i], 0.85)),
                borderColor: [COLORS.purpleSplash, COLORS.peachPop, COLORS.coralFemale, COLORS.citrusPop, COLORS.gray400],
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: chartAnimations,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: COLORS.dark,
                    font: { weight: 'bold', size: 11 },
                    formatter: (value) => value.toFixed(2)
                }
            },
            scales: {
                x: { beginAtZero: false, min: 3.5, max: 4.5, grid: { color: hexToRgba(COLORS.gray400, 0.2) } },
                y: { grid: { display: false }, ticks: { font: { size: 11, weight: '500' } } }
            }
        }
    });
}

// Keep legacy function
function initEDACharts() {
    // Now handled by lazy loading
}

// ─────────────────────────────────────────────────────────────────────────────────
// VALIDATION CHARTS
// ─────────────────────────────────────────────────────────────────────────────────
function initValidationCharts() {
    // KMO Chart
    const kmoCtx = document.getElementById('kmoChart');
    if (kmoCtx) {
        new Chart(kmoCtx, {
            type: 'bar',
            data: {
                labels: ['Store Importance', 'Visual Merchandising', 'Full Scale'],
                datasets: [{
                    label: 'KMO Value',
                    data: [0.754, 0.674, 0.689],  // Actual: 0.7536, 0.6736, 0.6891
                    backgroundColor: [
                        hexToRgba(COLORS.leafGreen, 0.85),
                        hexToRgba(COLORS.citrusPop, 0.85),
                        hexToRgba(COLORS.electricBlue, 0.85)
                    ],
                    borderColor: [COLORS.leafGreen, COLORS.citrusPop, COLORS.electricBlue],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    datalabels: {
                        display: true,
                        anchor: 'end',
                        align: 'top',
                        color: COLORS.dark,
                        font: { weight: 'bold', size: 13 },
                        formatter: (value) => value.toFixed(3)
                    }
                },
                scales: {
                    x: { grid: { display: false }, ticks: { font: { size: 11, weight: '500' } } },
                    y: { 
                        beginAtZero: false, 
                        min: 0.5, 
                        max: 0.85, 
                        grid: { color: hexToRgba(COLORS.gray400, 0.2) },
                        ticks: { stepSize: 0.1 }
                    }
                }
            }
        });
    }
}

// ─────────────────────────────────────────────────────────────────────────────────
// INDIVIDUAL CHART FUNCTIONS FOR LAZY LOADING
// ─────────────────────────────────────────────────────────────────────────────────

// KMO Chart (Kaiser-Meyer-Olkin)
function initKMOChart() {
    const ctx = document.getElementById('kmoChart');
    if (!ctx) return;
    
    // Actual KMO values from notebook: Store=0.7536, VM=0.6736, Full=0.6891
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Store Importance', 'Visual Merchandising', 'Full Scale'],
            datasets: [{
                label: 'KMO Value',
                data: [0.754, 0.674, 0.689],  // Rounded from actual values
                backgroundColor: [
                    hexToRgba(COLORS.leafGreen, 0.85),
                    hexToRgba(COLORS.citrusPop, 0.85),
                    hexToRgba(COLORS.electricBlue, 0.85)
                ],
                borderColor: [COLORS.leafGreen, COLORS.citrusPop, COLORS.electricBlue],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: chartAnimations,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'top',
                    color: COLORS.dark,
                    font: { weight: 'bold', size: 13 },
                    formatter: (value) => value.toFixed(3)
                }
            },
            scales: {
                x: { grid: { display: false }, ticks: { font: { size: 11, weight: '500' } } },
                y: { 
                    beginAtZero: false, 
                    min: 0.5, 
                    max: 0.85, 
                    grid: { color: hexToRgba(COLORS.gray400, 0.2) },
                    ticks: { stepSize: 0.1 }
                }
            }
        }
    });
}

// Alpha Chart (Cronbach's Alpha)
function initAlphaChart() {
    const ctx = document.getElementById('alphaChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Store Importance', 'Visual Merchandising', 'Full Scale'],
            datasets: [{
                label: "Cronbach's Alpha",
                data: [0.807, 0.775, 0.857],
                backgroundColor: [
                    hexToRgba(COLORS.leafGreen, 0.85),
                    hexToRgba(COLORS.citrusPop, 0.85),
                    hexToRgba(COLORS.electricBlue, 0.85)
                ],
                borderColor: [COLORS.leafGreen, COLORS.citrusPop, COLORS.electricBlue],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: chartAnimations,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'top',
                    color: COLORS.dark,
                    font: { weight: 'bold', size: 13 },
                    formatter: (value) => value.toFixed(3)
                }
            },
            scales: {
                x: { grid: { display: false }, ticks: { font: { size: 11, weight: '500' } } },
                y: { 
                    beginAtZero: false, 
                    min: 0.6, 
                    max: 0.95, 
                    grid: { color: hexToRgba(COLORS.gray400, 0.2) },
                    ticks: { stepSize: 0.1 }
                }
            }
        }
    });
}

// Scree Plot Chart
function initScreePlotChart() {
    const ctx = document.getElementById('screePlotChart');
    if (!ctx) return;
    
    // Actual eigenvalues from notebook - 10 factors
    const actualEigenvalues = [4.01, 2.04, 1.63, 1.27, 1.03, 0.84, 0.81, 0.79, 0.67, 0.58];
    // Random 95th percentile from parallel analysis
    const randomEigenvalues = [1.45, 1.32, 1.22, 1.14, 1.07, 1.00, 0.94, 0.88, 0.82, 0.75];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [
                {
                    label: 'Actual Eigenvalues',
                    data: actualEigenvalues,
                    borderColor: COLORS.electricBlue,
                    backgroundColor: hexToRgba(COLORS.electricBlue, 0.15),
                    borderWidth: 3,
                    pointRadius: 8,
                    pointBackgroundColor: COLORS.electricBlue,
                    pointBorderColor: COLORS.white,
                    pointBorderWidth: 2,
                    pointHoverRadius: 10,
                    fill: {
                        target: 'origin',
                        above: hexToRgba(COLORS.electricBlue, 0.1)
                    },
                    tension: 0.2
                },
                {
                    label: 'Random 95th Percentile',
                    data: randomEigenvalues,
                    borderColor: COLORS.coralFemale,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [6, 4],
                    pointRadius: 5,
                    pointStyle: 'rect',
                    pointBackgroundColor: COLORS.coralFemale,
                    fill: false
                },
                {
                    label: 'Kaiser Criterion (λ = 1)',
                    data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    borderColor: COLORS.leafGreen,
                    borderWidth: 2,
                    borderDash: [3, 3],
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: chartAnimations,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { 
                        usePointStyle: true, 
                        padding: 15, 
                        font: { size: 11 } 
                    }
                },
                datalabels: { 
                    display: (context) => context.datasetIndex === 0 && context.dataIndex < 6,
                    anchor: 'end',
                    align: 'top',
                    color: COLORS.dark,
                    font: { weight: 'bold', size: 10 },
                    formatter: (value) => value.toFixed(2),
                    offset: 4
                },
                tooltip: {
                    callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw.toFixed(2)}` }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Factor Number', font: { weight: '600', size: 12 } },
                    grid: { display: false },
                    ticks: { font: { size: 11 } }
                },
                y: {
                    title: { display: true, text: 'Eigenvalue', font: { weight: '600', size: 12 } },
                    min: 0,
                    max: 4.5,
                    ticks: {
                        stepSize: 0.5,
                        callback: function(value) {
                            return value.toFixed(1);
                        },
                        font: { size: 11 }
                    },
                    grid: { color: hexToRgba(COLORS.gray400, 0.3) }
                }
            }
        }
    });
}

// Factor Correlation Matrix (Discriminant Validity) - Using grouped bar chart
function initFactorCorrelationChart() {
    const ctx = document.getElementById('factorCorrelationChart');
    if (!ctx) return;
    
    // Factor correlations from notebook - showing key off-diagonal correlations
    // These represent correlations between different factors
    const factorPairs = [
        'F1-F2', 'F1-F3', 'F1-F4', 'F1-F5',
        'F2-F3', 'F2-F4', 'F2-F5',
        'F3-F4', 'F3-F5',
        'F4-F5'
    ];
    
    const correlations = [
        0.24, 0.18, 0.12, 0.15,  // F1 with others
        0.31, 0.28, 0.22,        // F2 with others
        0.19, 0.22,              // F3 with others
        0.42                     // F4 with F5
    ];
    
    // Color based on correlation strength
    const getBarColor = (val) => {
        if (val >= 0.4) return COLORS.citrusPop;      // Moderate-high
        if (val >= 0.25) return COLORS.electricBlue;  // Moderate
        return COLORS.leafGreen;                       // Low
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: factorPairs,
            datasets: [{
                label: 'Inter-Factor Correlation (r)',
                data: correlations,
                backgroundColor: correlations.map(c => hexToRgba(getBarColor(c), 0.8)),
                borderColor: correlations.map(c => getBarColor(c)),
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: chartAnimations,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'top',
                    color: COLORS.dark,
                    font: { weight: 'bold', size: 10 },
                    formatter: (value) => value.toFixed(2)
                },
                tooltip: {
                    callbacks: {
                        title: (items) => {
                            const pair = items[0].label;
                            const factors = {
                                'F1': 'Facilities & Service',
                                'F2': 'Store Atmosphere', 
                                'F3': 'Value Proposition',
                                'F4': 'VM External Appeal',
                                'F5': 'VM In-Store Experience'
                            };
                            const [f1, f2] = pair.split('-');
                            return `${factors[f1]} × ${factors[f2]}`;
                        },
                        label: (ctx) => `Correlation: r = ${ctx.raw.toFixed(3)}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { 
                        font: { size: 9, weight: '500' },
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 0.7,
                    title: { 
                        display: true, 
                        text: 'Correlation Coefficient (r)', 
                        font: { weight: '600', size: 11 } 
                    },
                    grid: { color: hexToRgba(COLORS.gray400, 0.2) },
                    ticks: { stepSize: 0.1 }
                }
            }
        }
    });
    
    // Add threshold line indicator via a separate element or note
    // The 0.70 discriminant validity threshold is shown in the chart insight text
}

// Effect Size Chart (Cohen's d from t-tests)
function initEffectSizeChart() {
    const ctx = document.getElementById('effectSizeChart');
    if (!ctx) return;
    
    // Actual Cohen's d values from gender t-tests
    const effectSizes = [-0.27, -0.24, 0.16, -0.00, 0.01];
    const labels = ['Facilities & Service', 'Store Atmosphere', 'Value Proposition', 'VM External', 'VM In-Store'];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Cohen's d",
                data: effectSizes,
                backgroundColor: effectSizes.map(d => 
                    Math.abs(d) >= 0.5 ? hexToRgba(COLORS.coralFemale, 0.8) :
                    Math.abs(d) >= 0.2 ? hexToRgba(COLORS.citrusPop, 0.8) :
                    hexToRgba(COLORS.leafGreen, 0.8)
                ),
                borderColor: effectSizes.map(d => 
                    Math.abs(d) >= 0.5 ? COLORS.coralFemale :
                    Math.abs(d) >= 0.2 ? COLORS.citrusPop :
                    COLORS.leafGreen
                ),
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: chartAnimations,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: (context) => context.raw >= 0 ? 'end' : 'start',
                    align: (context) => context.raw >= 0 ? 'right' : 'left',
                    color: COLORS.dark,
                    font: { weight: 'bold', size: 11 },
                    formatter: (value) => value.toFixed(2)
                }
            },
            scales: {
                x: {
                    min: -0.5,
                    max: 0.5,
                    title: { display: true, text: "Cohen's d", font: { weight: '600' } },
                    grid: { color: hexToRgba(COLORS.gray400, 0.2) }
                },
                y: {
                    grid: { display: false },
                    ticks: { font: { size: 10 } }
                }
            }
        }
    });
}

// ANOVA Effect Sizes Chart (Eta-squared)
function initANOVAEffectChart() {
    const ctx = document.getElementById('anovaEffectChart');
    if (!ctx) return;
    
    // Actual η² values from ANOVA (occupation differences)
    const etaSquared = [0.025, 0.055, 0.010, 0.055, 0.050];
    const labels = ['Facilities', 'Atmosphere*', 'Value', 'VM External*', 'VM In-Store'];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'η² (Eta-squared)',
                data: etaSquared,
                backgroundColor: etaSquared.map(e => 
                    e >= 0.14 ? hexToRgba(COLORS.coralFemale, 0.8) :
                    e >= 0.06 ? hexToRgba(COLORS.citrusPop, 0.8) :
                    e >= 0.01 ? hexToRgba(COLORS.leafGreen, 0.7) :
                    hexToRgba(COLORS.gray400, 0.5)
                ),
                borderColor: etaSquared.map(e => 
                    e >= 0.14 ? COLORS.coralFemale :
                    e >= 0.06 ? COLORS.citrusPop :
                    e >= 0.01 ? COLORS.leafGreen :
                    COLORS.gray400
                ),
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: chartAnimations,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'top',
                    color: COLORS.dark,
                    font: { weight: 'bold', size: 11 },
                    formatter: (value) => value.toFixed(3)
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 10, weight: '500' } }
                },
                y: {
                    beginAtZero: true,
                    max: 0.08,
                    title: { display: true, text: 'Effect Size (η²)', font: { weight: '600' } },
                    grid: { color: hexToRgba(COLORS.gray400, 0.2) }
                }
            }
        }
    });
}

// Cluster Radar Chart
function initClusterRadarChart() {
    const ctx = document.getElementById('clusterRadarChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Store Atmosphere',
                'Facilities & Service',
                'Value Proposition',
                'VM External Appeal',
                'VM In-Store Experience'
            ],
            datasets: [
                {
                    label: 'Low-Involvement Shoppers (n=72)',
                    data: [-0.35, -0.55, -0.65, -0.75, -0.85],
                    backgroundColor: hexToRgba('#6b7280', 0.25),
                    borderColor: '#6b7280',
                    borderWidth: 2,
                    pointBackgroundColor: '#6b7280',
                    pointBorderColor: COLORS.white,
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: 'Value-Seeking Visual (n=82)',
                    data: [0.30, 0.50, 0.60, 0.70, 0.80],
                    backgroundColor: hexToRgba(COLORS.leafGreen, 0.25),
                    borderColor: COLORS.leafGreen,
                    borderWidth: 2,
                    pointBackgroundColor: COLORS.leafGreen,
                    pointBorderColor: COLORS.white,
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: chartAnimations,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { usePointStyle: true, padding: 20, font: { size: 12, weight: '500' } }
                },
                datalabels: { display: false }
            },
            scales: {
                r: {
                    beginAtZero: false,
                    min: -1,
                    max: 1,
                    ticks: { stepSize: 0.5, font: { size: 10 }, backdropColor: 'transparent' },
                    grid: { color: hexToRgba(COLORS.gray400, 0.3), circular: true },
                    angleLines: { color: hexToRgba(COLORS.gray400, 0.3) },
                    pointLabels: { font: { size: 11, weight: '500' }, color: COLORS.dark }
                }
            }
        }
    });
}

// Correlation Heatmap (Factor Correlations from CFA)
function initCorrelationHeatmap() {
    const ctx = document.getElementById('correlationHeatmap');
    if (!ctx) return;
    
    // Factor covariance data from CFA output (φ values)
    // F1=Facilities, F2=Atmosphere, F3=Value, F4=External, F5=InStore
    const factors = ['F1: Facilities', 'F2: Atmosphere', 'F3: Value', 'F4: VM External', 'F5: VM InStore'];
    // CFA inter-factor covariances (converted to approximate correlations by scaling)
    // Original φ values: F1↔F2=0.051, F1↔F3=0.036, F1↔F4=0.006, F1↔F5=0.021
    // F2↔F3=0.116, F2↔F4=0.118, F2↔F5=0.112, F3↔F4=0.097, F3↔F5=0.110, F4↔F5=0.157
    const correlations = [
        [1.00, 0.22, 0.19, 0.08, 0.14],
        [0.22, 1.00, 0.34, 0.34, 0.33],
        [0.19, 0.34, 1.00, 0.31, 0.33],
        [0.08, 0.34, 0.31, 1.00, 0.40],
        [0.14, 0.33, 0.33, 0.40, 1.00]
    ];
    
    // Convert to bubble chart data for heatmap effect
    const data = [];
    for (let i = 0; i < factors.length; i++) {
        for (let j = 0; j < factors.length; j++) {
            data.push({
                x: j,
                y: factors.length - 1 - i,
                r: Math.abs(correlations[i][j]) * 18 + 4,
                v: correlations[i][j]
            });
        }
    }
    
    new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                data: data,
                backgroundColor: data.map(d => {
                    const val = Math.abs(d.v);
                    if (val >= 0.8) return hexToRgba(COLORS.leafGreen, 0.9);
                    if (val >= 0.35) return hexToRgba(COLORS.electricBlue, 0.8);
                    if (val >= 0.2) return hexToRgba(COLORS.citrusPop, 0.7);
                    return hexToRgba(COLORS.gray400, 0.4);
                }),
                borderColor: data.map(d => {
                    const val = Math.abs(d.v);
                    if (val >= 0.8) return COLORS.leafGreen;
                    if (val >= 0.35) return COLORS.electricBlue;
                    if (val >= 0.2) return COLORS.citrusPop;
                    return COLORS.gray400;
                }),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: chartAnimations,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    color: (ctx) => Math.abs(ctx.dataset.data[ctx.dataIndex].v) >= 0.8 ? COLORS.white : COLORS.dark,
                    font: { weight: 'bold', size: 10 },
                    formatter: (value) => value.v.toFixed(2)
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const d = ctx.raw;
                            return `${factors[factors.length - 1 - d.y]} × ${factors[d.x]}: r = ${d.v.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    min: -0.5,
                    max: factors.length - 0.5,
                    ticks: {
                        callback: (val) => factors[val] || '',
                        font: { size: 9, weight: '500' },
                        maxRotation: 45,
                        minRotation: 45
                    },
                    grid: { display: false }
                },
                y: {
                    min: -0.5,
                    max: factors.length - 0.5,
                    ticks: {
                        callback: (val) => factors[factors.length - 1 - val] || '',
                        font: { size: 9, weight: '500' }
                    },
                    grid: { display: false }
                }
            }
        }
    });
}

// Attribute Ranking Chart (Store Importance Ranking from notebook)
function initAttributeRankingChart() {
    const ctx = document.getElementById('attributeRankingChart');
    if (!ctx) return;
    
    // Actual data from notebook: TOP 10 Most Important Attributes
    const attributes = [
        { label: 'Store Cleanliness', mean: 4.71, ci: 0.08, rank: 1 },
        { label: 'Parking Facility', mean: 4.61, ci: 0.10, rank: 2 },
        { label: 'Digital Payment', mean: 4.61, ci: 0.11, rank: 3 },
        { label: 'Fast Checkout', mean: 4.48, ci: 0.10, rank: 4 },
        { label: 'Return Policy', mean: 4.44, ci: 0.12, rank: 5 },
        { label: 'Changing Rooms', mean: 4.29, ci: 0.11, rank: 6 },
        { label: 'Washrooms', mean: 4.28, ci: 0.12, rank: 7 },
        { label: 'Merchandise Display', mean: 4.06, ci: 0.13, rank: 8 },
        { label: 'Store Ambience', mean: 4.04, ci: 0.12, rank: 9 },
        { label: 'Water Facility', mean: 4.03, ci: 0.14, rank: 10 }
    ];
    
    const colors = attributes.map(d => {
        if (d.rank <= 3) return COLORS.leafGreen;
        if (d.rank <= 6) return COLORS.electricBlue;
        return COLORS.citrusPop;
    });
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: attributes.map(d => d.label),
            datasets: [{
                data: attributes.map(d => d.mean),
                backgroundColor: colors.map(c => hexToRgba(c, 0.85)),
                borderColor: colors,
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false,
                // Error bars data
                errorBars: attributes.map(d => ({ plus: d.ci * 1.96, minus: d.ci * 1.96 }))
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            animation: chartAnimations,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'end',
                    color: COLORS.dark,
                    font: { weight: 'bold', size: 11 },
                    formatter: (value, ctx) => {
                        const attr = attributes[ctx.dataIndex];
                        return `#${attr.rank} (${value.toFixed(2)} ± ${attr.ci.toFixed(2)})`;
                    }
                }
            },
            scales: {
                x: { 
                    beginAtZero: false, 
                    min: 3.8, 
                    max: 5.1, 
                    grid: { color: hexToRgba(COLORS.gray400, 0.2) },
                    title: { display: true, text: 'Mean Importance (1-5 Scale)', font: { weight: '600' } }
                },
                y: { grid: { display: false }, ticks: { font: { size: 11, weight: '500' } } }
            }
        }
    });
}

// Keep legacy init function which is no longer needed with lazy loading
function initAdditionalCharts() {
    // Now handled by lazy loading individual functions
}

// Initialize lazy loading after DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Start lazy chart initialization
    setTimeout(() => {
        if (typeof Chart !== 'undefined') {
            initLazyCharts();
        }
    }, 100);
});
