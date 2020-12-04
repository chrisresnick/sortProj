class Frame {
    constructor(data){
        this.data=data;
        this.next = null;
    }
}

class Frames {
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(data) {
        const node = new Frame(data);
        if(this.length == 0) {
            this.head = node;
            this.tail = node;
        }
        else if (this.length == 1){
            this.tail = node;
            this.head.next = this.tail
        }
        else {
            this.tail.next = node;
            this.tail = this.tail.next;
        }
        this.length++;
        return this.length;
    }

    unshift(data) {
        const node = new Frame(data);
        if(this.length == 0) {
            this.head = node;
            this.tail = node;
        }
        else if (this.length == 1){
            this.head = node;
            this.head.next = this.tail
        }
        else {
            node.next = this.head
            this.head = node
        }
        this.length++;
        return this.length;
    }

    shift() {
        if (this.length == 0) return null;
        let temp;
        if (this.length == 1) {
            temp = this.head.data;
            this.head = null;
            this.tail = null;
        } else if(this.length == 2) {
            temp = this.head.data;
            this.head = this.tail;
        } else {
            temp = this.head.data;
            this.head = this.head.next;
        }
        this.length--;
        return temp;
    }
}

export default Frames;
