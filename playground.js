// Terminal Functionality
const terminal = {
    commands: {
        help: () => `Available commands:
- help: Show this help message
- about: About this playground
- challenges: Show CTF challenge status
- clear: Clear the terminal
- hack: Start a "hacking" animation
- banner: Display ASCII art banner
- fortune: Get a random hacker fortune
- whoami: Who are you?
- date: Show current date in hacker style
- coffee: Get some coffee`,

        about: () => `Welcome to my Security Playground!
This interactive space demonstrates my development skills and security knowledge.
Try out different commands and explore the CTF challenges to test your skills.`,

        challenges: () => {
            const challenges = document.querySelectorAll('.challenge');
            let status = 'CTF Challenge Status:\n';
            challenges.forEach(challenge => {
                const title = challenge.querySelector('h3').textContent;
                const points = challenge.dataset.points;
                const solved = challenge.classList.contains('solved');
                status += `\n${title} (${points} pts): ${solved ? '✓ Completed' : '○ Unsolved'}`;
            });
            return status;
        },

        clear: () => {
            const terminal = document.querySelector('.terminal-body');
            terminal.innerHTML = '';
            const commandLine = document.createElement('div');
            commandLine.className = 'command-line';
            commandLine.innerHTML = '<span class="prompt">$</span><input type="text" class="command-input" autofocus spellcheck="false">';
            terminal.appendChild(commandLine);
            const input = commandLine.querySelector('.command-input');
            input.focus();
            return '';
        },

        hack: () => {
            const steps = [
                'Initializing hack sequence...',
                'Bypassing firewall...',
                'Accessing mainframe...',
                'Decrypting files...',
                'Download complete!',
                '🔓 Access granted!'
            ];
            
            let delay = 0;
            steps.forEach((step, index) => {
                setTimeout(() => {
                    terminal.appendOutput(step);
                    if (index === steps.length - 1) {
                        terminal.appendOutput('\nJust kidding! This is just a fun animation 😉');
                    }
                }, delay);
                delay += 1000;
            });
            return '';
        },

        banner: () => `
   _____ ______ _____ _    _ ______ _____ _________     __
  / ____|  ____|_   _| |  | |  ____|  __ \\__   __\\ \\   / /
 | |    | |__    | | | |__| | |__  | |__) | | |   \\ \\_/ / 
 | |    |  __|   | | |  __  |  __| |  _  /  | |    \\   /  
 | |____| |     _| |_| |  | | |____| | \\ \\  | |     | |   
  \\_____|_|    |_____|_|  |_|______|_|  \\_\\ |_|     |_|   
                                                           
Type 'help' for available commands`,

        fortune: () => {
            const fortunes = [
                'The best way to predict the future is to create it. - Peter Drucker',
                'Every expert was once a beginner. - Helen Hayes',
                'The only way to do great work is to love what you do. - Steve Jobs',
                'The code is more what you\'d call guidelines than actual rules. - Pirates of the Caribbean',
                'It\'s not a bug – it\'s an undocumented feature. - Anonymous',
                'There are 10 types of people in the world: those who understand binary, and those who don\'t.',
                'If debugging is the process of removing software bugs, then programming must be the process of putting them in. - E. W. Dijkstra'
            ];
            return '🔮 ' + fortunes[Math.floor(Math.random() * fortunes.length)];
        },

        whoami: () => `
User Profile:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Role: Ethical Hacker in Training
🎯 Mission: Complete all CTF challenges
🔑 Access Level: User
🌐 Status: Active
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

        date: () => {
            const now = new Date();
            return `
╔════════════════════════════════╗
║ ${now.toLocaleString('en-US', { 
    hour12: false, 
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
})} ║
╚════════════════════════════════╝`;
        },

        coffee: () => `
    ( (
     ) )
  .........
  |       |]
  \\       /
   \`-----'
Here's your coffee! ☕️
Remember to take breaks while hacking!`
    },

    init() {
        console.log('Initializing terminal...');
        this.setupTerminal();
        console.log('Terminal setup complete');
        this.showBanner();
        console.log('Banner shown');
    },

    setupTerminal() {
        console.log('Setting up terminal...');
        const terminal = document.querySelector('.terminal-body');
        if (!terminal) {
            console.error('Terminal body not found!');
            return;
        }
        console.log('Terminal body found');

        // Clear any existing content
        terminal.innerHTML = '';

        // Create initial command line
        const commandLine = document.createElement('div');
        commandLine.className = 'command-line';
        commandLine.innerHTML = '<span class="prompt">$</span><input type="text" class="command-input" autofocus spellcheck="false">';
        terminal.appendChild(commandLine);
        console.log('Command line created');

        // Setup input handler
        const input = commandLine.querySelector('.command-input');
        if (!input) {
            console.error('Command input not found!');
            return;
        }
        console.log('Command input found');

        const handleCommand = (e) => {
            console.log('Key pressed:', e.key);
            if (e.key === 'Enter') {
                console.log('Enter pressed');
                const command = input.value.trim().toLowerCase();
                console.log('Command:', command);
                
                // Show command
                this.appendOutput('$ ' + command);
                
                // Clear input
                input.value = '';
                
                // Execute command
                if (command) {
                    console.log('Executing command:', command);
                    const output = this.executeCommand(command);
                    if (output) {
                        this.appendOutput(output);
                    }
                }
                
                // Ensure input is focused
                input.focus();
            }
        };

        input.addEventListener('keypress', handleCommand);
        console.log('Event listener added');

        // Ensure input is focused
        input.focus();
        console.log('Input focused');
    },

    showBanner() {
        console.log('Showing banner');
        this.appendOutput(this.commands.banner());
    },
    
    executeCommand(command) {
        console.log('Executing command:', command);
        const output = this.commands[command] ? this.commands[command]() : 'Command not found. Type "help" for available commands.';
        console.log('Command output:', output);
        return output;
    },

    appendOutput(text) {
        console.log('Appending output:', text);
        const terminal = document.querySelector('.terminal-body');
        const commandLine = terminal.querySelector('.command-line');
        
        const output = document.createElement('div');
        output.textContent = text;
        output.style.whiteSpace = 'pre-wrap';
        
        terminal.insertBefore(output, commandLine);
        terminal.scrollTop = terminal.scrollHeight;
        console.log('Output appended');
    }
};

