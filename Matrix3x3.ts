export class Matrix3x3 {
    private matrix: number[][];

    constructor(matrix?: number[][]) {
        this.matrix = matrix || [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
    }

    public static identity(): Matrix3x3 {
        return new Matrix3x3();
    }

    public static rotation(angle: number): Matrix3x3 {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Matrix3x3([
            [cos, -sin, 0],
            [sin, cos, 0],
            [0, 0, 1]
        ]);
    }

    public multiply(other: Matrix3x3): Matrix3x3 {
        const result = new Array(3).fill(null).map(() => new Array(3).fill(0));

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                result[i][j] = this.matrix[i][0] * other.matrix[0][j] +
                               this.matrix[i][1] * other.matrix[1][j] +
                               this.matrix[i][2] * other.matrix[2][j];
            }
        }

        return new Matrix3x3(result);
    }

    public transformPoint(point: { x: number, y: number }): { x: number, y: number } {
        const x = this.matrix[0][0] * point.x + this.matrix[0][1] * point.y + this.matrix[0][2];
        const y = this.matrix[1][0] * point.x + this.matrix[1][1] * point.y + this.matrix[1][2];
        return { x, y };
    }
}
