"use strict";

var gl;
var triangleVertices, quadVertices;

window.onload = function init() {
    var canvas = document.getElementById("task-c-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("WebGL 2.0 isn't available");
        return;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // 三角形顶点数据
    triangleVertices = new Float32Array([
        0.0, 0.6,    // 上顶点
        -0.3, 0.1,   // 左下
        0.3, 0.1     // 右下
    ]);

    // 四边形顶点数据
    quadVertices = new Float32Array([
        -0.4, -0.2,  // 左下
        0.4, -0.2,   // 右下
        0.4, -0.6,   // 右上
        -0.4, -0.2,  // 左下
        0.4, -0.6,   // 右上
        -0.4, -0.6   // 左上
    ]);

    changeColor('orange');
}

function changeColor(color) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    var program = gl.getParameter(gl.CURRENT_PROGRAM);
    var colorLoc = gl.getUniformLocation(program, "uColor");
    var vPosition = gl.getAttribLocation(program, "vPosition");
    
    var colorValue;
    switch(color) {
        case 'teal':
            colorValue = [0.0, 0.5, 0.5, 1.0];  // 青色
            break;
        case 'brown':
            colorValue = [0.6, 0.3, 0.0, 1.0];  // 棕色
            break;
        default:
            colorValue = [1.0, 0.5, 0.0, 1.0];  // 橙色
    }
    
    gl.uniform4fv(colorLoc, colorValue);
    
    // 绘制三角形
    var triBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    
    // 绘制四边形
    var quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}
