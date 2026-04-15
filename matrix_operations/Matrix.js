export class Matrix {
    #array;
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.#array = Array.from({ length: rows }, () => new Array(columns).fill(0));
    }
    static fromArray(data) {
        const rows = data.length;
        const cols = data[0].length;
        const matrix = new Matrix(rows, cols);
        matrix.fillMatrix(data);
        return matrix;
    }
    fillMatrix(array_matrix) {
        if(array_matrix.length !== this.rows || array_matrix[0].length !== this.columns){
            throw new Error("A matriz de preenchimento deve corresponder ao tamanho da matriz objeto");
        }
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                if(!isFinite(array_matrix[r][c])){
                    throw new Error("O tipo dos elementos do array devem ser numéricos");
                    
                }
                this.#array[r][c] = array_matrix[r][c];
            }
        }
        return this;
    }
    getAt(row, col) {
        return this.#array[row][col];
    }

    setAt(row, col, value) {
        this.#array[row][col] = value;
    }
}
