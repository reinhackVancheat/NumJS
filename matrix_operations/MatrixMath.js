import { Matrix } from "./Matrix.js";
export class MatrixMath {
    static #operate(matrixA, matrixB, operationFn) {
        if (!(matrixA instanceof Matrix) || !(matrixB instanceof Matrix)) {
            throw new Error("Ambos os parâmetros devem ser instâncias de Matrix.");
        }
        if (matrixA.rows !== matrixB.rows || matrixA.columns !== matrixB.columns) {
            throw new Error("As matrizes devem ter a mesma ordem para soma.");
        }
        const result = new Matrix(matrixA.rows, matrixA.columns);
        for (let r = 0; r < matrixA.rows; r++) {
            for (let c = 0; c < matrixA.columns; c++) {
                const val = operationFn(matrixA.getAt(r,c), matrixB.getAt(r,c));
                result.setAt(r, c, val);
            }
        }
        return result;
    }
    static add(matrixA, matrixB){
        return this.#operate(matrixA, matrixB, (a,b) => a+b);
    }
    static subtract(matrixA, matrixB){
        return this.#operate(matrixA, matrixB, (a,b) => a-b)
    }
    static multiplyMatrices(matrixA, matrixB){
        if(!(matrixA instanceof Matrix) || !(matrixB instanceof Matrix)){
            throw new Error("Ambos os parâmetros devem ser instâncias de Matrix.");
        }
        if(matrixA.columns != matrixB.rows){
            throw new Error("A quantidade de linhas da matriz A precisa ser igual a quantidade de colunas de B")
        }
        const result = new Matrix(matrixA.rows, matrixB.columns);
        for (let r = 0; r < matrixA.rows; r++) {
            for (let c = 0; c < matrixB.columns; c++) {
                let sum = 0;
                for(let k = 0; k < matrixA.columns; k++){
                    sum += matrixA.getAt(r,k)*matrixB.getAt(k,c);
                }
                result.setAt(r,c,sum)
            }
            
        }
        return result;
    }
    static hadamarProduct(matrixA, matrixB){
        return this.#operate(matrixA, matrixB, (a,b) => a*b);
    }
    static scalarMultiplication(matrix, scalar){
        if (!(matrix instanceof Matrix)) {
            throw new Error("Matrix deve ser uma instância da classe Matrix");
        }
        if (typeof scalar !== 'number' || !Number.isFinite(scalar)){
            throw new Error("Scalar deve ser uma instância da classe Number");
        }
        const result = new Matrix(matrix.rows, matrix.columns);
        for(let r = 0; r < result.rows; r++){
            for(let c = 0; c < result.columns; c++){
                result.setAt(r, c, matrix.getAt(r, c) * scalar);
            }
        }
        return result;
    }
    static transposition(matrix){
        if (!(matrix instanceof Matrix)) {
            throw new Error("Matrix deve ser uma instância da classe Matrix");
        }
        const result = new Matrix(matrix.columns, matrix.rows);
        for(let r = 0; r < matrix.rows; r++){
            for(let c = 0; c < matrix.columns; c++){
                result.setAt(c,r, matrix.getAt(r,c));
            }
        }
        return result;
    }
}
