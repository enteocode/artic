import typescript from '@rollup/plugin-typescript';
import run from '@rollup/plugin-run';
import terser from '@rollup/plugin-terser';

/*
 * Build Process (Rollup)
 *
 * Deployment process with Tree-Shaking and code optimization
 *
 * @private
 * @author Ádám Székely (https://www.linkedin.com/in/enteocode/)
 */

// Cache

const cache = Object.create(null);

// Environment

const isProduction = process.env.NODE_ENV === 'production';

// Helpers

/**
 * @private
 */
const getPlugins = (isProduction) => {
    const plugins = [typescript()];

    if (isProduction) {
        plugins.push(terser({ keep_classnames: true, toplevel: true }));
    } else {
        plugins.push(run({ args: ['--enable-source-maps'] }));
    }
    return plugins;
};

/**
 * @private
 */
const getTarget = (isProduction) => {
    return isProduction ? './dist/app.js' : './dist/dev.js';
};

// Configuration

export default {
    input: './src/main.ts',
    output: {
        file: getTarget(isProduction),
        format: 'es',
        sourcemapExcludeSources: true,
        sourcemap: true,
        validate: true
    },
    external: [
        /^@nestjs\//,
        /^@keyv\//,
        /^@fastify\//,

        'helmet',
        'class-transformer',
        'class-validator',
        'typeorm',
        'email-addresses',
        'cacheable',
        'bcrypt',
        'fastify',
        'read-pkg',
        'uuid',
        'rxjs',
        'rxjs/operators'
    ],
    watch: {
        buildDelay: 600
    },
    plugins: getPlugins(isProduction),
    cache
};
