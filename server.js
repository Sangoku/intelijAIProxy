import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";
dotenv.config();

const app = express();

if (!process.env.API_KEY || !process.env.TARGET_URL) {
    console.error("Missing environment variables. Please ensure .env file is correctly configured.");
    const envFile = require('fs').readFileSync('.env');
    const envVars = envFile.toString().split('\n').reduce((acc, line) => {
        if (line.trim()) {
            const [key, value] = line.split('=');
            acc[key] = value;
        }
        return acc;
    }, {});

    console.log('Loaded environment variables:', envVars);
    if (!envVars.API_KEY || !envVars.TARGET_URL) {
        console.error("Missing environment variables. Please ensure .env file is correctly configured.");
        process.exit(1);
    }
    process.env.API_KEY = envVars.API_KEY;
    process.env.TARGET_URL = envVars.TARGET_URL;
}

app.use("/", createProxyMiddleware({
    target: process.env.TARGET_URL,
    changeOrigin: true,
    secure: true,
    logLevel: "debug",
    headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
    },
    onProxyReq: (proxyReq, req) => {
        console.log(`[PROXY] ${req.method} ${req.url}`);
    },
    onProxyRes: (proxyRes, req) => {
        console.log(`[PROXY] Response ${proxyRes.statusCode} for ${req.url}`);
    },
    onError: (err, req, res) => {
        console.error("[PROXY] Error:", err);
        res.status(500).json({ error: "Proxy failed", message: err.message });
    },
}));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
    console.log(`API_KEY: ${process.env.API_KEY}`);
    console.log(`TARGET_URL: ${process.env.TARGET_URL}`);
});
