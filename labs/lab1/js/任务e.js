// colorful-triangle.js
"use strict";

var gl;
var vertexBuffer;
var aPosition;

window.onload = function init(){
    var canvas = document.getElementById("colorful-triangle-canvas");
    gl = canvas.getContext("webgl2");
    if(!gl){
        alert("WebGL isn't available");
    }

    // 初始三角形顶点数据（中等大小）
    var vertices = new Float32Array([
        -0.5, -0.5,  // 左下角顶点
        0.5, -0.5,   // 右下角顶点
        0.0,  0.5    // 顶部顶点
    ]);

    // 每个顶点不同的颜色（红、绿、蓝）
    var colors = new Float32Array([
        1.0, 0.0, 0.0, 1.0,  // 红色 - 左下角
        0.0, 1.0, 0.0, 1.0,  // 绿色 - 右下角  
        0.0, 0.0, 1.0, 1.0   // 蓝色 - 顶部
    ]);

    // 配置WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.9, 0.9, 0.9, 1.0);  // 浅灰色背景

    // 加载着色器程序
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // 设置顶点缓冲区
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    // 设置颜色缓冲区
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    var aColor = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aColor);

    render();
}

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// 改变三角形大小的函数
function changeTriangleSize(size) {
    var vertices = new Float32Array([
        -size, -size,  // 左下角
        size, -size,   // 右下角
        0.0,  size     // 顶部
    ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    
    render();
}
