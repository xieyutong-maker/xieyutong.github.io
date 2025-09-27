// trisquare-different-colors.js
"use strict";

var gl;

window.onload = function init(){
    var canvas = document.getElementById("trisquare-canvas");
    gl = canvas.getContext("webgl2");
    if(!gl){
        alert("WebGL isn't available");
    }

    // 顶点数据：三角形 + 四边形
    var vertices = new Float32Array([
        // 三角形 (左侧)
        -0.8,  0.0,
        -1.0, -0.8,
        -0.6, -0.8,
        
        // 四边形 (右侧)
        0.2, -0.8,
        0.8, -0.8,
        0.8,  0.0,
        0.2,  0.0
    ]);

    // 颜色数据：三角形绿色，四边形蓝色
    var colors = new Float32Array([
        // 三角形 - 绿色
        0.0, 1.0, 0.0, 1.0,  // 顶点1
        0.0, 1.0, 0.0, 1.0,  // 顶点2  
        0.0, 1.0, 0.0, 1.0,  // 顶点3
        
        // 四边形 - 蓝色
        0.0, 0.0, 1.0, 1.0,  // 顶点1
        0.0, 0.0, 1.0, 1.0,  // 顶点2
        0.0, 0.0, 1.0, 1.0,  // 顶点3
        0.0, 0.0, 1.0, 1.0   // 顶点4
    ]);

    // 配置WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    // 加载着色器程序
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // 创建顶点缓冲区
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    // 创建颜色缓冲区
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
    
    // 绘制三角形 (前3个顶点)
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    
    // 绘制四边形 (后4个顶点，使用TRIANGLE_FAN)
    gl.drawArrays(gl.TRIANGLE_FAN, 3, 4);
}
