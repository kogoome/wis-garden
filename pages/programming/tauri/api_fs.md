# file system

타우리의 파일시스템을 사용하려면 타우리 설정파일에 사용할 api를 명시해줘야 한다. 

```json filename="src-tauri/tauri.conf.json"
{
  "tauri": {
    "allowlist": {
      "fs": {
        "all": true, // 사용여부 true
        "readFile": true,
        "writeFile": true,
        "readDir": true,
        "copyFile": true,
        "createDir": true,
        "removeDir": true,
        "removeFile": true,
        "renameFile": true,
        "exists": true,
				"scope": ["$DOCUMENT/**"] // 접근할 디렉터리를 지정
      }
    }
  }
}
```

## `scope` 디렉터리 접근성

`"scope": ["$DOCUMENT/**"]`

타우리는 사용자의 pc를 보호하기 위해 pc내 절대경로나 상위디렉터리 (../) 를 허용하지 않는다. 읽기 또는 쓰기가 가능한 디렉터리 스코프를 성정해줄때 위 옵션을 사용한다.

문서폴더 외에 가능한 스코프는 [여기](https://tauri.app/v1/api/js/fs#security)를 참고하자.

## `readTextFile` 

읽기 api들이 몇가지 있지만 문서작업시 필요한 데이터는 역시 텍스트 데이터다. 텍스트 읽기 함수의 시그니처와 사용예제는 다음과 같다.

```ts
readTextFile(filePath: string, options?: FsOptions): Promise<string>
```

```ts
import { readTextFile, BaseDirectory } from '@tauri-apps/api/fs';  
const contents = await readTextFile(
		'path/file.json', 
		{	dir: BaseDirectory.Document }
	); // utf-8
```

스코프에서 설정한 폴더는 `BaseDirectory` 이넘를 통해 접근가능하다.

## `writeTextFile`

쓰기 api도 읽기와 별반 다르지 않다.

```ts
writeTextFile(path: string, contents: string, options?: FsOptions): Promise<void>
```

```js
import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';
await writeTextFile(
	'app.conf', 
	'file contents', 
	{ dir: BaseDirectory.Document }
);
```

이쯤되면 패턴이 명확해서 더이상의 설명은 필요없을듯 하다

## `removeFile`

```ts
import { removeFile, BaseDirectory } from '@tauri-apps/api/fs';
await removeFile('app.conf', { dir: BaseDirectory.AppConfig });
```

## `readDir`

```ts
import { readDir, BaseDirectory } from '@tauri-apps/api/fs';

const entries = await readDir('users', { dir: BaseDirectory.AppData, recursive: true }); // 재귀함수로 하위 폴더와 디렉터리를 모두 가져온다.

function processEntries(entries) {
  for (const entry of entries) {
    console.log(`Entry: ${entry.path}`);
    if (entry.children) {
      processEntries(entry.children)
    }
  }
}
```

## `removeDir`

```ts 
import { removeDir, BaseDirectory } from '@tauri-apps/api/fs';
await removeDir('users', { dir: BaseDirectory.AppData });
```


바이너리 파일 읽기 쓰기도 있지만 생략 
