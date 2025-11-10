const express = require('express');

// /workspaces/basic-express/index.js
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    const msg = req.query.msg ? String(req.query.msg) : 'Hello from server';
    res.send(`<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Alert Demo</title>
        <style>
            body { font-family: Arial, sans-serif; padding: 2rem; }
            button { padding: 0.5rem 1rem; font-size: 1rem; }
        </style>
    </head>
    <body>
        <h1>Alert Function Demo</h1>
        <p>Click the button to show an alert, or visit <code>/?msg=Your+message</code> to auto-show.</p>
        <button onclick="showAlert('This is an alert')">Show alert</button>

        <script>
            // fungsi to show alert
            function showAlert(message) {
                // basic browser alert; replace with custom UI if needed
                alert(String(message));
            }

            // auto-show if ?msg= is provided
            (function() {
                const params = new URLSearchParams(location.search);
                const auto = params.get('msg');
                if (auto) showAlert(auto);
            })();
        </script>
    </body>
</html>`);
});

app.listen(PORT, () => {
    console.log(\`Server running on http://localhost:\${PORT}\`);
});