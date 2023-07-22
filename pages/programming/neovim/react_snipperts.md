# 리액트 html 스니펫 활성화하기

루나빔을 처음 설치하고 리액트를 작성하면 얼마 지나지 않아 크게 당황하고 마는데, 이유는 돔 태그들에 대한 스니펫이 작동하지 않기 때문이다. 루나빔의 레이지 플러그인은 파일 확장자를 보고 자동적으로 언어관련 모듈을 설치해서 lsp나 코드하이라이팅을 지원해주는데, 리액트파일을 자바스크립트 파일로 인식한 나머지 리액트 스니펫을 작동시켜주지 않는듯하다. 

하지만 이미 내장플러그인들로 충분히 기능사용이 가능하기 때문에 약간의 설정만 변경해주면 무리없이 사용이 가능하다.

`~/.config/lvim/config.lua` 파일을 열고 다음과 같은 설정값을 입력해주고 에디터를 리부트 시켜주자.

```lua filename="~/.config/lvim/config.lua"

local lspconfig = require('lspconfig')
local configs = require('lspconfig/configs')
local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities.textDocument.completion.completionItem.snippetSupport = true

lspconfig.emmet_ls.setup({
    capabilities = capabilities,
    filetypes = { "css", "eruby", "html", "javascript", "javascriptreact", "less", "sass", "scss", "svelte", "pug", "typescriptreact", "vue" },
    init_options = {
      html = {
        options = {
          ["bem.enabled"] = true,
        },
      },
    }
})

```

이제 스니펫이 잘 동작할 것이다.
