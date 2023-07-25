# 커스텀 스니펫 사용하기

빔을 쓰다보면 스니펫 정도는 만들어서 쓸 수 있어야한다.

스니펫 플러그인이 여럿있겠지만, 루나빔에 내장된 스니펫 플러그인을 사용하도록 하자.

루나빔에서 사용하는 내장 스니펫 플러그인은 luasnip이라는 이름이다.
이 플러그인은 vscode에서 사용되는 모든 스니펫을 다운로드해서 가져오고 사용할 수 있도록 도와준다. 

또 이 방식에 따라 커스텀 스니펫 또한 만들어 사용할 수 있다. 

```lua filename="~/.config/lvim/config.lua"
require("luasnip/loaders/from_vscode").load { paths = { "~/.config/lvim/snippets/my-snippets" } }
```

require를 보면 알겠지만, 해당 스니펫은 vscode스니펫 설정을 로드하는 방식이다.
해당 스니펫을 제작할때는 두가지 파일이 필요하다.

```json filename="~/.config/lvim/snippets/my-snippets/package.json"
{
  "name": "wisnips",
  "author": "wis",
  "engines": {
    "vscode": "^1.11.0"
  },
  "contributes": {
    "snippets": [
      {
        "language": ["svelte"],
        "path": "./svelte.json"
      }
    ]
  }
}
```

```json
{
  "console log input": {
    "prefix": "clg",
    "body": "console.log(${0})",
    "description": "wisnip : console.log()"
  }
}
```

> 바디에 `${0}` 이 있는걸 확인할 수 있는데 스니펫불러오면 이 곳에 커서가 포커싱된다. 이후 `${1}` `${2}` `${3}` 으로 `탭`키 누르면 자동으로 다음 항목으로 옮겨지기 때문에 유용하게 사용할 수 있다.

두 파일 모두 json파일로 구성되어져있기 때문에 제이슨 형식에서 벗어나면 파싱에러를 일으키며 동작을 안할수도 있다. 특히 컴마`,` 사용에 주의하도록하자.
