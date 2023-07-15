// import { error } from "console";
import type { PageLoad } from "./$types";

export const load = ( async ({params}) =>{
  if (!params.title) return { title: 'title is empty', content: '' }
  
  const note = await import(`../${params.title}.md`)
  const content = note.default
  

  return {title: params.title, content}
}) satisfies PageLoad;


export const prerender = true
