"use strict";

var gl;
var canvas;

window.onload = function init() {
    canvas = document.getElementById("task-a-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("WebGL 2.0 isn't available");
        return;
    }

    // 配置WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // 初始化着色器
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // 三角形顶点数据
    var vertices = new Float32Array([
        -0.5, 0.5,    // 左上
        -1.0, -0.5,   // 左下  
        0.0, -0.5     // 右下
    ]);

    // 创建缓冲区
    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // 关联着色器变量
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // 初始绘制红色三角形
    changeColor('red');
}

function changeColor(color) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    var program = gl.getParameter(gl.CURRENT_PROGRAM);
    var colorLoc = gl.getUniformLocation(program, "uColor");
    
    var colorValue;
    switch(color) {
        case 'blue':
            colorValue = [0.0, 0.0, 1.0, 1.0];  // 蓝色
            break;
        case 'green':
            colorValue = [0.0, 1.0, 0.0, 1.0];  // 绿色
            break;
        default:
            colorValue = [1.0, 0.0, 0.0, 1.0];  // 红色（原始）
    }
    
    gl.uniform4fv(colorLoc, colorValue);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}
