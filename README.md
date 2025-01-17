# experimental-plugins

A repo to test and experiment with plugins for Lume

## Remark

Use [Remark](https://github.com/remarkjs/remark) and
[Rehype](https://github.com/rehypejs/rehype) as an alternative markdown
processor.

## NanoJSX

To use [Nano JSX](https://nanojsx.io/) to render JSX pages.

## i18n

To use [i18next](https://www.i18next.com/) library for translations.

## Minify

Minify HTML, CSS, JS and JSON files using
[minifier](https://github.com/sno2/minifier).

- To minify JS, it's recommended to use the plugin Terser, already provided by
  Lume.
- To minify CSS, it's recommended to use the plugin ParcelCSS, already provided
  by Lume.

## MDX

Use .mdx format to build pages.

## Jimp

To transform image files using [Jimp](https://github.com/oliver-moran/jimp).

## Google Analytics

Middleware to integrate Google Analytics in backend, using
[g_a](https://deno.land/x/g_a@0.1.2/mod.ts)

## Sitemap

To generate a sitemap.xml from html files after build.

- Maybe needs to be tested with various URL plugins enabled (I used it with
  `slugify_urls` enabled)

## Wwww

Middleware to add or remove the `www.` subdomain.
