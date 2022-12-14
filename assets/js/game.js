import { crEl, qs, qsa, getRandomNumber, directions } from '/assets/js/util.js';

class Game {
    constructor({
        selector,
        pacman,
        ghosts,
        map
    }) {
        this.el = qs(selector);
        this.pacman = pacman;
        this.ghosts = ghosts;
        this.map = map;

        this.updateGameSize();

        this.generateMap();

        this.addPackman();

        this.addGhosts();

        this.addDots();
        
        window.addEventListener('resize', this.updateGameSize);
        window.addEventListener('keydown', this.onKeyPress);
    }

    eatDot = (space) => {
        const dot = space.querySelector('.dot');
        if(dot) dot.remove();
    }
    
    onKeyPress = (e) => {
        this.pacman.moveEl(directions[e.code]);
    }

    updateGameSize = () => {
        if(window.innerWidth > window.innerHeight) {
            this.el.style.width = 'unset';
            this.el.style.height = '100vh';
        }
        else {
            this.el.style.width = '100vw';
            this.el.style.height = 'unset';
        }
    }

    generateMap = () => {
        this.map.blocks.forEach((m, index) => {
            this.el.append(crEl('div', {
                class: this.map.blockClasses[m]
            }));
        })
    }

    addPackman = () => {
        this.pacman.game = this;
        const spaces = qsa('.space:empty', this.el);
        this.pacman.space = spaces[getRandomNumber(0, spaces.length-1)];
        this.pacman.space.setAttribute('data-packman', '');
        const rect = this.pacman.space.getBoundingClientRect();
        this.el.append(this.pacman.el);
        this.pacman.el.style.top = `${rect.top}px`;
        this.pacman.el.style.left = `${rect.left}px`;
    }

    addGhosts = () => {
        let spaces;
        for(let i = 0; i < this.ghosts.length; i++) {
            this.ghosts[i].game = this;
            spaces = qsa('.space:empty', this.el);
            this.ghosts[i].space = spaces[getRandomNumber(0, spaces.length-1)];
            this.ghosts[i].space.setAttribute('data-ghost', `${i}`);
            const rect = this.pacman.space.getBoundingClientRect();
            this.el.append(this.ghosts[i].el);
            this.ghosts[i].el.style.top = `${rect.top}px`;
            this.ghosts[i].el.style.left = `${rect.left}px`;
            this.ghosts[i].startMoving();
        }
    }

    addDots = () => {
        const spaces = qsa('.space', this.el);
        const dot = crEl('div', {
            class: 'dot'
        })
        for(let i = 0; i < spaces.length; i++) {
            spaces[i].append(dot.cloneNode(true));
        }
    }
}

export default Game