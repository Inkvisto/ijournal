import { Post } from "../api/post/post.types";
const _MS_PER_MINUTES = 1000 * 60
const _MS_PER_HOURS = 1000 * 60 * 60;
const _MS_PER_DAY = 1000 * 60 * 60 * 24;


export function dateDiffInMinutes(a:Date, b:Date) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(),a.getHours(),a.getMinutes());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(),b.getHours(),b.getMinutes());

  return Math.floor((utc2 - utc1) / _MS_PER_MINUTES);
}


// a and b are javascript Date objects
export function dateDiffInHours(a:Date, b:Date) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(),a.getHours());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(),b.getHours());

  return Math.floor((utc2 - utc1) / _MS_PER_HOURS);
}
export function dateDiffInDays(a:Date, b:Date) {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }


export const createdAtDifference = ({createdAt}:any) => {

  const a = new Date(createdAt);
  const  b = new Date();



  return dateDiffInHours(a, b)< 24 ? 
    (dateDiffInHours(a, b) !== 0 ? dateDiffInHours(a, b)+' hours' : dateDiffInMinutes(a, b)+' minutes') : 
    (dateDiffInDays(a,b)+' days')
                
}