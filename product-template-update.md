# Product Template Update Instructions

To enable image zoom functionality on all product detail pages, apply these changes to each product page:

1. Add this line in the `<head>` section, after the existing stylesheet links:
```html
<link rel="stylesheet" href="image-zoom.css">
```

2. Add this line before the closing `</body>` tag, after the other script tags:
```html
<script src="image-zoom.js"></script>
```

For example, the head section should look like:
```html
<head>
    <title>Virtuve n' Veļa - Product Name</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="veikals.css">
    <link rel="stylesheet" href="product-styles.css">
    <link rel="stylesheet" href="image-zoom.css">
</head>
```

And the end of the body section should look like:
```html
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <script src="veikals.js"></script>
    <script src="product-scripts.js"></script>
    <script src="image-zoom.js"></script>
</body>
```
