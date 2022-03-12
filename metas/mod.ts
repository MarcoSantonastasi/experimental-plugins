import { merge } from "lume/core/utils.ts";

import type { Page, Site } from "lume/core.ts";
import type { HTMLDocument } from "lume/deps/dom.ts";

export interface Options {
  /** The list extensions this plugin applies to */
  extensions: string[];

  /** The key name for the transformations definitions */
  name: string;

  /** Default values */
  defaults: Partial<MetaData>;
}

export interface MetaData {
  /** The name of the site */
  site: string;

  /** The title of the page */
  title: string;

  /** The page language */
  lang: string;

  /** The description of the page */
  description: string;

  /** The image of the page */
  image: string;

  /** The icon of the site */
  icon: string;

  /** The page keywords */
  keywords: string[];

  /** The twitter username */
  twitter: string;

  /** The color theme */
  color: string;
}

const defaults: Options = {
  extensions: [".html"],
  name: "metas",
  defaults: {},
};

/** A plugin to insert meta tags for SEO and social media */
export default function (userOptions?: Partial<Options>) {
  const options = merge(defaults, userOptions);

  return (site: Site) => {
    site.process(options.extensions, metas);

    function metas(page: Page) {
      const pageMetas = page.data[options.name] as MetaData | undefined;

      if (!pageMetas || !page.document) {
        return;
      }

      const { document } = page;
      const metas: Partial<MetaData> = {
        ...options.defaults,
        ...pageMetas,
      };

      const url = site.url(page.data.url as string, true);
      const icon = metas.icon ? site.url(metas.icon, true) : undefined;
      const image = metas.image ? site.url(metas.image, true) : undefined;

      // Open graph
      addMeta(document, "property", "og:type", "website");
      addMeta(document, "property", "og:site_name", metas.site);
      addMeta(document, "property", "og:locale", metas.lang);
      addMeta(document, "property", "og:title", metas.title, 65);
      addMeta(document, "property", "og:description", metas.description, 155);
      addMeta(document, "property", "og:url", url);
      addMeta(document, "property", "og:image", image || icon);

      // Twitter cards
      addMeta(document, "name", "twitter:title", metas.title, 65);
      addMeta(document, "name", "twitter:description", metas.description, 200);
      addMeta(
        document,
        "name",
        "twitter:card",
        image ? "summary_large_image" : "summary",
      );
      addMeta(document, "name", "twitter:image", image || icon);
      addMeta(document, "name", "twitter:site", metas.twitter);

      // Schema.org
      addMeta(document, "itemprop", "name", metas.title);
      addMeta(document, "itemprop", "description", metas.description, 155);
      addMeta(document, "itemprop", "image", image || icon);

      // SEO
      addMeta(document, "name", "description", metas.description, 155);
      addMeta(document, "name", "keywords", metas.keywords?.join(", "));

      // Misc
      addMeta(document, "name", "theme-color", metas.color);
    }
  };
}

function addMeta(
  document: HTMLDocument,
  propName: string,
  propValue: string,
  content?: string,
  limit?: number,
) {
  if (!content) {
    return;
  }

  if (limit && content.length > limit) {
    content = content.substr(0, limit - 3) + "...";
  }

  const meta = document.createElement("meta");
  meta.setAttribute(propName, propValue);
  meta.setAttribute("content", content);
  document.head.appendChild(meta);
}
