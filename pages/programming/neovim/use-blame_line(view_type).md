# `shift` + `k` 타입보기

여타 ide의 경우 추론된 혹은 명시된 타입을 보기위해서는 변수 위에 마우스를 올리면 나타난다. 

![vscode에서 타입보기](use-blame_line(view_type)1.png)

빔에서는 일반적으로 마우스를 사용하지 않기 때문에 키보드 맵핑을 통해 이를 해결하는데
루나빔의 경우 타입이나 함수 시그니처를 보기위해서는 `g` + `k` 를 입력해주면 된다.

![루나빔의 타입보기](use-blame_line(view_type)2.png)

이 명령어에 대한 설정은 
~/.local/share/lunarvim/lvim/lua/lvim/core/which-key/lua 에 설정되어있다.
![gl설정값](use-blame_line(view_type)3.png)

설정파일에 접근하기가 불편하니 다음과 같이 바로가기를 만들어두는 편이 좋다.

![lvim설정바로가기](use-blame_line(view_type)4.png)

Link를 만드는 방법은 다음과 같다.

```shell
> ln -s ~/.local/share/lunarvim/lvim/lua/lvim ~/.config/lvim-origin
```
