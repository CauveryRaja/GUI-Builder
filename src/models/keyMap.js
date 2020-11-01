class UniqueKeyGenMap {
    constructor() {
        this.keyMap = {
            input: 0,
            select: 0,
            textarea: 0,
            paragraph: 0,
            heading: 0,
            button: 0
        };
        this.fetchFromStorage();
    }

    initMap() {
        this.keyMap = {
            input: 0,
            select: 0,
            textarea: 0,
            paragraph: 0,
            heading: 0,
            button: 0
        };
        localStorage.setItem('keyMap', JSON.stringify(this.keyMap));
    }

    fetchFromStorage() {
        let map = localStorage.getItem('keyMap');
        if(!map) {
            localStorage.setItem('keyMap', JSON.stringify(this.keyMap));
        }
        else {
            this.keyMap = JSON.parse(map);
        }
    }

    getUniqueId(type) {
        let count = this.keyMap[type]++;
        localStorage.setItem('keyMap', JSON.stringify(this.keyMap));
        return type + '-' + count;
    }
}

export default UniqueKeyGenMap;
