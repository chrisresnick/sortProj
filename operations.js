class OpsCount{
    constructor() {
        this.operations = 0;
        this.comparisons = 0;
    }
    reset() {
        this.operations = 0;
        this.comparisons = 0;
    }
    ops() {
        return this.operations;
    }
    comps() {
        return this.comparisons;
    }
    incOps(){
        this.operations += 1;
    }
    incComps() {
        this.comparisons += 1;
    }
}

export default OpsCount;
