import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { Head } from "./components/Head";
import { useNextSeoProps } from "./config/useNextSeoProps";
import { Logo } from "./components/Logo";

const config:DocsThemeConfig = {
  logo: Logo,
  project: {
    link: 'not yet'
  },
  docsRepositoryBase: 'not yet',
  footer: {
    text: "made by wis"
  },
  head: Head,
  feedback: {
    content: () => <>Question? Give me feedback →</>,
    labels: "feedback",
  },
  useNextSeoProps,
  i18n: [],
}

export default config;
