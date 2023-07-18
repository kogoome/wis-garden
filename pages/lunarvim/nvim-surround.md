# [ nvim surround plugin ](https://github.com/kylechui/nvim-surround)

빔의 기본설정에는 브라켓을 씌우는 로직이 없어서 일일히 찾아가서 씌워줘야 한다. 
vscode나 다른 여타 IDE 를 사용하면 브라켓을 씌울 글자를 셀렉트하고
브라켓을 입력하면 바로 입력된다. 키보드 입력은shift opt arrowkey [ 
이렇게 네번의 키입력이 있을때 작동한다.

이번에 소개하는 플러그인은 해당 위치를 직접 찾아가서 브라켓을 씌우지 않고
다른 IDE 에서 사용하듯이 적당한 키입력을 통해 브라켓을 씌워주는 플러그인이다.

## 설치
설치법은 깃헙페이지에서 제시한대로 다음과 같다.

```lua filename="init.lua"
lvim.plugins = {
  {
    "kylechui/nvim-surround",
    version = "*", -- Use for stability; omit to use `main` branch for the latest features
    event = "VeryLazy",
    config = function()
        require("nvim-surround").setup({
            -- Configuration here, or leave empty to use defaults
        })
    end
  }
}
```
/.config/lvim/init.lua 파일을 열고 위 설정값을 입력한 후 빔을 실행하면 플러그인 매니저인 Lazy가 자동으로 설치를 해준다.

## 사용법
이후 메뉴얼에서 소개하는 사용방법을 통해 브라켓 씌우기, 브라켓 변형하기등의 
기능을 사용할 수 있다.

```help
    Old text                    Command         New text
--------------------------------------------------------------------------------
    surr*ound_words             ysiw)           (surround_words)
    *make strings               ys$"            "make strings"
    [delete ar*ound me!]        ds]             delete around me!
    remove <b>HTML t*ags</b>    dst             remove HTML tags
    'change quot*es'            cs'"            "change quotes"
    <b>or tag* types</b>        csth1<CR>       <h1>or tag types</h1>
    delete(functi*on calls)     dsf             function calls
```



