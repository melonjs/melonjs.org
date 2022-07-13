---
layout: ../../layouts/MDLayout.astro
---

### **1. Prevent the webview from moving on a swipe :**

Simply add the following code to your project (note that this require to register on the window document itself and not the canvas)

```js
if (me.sys.touch) {
    /* This code prevents the webview from moving on a swipe */
    preventDefaultScroll = function (e) {
        e.preventDefault()
        window.scroll(0, 0)
        return false
    }
    window.document.addEventListener('touchmove', preventDefaultScroll, false)
}
```

### **2. Hide the address bar on mobile devices :**

Simply add the following code to your project (note that this require to register on the window document itself and not the canvas)

```js
if (me.sys.touch) {
    window.addEventListener('load', function () {
        setTimeout(function () {
            window.scrollTo(0, 1)
        }, 0)
    })
}
```
