import { DefaultTheme, defineConfig, HeadConfig } from "vitepress";
import { SearchPlugin } from "vitepress-plugin-search";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/note-site/",
  lang: "zh-CN",
  title: "Gerry前端笔记官网",
  description: "Gerry的前端笔记官网 记录学习各个栈的过程与心得",
  head: head(),
  outDir: "dist",
  srcDir: "src",
  themeConfig: {
    search: search(),
    logo: "/logo.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: sidebar(),

    socialLinks: socialLinks(),

    footer: {
      message: `<a href="https://beian.miit.gov.cn/" target="_blank">京ICP备20016634号-2</a>`,
      copyright: `版权所有 © 2019-${new Date().getFullYear()} gerry`
    },

    notFound: {
      title: "页面没有找到",
      linkLabel: "返回首页",
      quote:
        "但如果你不改变你的方向，如果你继续寻找，你可能会在你前进的地方结束。",
      code: "404",
      linkText: "返回首页"
    },

    docFooter: {
      prev: "上一页",
      next: "下一页"
    },

    // https://vitepress.dev/zh/reference/default-theme-config#outline
    outline: {
      level: [2, 3],
      label: "页面导航"
    },

    editLink: {
      pattern: "https://github.com/gerrykf/note-site/tree/main/src/:path",
      text: "在 GitHub 上编辑此页面"
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short", // full
        timeStyle: "short" // medium
      }
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式"
  },
  vite: {
    // https://vitejs.dev/config/shared-options.html#publicdir
    publicDir: "../public",
    plugins: [
      SearchPlugin({
        previewLength: 80, // 这个选项决定了搜索结果预览的长度，单位是字符数
        buttonLabel: "搜索", // 这个选项可以用来改变搜索按钮的标签
        placeholder: "搜索文档", // 这个选项可以用来设置搜索输入框的占位符
        allow: [], // 这是一个数组，你可以在这个数组中指定哪些页面可以被搜索
        ignore: [] // 这也是一个数组，你可以在这个数组中指定哪些页面不被搜索
      })
    ]
  },
  markdown: {
    image: {
      lazyLoading: true
    }
  }
});

function head(): HeadConfig[] {
  return [
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/note-site/favicon-180x180.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/note-site/favicon-32x32.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/note-site/favicon-180x180.png"
      }
    ],
    ["link", { rel: "shortcut icon", href: "/note-site/favicon-16x16.ico" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }
    ],
    [
      "link",
      {
        href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
        rel: "stylesheet"
      }
    ],
    [
      "script",
      { async: "", src: "https://www.googletagmanager.com/gtag/js?id=TAG_ID" }
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'TAG_ID');`
    ]
  ];
}

function search(): SearchPlugin.Options {
  return {
    provider: "local",
    options: {
      miniSearch: {
        options: {},
        searchOptions: {
          fields: ["title", "headers", "content"]
        }
      },
      translations: {
        button: {
          buttonText: "搜索文档",
          buttonAriaLabel: "搜索文档"
        },
        modal: {
          noResultsText: "没有找到结果",
          resetButtonTitle: "清除搜索条件",
          footer: {
            selectText: "选择",
            navigateText: "切换",
            closeText: "关闭"
          }
        }
      }
    }
  };
}

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "首页", link: "/" },
    { text: "全部概览", link: "/latest" }
  ];
}

function sidebar(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "🧑‍💻 全部概览",
      link: "/latest"
    },
    {
      text: "💻 前端",
      collapsed: true,
      base: "/frontend/",
      items: [
        {
          text: "Vue",
          base: "/frontend/vue",
          collapsed: true,
          items: [
            {
              text: "入门",
              link: "/guide"
            },
            {
              text: "高阶",
              link: "/hign-order"
            }
          ]
        },
        {
          text: "Pinia",
          base: "/frontend/pinia",
          link: "/",
          collapsed: true,
          items: [
            {
              text: "指引",
              link: "/guide"
            }
          ]
        },
        {
          text: "React",
          base: "/frontend/react",
          collapsed: true,
          items: [
            {
              text: "入门",
              link: "/guide"
            },
            {
              text: "高阶",
              link: "/hign-order"
            }
          ]
        },
        {
          text: "Git",
          collapsed: true,
          base: "/frontend/git",
          items: [
            {
              text: "入门",
              link: "/guide"
            },
            {
              text: "部署github pages",
              link: "/deploy"
            }
          ]
        }
      ]
    },
    {
      text: "🗄️ 后端",
      collapsed: true,
      base: "/backend",
      items: [
        {
          text: "📦 Nodejs",
          link: "/nodejs/nodejs"
        }
      ]
    },
    // {
    //   text: "项目",
    //   collapsed: true,
    //   base: "/project",
    //   link: "/",
    //   items: [
    //     {
    //       text: "同策好房 ERP",
    //       link: "/tongchehaofang-ERP"
    //     }
    //   ]
    // },
    {
      text: "技术栈",
      base: "/stack/",
      items: [
        {
          text: "🗿 AI大模型",
          base: "/ai",
          collapsed: true,
          items: [
            {
              text: "DeepSeek",
              link: "/install-deepseek"
            }
          ]
        },
        {
          text: "📡 网络",
          base: "/stack/web",
          link: "/",
          collapsed: true,
          items: [
            {
              text: "📤 Http",
              link: "/http"
            },
            {
              text: "🌏 浏览器",
              base: "/stack/web",
              collapsed: true,
              items: [
                {
                  text: "浏览器页面处理流程",
                  link: "/浏览器页面处理流程"
                }
              ]
            },
            {
              text: "🌏 AJAX",
              base: "/stack/web/ajax",
              collapsed: true,
              items: [
                {
                  text: "fetch",
                  link: "/fetch"
                },
                {
                  text: "xhr",
                  link: "/xhr"
                }
              ]
            }
          ]
        }
      ]
    }
  ];
}

function socialLinks(): DefaultTheme.SocialLink[] {
  return [
    { icon: "github", link: "https://github.com/gerrykf/note-site" },
    { icon: "twitter", link: "https://twitter.com/vite_js" },
    { icon: "discord", link: "https://chat.vitejs.dev" }
  ];
}
