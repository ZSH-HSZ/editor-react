# Nginx Location 匹配规则速查（One Page）

> 用于快速确认 **location 匹配先后顺序 / 权重规则**，避免配置踩坑。

---
## 一、优先级顺序（从高到低）

1. `location = /uri`    **精确匹配**
2. `location ^~ /uri/`   **高优先级前缀**
3. `location ~ /regex/`  
   `location ~* /regex/`  **正则匹配（按书写顺序）**
4. `location /uri/`    **普通前缀（最长匹配）**
5. `location /`      **兜底匹配**
---
## 二、实际匹配流程

1. 先匹配 **`=` 精确匹配**
2. 找到 **最长的前缀匹配**
3. 若该前缀带 `^~` → **直接使用，跳过正则**
4. 依次匹配 **正则 location（按顺序）**
5. 若无正则命中 → 使用前缀匹配结果

---

## 三、核心规则速记

- **`=`**：命中即停（最高）
- **`^~`**：命中即停（阻断正则）
- **正则**：只看书写顺序
- **前缀**：选最长
- **`/`**：最后兜底

---

## 四、常见安全写法

```nginx
location = /health { return 200; }

location ^~ /static/ {
    root /data/www;
}

location ^~ /api/ {
    proxy_pass http://backend;
}

location ~ \.php$ {
    proxy_pass http://php;
}

location / {
    proxy_pass http://frontend;
}
