# 타우리

타우리는 프론트엔드 기술스택으로 모바일 데스크탑 등 크로스 플랫폼 앱의 제작을 도와주는 도구이다. 비슷한 플랫폼으로 electron을 볼 수 있는데, 타우리만의 장점이 몇가지 있다

> 러스트 기반이다

러스트는 널리 알려진대로 매우 빠르고 효율적인 언어다. 특히 러스트는 가비지컬렉터를 사용하지않고 코드에 의해 수동으로 관리되는데, 이때문에 개발자가 더욱 신경써야 하는만큼 메모리 사용이 효율적이다.

물론.. 타우리의 프론트엔드는 리액트나 스벨트등으로 브라우져를 이용하여 동작하므로 이부분에 대한 메모리절감은 없다.

> 프론트엔드 기술스택으로 데스크탑앱을 쉽게 만들수 있다

이게 핵심이다. 웹에서 프론트 개발만 하던 사람이 데스크탑앱을 제작할 수 있다. 모바일 버전은 아직 0.5.1버전으로 베타중이다. 

> 패키지 사이즈가 매우매우 작다.

타우리로 앱을 만들어 빌드한 결과가 아주 충격적이었다. 3메가바이트. 일렉트론으로 빌드하게 되면 150메가 바이트정도가 필요하다. 근본적인 차이가 있는데, 타우리는 브라우져를 패키지에 내장하지 않고 os의 기본브라우져를 빌려와서 사용하는 개념이다. 그렇다보니 패키지가 매우매우 작다.

## api

타우리를 사용하기 위해서는 프론트엔드의 코드를 SSR로 작성해서는 안된다. 그도 그럴게, 프론트엔드 서버를 굳이 운용할 필요가 없기 때문이다. CSR 혹은 SSG로 작성하게 하고, 서버사이드가 필요한 모든 요소들은 아래 타우리 API의 도움을 받아야 한다.

- [app](https://tauri.app/v1/api/js/app)
- [cli](https://tauri.app/v1/api/js/cli)
- [clipboard](https://tauri.app/v1/api/js/clipboard)
- [dialog](https://tauri.app/v1/api/js/dialog)
- [event](https://tauri.app/v1/api/js/event)
- [fs](api_fs.md)
- [globalShortcut](https://tauri.app/v1/api/js/globalShortcut)
- [http](https://tauri.app/v1/api/js/http)
- [mocks](https://tauri.app/v1/api/js/mocks)
- [notification](https://tauri.app/v1/api/js/notification)
- [os](https://tauri.app/v1/api/js/os)
- [path](https://tauri.app/v1/api/js/path)
- [process](https://tauri.app/v1/api/js/process)
- [shell](https://tauri.app/v1/api/js/shell)
- [tauri](https://tauri.app/v1/api/js/tauri)
- [updater](https://tauri.app/v1/api/js/updater)
- [window](https://tauri.app/v1/api/js/window)

필자는 데스크탑에서 문서관리 도구를 만들고 있기 때문에 핵심 api로 파일시스템을 사용하고 있다.

