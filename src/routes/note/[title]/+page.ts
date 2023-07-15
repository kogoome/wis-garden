// import { error } from "console";
import type { PageLoad } from "./$types";

export const load = ( async ({params}) =>{
  if (!params.title) return { title: 'title is empty', content: '' }
  const title = params.title
  const note = await import(`../${title}.md`)
  const Content = note.default

  return {title, Content}
}) satisfies PageLoad;


export const prerender = true