// Matrix Rain Effect
const matrix = {
    canvas: null,
    ctx: null,
    drops: [],
    fontSize: 14,
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()',
    
    init() {
        this.canvas = document.getElementById('matrix');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.initDrops();
        this.start();
        
        window.addEventListener('resize', () => this.resize());
    },
    
    initDrops() {
        const columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(columns).fill(1);
    },
    
    resize() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
        
        // Reinitialize drops for new width
        this.initDrops();
    },
    
    start() {
        if (!this.canvas || !this.ctx) return;
        
        this.animate();
    },
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        // Clear canvas
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = this.fontSize + 'px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
};

// CTF Challenge System
function initializeCTF() {
    const challenges = document.querySelectorAll('.challenge');
    const flagInputs = document.querySelectorAll('.flag-input');
    const hintButtons = document.querySelectorAll('.hint-btn');
    let totalScore = 0;
    
    // Update progress bar
    function updateProgress() {
        const maxScore = 300;
        const progress = document.querySelector('.progress');
        const scoreDisplay = document.querySelector('.score span');
        
        const percentage = (totalScore / maxScore) * 100;
        progress.style.width = percentage + '%';
        scoreDisplay.textContent = totalScore;
        
        if (totalScore === maxScore) {
            showNotification('🎉 Congratulations! You\'ve completed all challenges!', 'success', 5000);
        }
    }
    
    // Handle flag submission
    flagInputs.forEach(input => {
        const challenge = input.closest('.challenge');
        const submitButton = challenge.querySelector('.submit-flag');
        
        submitButton.addEventListener('click', () => {
            const points = parseInt(challenge.dataset.points);
            const correctFlag = input.dataset.flag;
            
            if (input.value.trim() === correctFlag) {
                if (!challenge.classList.contains('solved')) {
                    totalScore += points;
                    challenge.classList.add('solved');
                    updateProgress();
                    showNotification(`🎯 Correct flag! +${points} points`, 'success');
                } else {
                    showNotification('You\'ve already solved this challenge!', 'info');
                }
            } else {
                showNotification('❌ Incorrect flag. Try again!', 'error');
            }
        });
    });
    
    // Handle hints
    hintButtons.forEach(button => {
        const challenge = button.closest('.challenge');
        const hint = challenge.querySelector('.hint');
        
        button.addEventListener('click', () => {
            if (!hint.classList.contains('shown')) {
                const points = parseInt(challenge.dataset.points);
                totalScore = Math.max(0, totalScore - 10);
                updateProgress();
                hint.classList.add('shown');
                showNotification('💡 Hint revealed! -10 points', 'warning');
            }
            hint.style.display = hint.style.display === 'block' ? 'none' : 'block';
        });
    });
}

// Notification System
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove notification after duration
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Initialize everything
console.log('Setting up DOMContentLoaded listener');
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing terminal');
    terminal.init();
    matrix.init();
    initializeCTF();
});
