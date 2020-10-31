class UniqueKeyGenTable {
    constructor() {
        this.keyMap = {
            'input': 0,
            'select': 0,
            'textarea': 0,
            'paragraph': 0,
            'heading': 0,
            'button': 0
        };
    }

    getUniqueId(type) {
        return type + '-' + this.keyMap[type]++;
    }
}

export default UniqueKeyGenTable;
