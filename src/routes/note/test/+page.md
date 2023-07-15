---
title: "welcome to test md"
subtitle: "스벨트로 마크다운 블로그 하기"
date: "2023-7-15"
---

<script>
    import NoteLayout from '../noteLayoutComponent.svelte'
</script>

<NoteLayout {title} {subtitle} {date} >

typography

# head 1 {title}

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur vel incidunt excepturi. Facilis totam amet odit eum. Sed obcaecati, illum sit totam debitis, corporis, repudiandae amet commodi placeat minima iste.
Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur vel incidunt excepturi. Facilis totam amet odit eum. Sed obcaecati, illum sit totam debitis, corporis, repudiandae amet commodi placeat minima iste.

## head 2

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur vel incidunt excepturi. Facilis totam amet odit eum. Sed obcaecati, illum sit totam debitis, corporis, repudiandae amet commodi placeat minima iste.

### head 3 lists

asdfsadfasdfsadf

- list test
  - indent list
    - deps 2
  - asdasd
  - asdasd
- asda
  - asdasd

1. ordered list
   1. asdf
   2. asdf
2. aadsf
   1. sdf
   2. asd
      1. asd

### links

[internal link](/note)
[external google](https://www.google.com)

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur vel incidunt excepturi. Facilis totam amet odit eum. Sed obcaecati, illum sit totam debitis, corporis, repudiandae amet commodi placeat minima iste.

### code block

```js
const a = () => {
	return 1;
};
```
- need highlight

### image not work yet!
 
### checkbox

- [ ] it work?
 
</NoteLayout>
