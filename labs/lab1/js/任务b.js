"use strict";

var gl;

window.onload = function init() {
    var canvas = document.getElementById("task-b-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("WebGL 2.0 isn't available");
        return;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // 四边形顶点数据（两个三角形组成）
    var vertices = new Float32Array([
        -0.4, 0.4,   // 三角形1
        0.4, 0.4,
        -0.4, -0.4,
        0.4, 0.4,    // 三角形2
        -0.4, -0.4,
        0.4, -0.4
    ]);

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    changeColor('blue');
}

function changeColor(color) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    var program = gl.getParameter(gl.CURRENT_PROGRAM);
    var colorLoc = gl.getUniformLocation(program, "uColor");
    
    var colorValue;
    switch(color) {
        case 'green':
            colorValue = [0.0, 1.0, 0.0, 1.0];
            break;
        case 'purple':
            colorValue = [0.5, 0.0, 0.5, 1.0];
            break;
        default:
            colorValue = [0.0, 0.0, 1.0, 1.0];  // 蓝色
    }
    
    gl.uniform4fv(colorLoc, colorValue);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}
