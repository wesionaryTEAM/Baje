/* eslint-disable camelcase */
import DOMPurify from "isomorphic-dompurify";
import { twMerge } from "tailwind-merge";

// const notoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

function HTMLContentRender({
  content,
  className,
}: Readonly<{
  content: string | Node;
  className?: string;
}>) {
  return (
    <section
      className={twMerge(
        "editor-content whitespace-pre-wrap break-words",

        // notoSansJP.className,
        className
      )}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(content, {
          ALLOWED_ATTR: [
            "width",
            "height",
            "src",
            "frameborder",
            "allow",
            "style",
            "class",
            "allowfullscreen",
            "colspan",
            "rowspan",
            "id",
          ],
          ADD_ATTR: ["allowfullscreen", "href"],
          ADD_TAGS: ["iframe", "a", "code"],
        }),
      }}
    />
  );
}

export { HTMLContentRender };
