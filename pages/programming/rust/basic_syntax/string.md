# 문자열

## `&str`
레퍼런스 스트링 타입은 데이터가 스택에 보관된다.
레퍼런스 스트링은 다음처럼 사용할 수 있다.

```rust
let x = "hello world";
```

레퍼런스 스트링타입은 레퍼런스의 특징을 고스란히 갖고 있다.
"hello world"라는 데이터를 레퍼런스로 소유권을 빌려왔기 때문에 다른곳에서 사용한다고 해도 어딘가에 있는 소유권이 소멸되지 않는다. 즉 변수가 소유권을 관리하지 않기 때문에 여러번 반복사용해도 문제가 없다. 

```rust
let x = "hello world";
println!("{x}");
println!("{x}");
---
hello world
hello world
```

타입을 알아보면 다음과 같이 표시된다.

![레퍼런스 스트링](./Pasted%20image%2020230720185143.png)

명시된 타입을 보면 사이즈와 주소값이 나타나는데, 주소값은 스택영역에서 관리한다.

## `String`
`std::string::String` : std library, string module, String structure

`String` 타입을 사용하는 방식은 다음 두가지 방식이 대표적이다.

```rust
let a = std::string::String::from("string");
let b = "string".to_string();
```

첫번째 방법은 `String` 구조체가 가진 `from` 트레이트를 이용해 문자열을 정의하는 방법이고 두번째 방법은 `to_string()`메서드를 통해 레퍼런스 스트링값을 `String으로` 변환시키는 방법이다. 구조체를 `use`하지 않고도 사용할 수 있어서 편리하다.

## 소유권의 위임 (새로운 변수에 할당, 매개변수로 사용)

String타입은 구조체에 의해 정의된 타입으로 힙영역에 존재하는 데이터다. ([3.primitive_types](3.primitive_types.md)) 또한 레퍼런스 타입이 아니기 때문에 할당 변수가 소유권을 갖게 된다. 변수의 소유권은 함수에게 위임하거나 다른 변수에게 위임하는 순간 제거된다.

소유권이 제거된다는 말은 실제로 이전 변수가 갖고있던 주소값과 주소값이 가리키는 스택의 주소값 모두가 메모리에서 삭제된다는 뜻이다. 


```rust
let x /* 주소값을 스택에 보관 소유권 없음 */ = "hello world";
let y = x; // 주소값 복사
println!("{x}"); // hello world
println!("{y}"); // hello world 모두 잘 출력

let a /* 주소값과 소유권을 스택에 보관 */ 
	= "string".to_string(); // 힙영역에 구조체로 저장되어있음
let b = a; // 주소값 복사, !소유권 위임!
println!("{a}"); // 데이터에 대한 소유권이 없기 때문에 오류
---> err
rustc: borrow of moved value: `a`
value borrowed here after move [E0382]
```

| 변수       | 변수의 주소값       | 스택                                 | 힙       |
| ---------- | ------------------- | ------------------------------------ | -------- |
| x : &str   | 0x001               | "hello world"                        |          |
| xr         | 0x002               | 0x001                                |          |
| y          | 0x003               | "hello world" (할당과 동시에 복사됨) |          |
| yr         | 0x004               | 0x002                                |          |
| a : String | 0x005 (양도시 삭제) | String{address: 0x22} (양도시 삭제)  | "string" |
| b : String | 0x006               | String{address: 0x22}                |          |

## size

`&str` 타입의 사이즈와 `String` 타입의 사이즈를 조사해보자

```rust
fn main() {
    use std::mem::{size_of, size_of_val};

    println!("{}", size_of::<String>()); // 24
    println!("{}", size_of::<&str>()); // 16
    println!("{}", size_of_val("hell")); // 4
		println!("{}", size_of_val("hello world hlsdhfkshdfklsadflksafdkhklhaksfdklklhaksdfkalsdhfklha")); // 64
}
```

사이즈 오브 함수를 이용해서 메모리 사이즈를 조사해보면 문자열의 사이즈는 가변사이즈라는것을 알 수 있다.

`String` 타입은 스택메모리에서 고정된 크기를 가진다고 한다. 그래서 sized type이라고 부르고 
`&str` 타입은 스택메모리에서 가변적 크기를 가진다고 하여 not sized type이라고 부른다고 한다.





