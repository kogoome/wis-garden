import Head from "next/head";
import { NextraThemeLayoutProps } from "nextra";

export default function Layout({children, pageOpts}: NextraThemeLayoutProps) {
  const { title, frontMatter, headings } = pageOpts
  return (
    <div>
      <Head>
        <title>{title}</title>

      </Head>
      <h1>My Theme</h1>
      Table of Content:
      <ul>
        {headings.map(h=>(
          <li key={h.value}>{h.value}</li>
        ))}
      </ul>
      <div style={{border: '1px, solid'}}>{children}</div>
    </div>
  )
}
