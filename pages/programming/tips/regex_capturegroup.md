# 정규표현식 캡쳐그룹

```js
const relationString = `
{
  "list": [
    {
      "fromId": "test",
      "fromDirect": "b",
      "toId": "test2",
      "toDirect": "t"
    },
    {
      "fromId": "test2",
      "fromDirect": "b",
      "toId": "test4",
      "toDirect": "t"
    },
    {
      "fromId": "test",
      "fromDirect": "r",
      "toId": "test3",
      "toDirect": "l"
    }
  ],
  "hash": {
    "test+test2": true,
    "test2+test4": true,
    "test+test3": true
  }
}
`
```

위와 같은 데이터가 있을 때 `test` 라는 문자열을 `test1` 으로 변경한다고 가정해보자.
이때 이 데이터의 위치를 일일히 찾아서 수정하자니 코드가 복잡해진다. 해당 문서는 로컬파일로 저장되어있기때문에 어짜피 읽을때 문자열데이터로 읽어오니, 문자열 그 자체에서 변경할 수 있는 방법이 필요하다. 이때 그냥 자바스크립트의 replaceAll('test', 'test1') 함수를 사용한다면 test2 => test12 로 변경되는 불상사가 일어나게 된다.

이럴때 정규표현식의 캡쳐그룹개념의 도움을 받으면 쉽게 수정할 수 있다.

수정하려는 텍스트의 주변을 살펴보면 `"` 또는 `+` 가 붙어있는것을 알 수 있는데, 이 특수문자를 캡쳐그룹으로 지정하고, 해당 텍스트를 변경한후 캡쳐그룹을 수정한텍스트 옆에 복원시켜주는 방식이다.

사용된 정규표현식은 다음과 같다.

```js 
const regex =new RegExp(`(["+])${beforeId}(["+])`, 'g');
const newRelationString = relationString.replaceAll(regex, `$1${afterId}$2`)
```

캡쳐그룹은 위와같이 `[ ]` 대괄호를 이용하여 사용한다. 대괄호안의 문자는 캡쳐그룹에 포함될 문자를 의미하며, 순서대로 1그룹 2그룹으로 지정된다. 복원할 캡쳐그룹은 $1 $2 표현을 통해 복원가능하다.
