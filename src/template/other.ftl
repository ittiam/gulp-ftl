
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="address=no">
    <title>Gulp Mock Server</title>
    <link rel="stylesheet" type="text/css" href="/css/index.css">
</head>
<#escape x as x?html>
<body>
    <div class="app" id="app">
        <ul class="list">
            <li>姓名: ${other.name}</li>
            <li>性别: ${other.gender}</li>
            <li>年龄: ${other.age}</li>
            <li>地址: ${other.address}</li>
        </ul>
        <div>
            <button type="button" class="btn">点我点我点我</button>
        </div>
    </div>

    <script src="/js/zepto.js"></script>
    <script src="/js/index.js"></script>
</body>
</#escape>
</html>
