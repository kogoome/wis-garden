// import { error } from "console";
import type { PageLoad } from "./$types";

export const load = (({params}) =>{
  if (!params.title) return { title: 'title is empty', content: '' }
  // get docs
  const title = 'hello world';
  const content = 'this is content'
  // throw error(404, 'Not found');
  

  return {title, content}
}) satisfies PageLoad;


export const prerender = true
