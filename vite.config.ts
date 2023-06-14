import {defineConfig} from "vite";
import typescript from "@rollup/plugin-typescript";
import {typescriptPaths} from "rollup-plugin-typescript-paths";

const purgecss = require('@fullhuman/postcss-purgecss')
import path from "path";

export default defineConfig({
    plugins: [],
    css: {
        postcss: {
            plugins: [
                require('autoprefixer'),
                purgecss({
                    content: ['./src/**/*.ts'],
                    css: ['./src/style.css']
                })
            ]
        }
    },
    resolve: {
        alias: [
            {
                find: "~",
                replacement: path.resolve(__dirname, "./src"),
            },
        ],
    },
    server: {
        port: 3000,
    },
    build: {
        manifest: true,
        minify: true,
        reportCompressedSize: true,
        lib: {
            entry: path.resolve(__dirname, "src/main.ts"),
            fileName: "main",
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: [],
            plugins: [
                // @ts-ignore
                typescriptPaths({
                    preserveExtensions: true,
                }),
                // @ts-ignore
                typescript({
                    sourceMap: false,
                    declaration: true,
                    outDir: "dist",
                }),
            ],
        },
    },
});