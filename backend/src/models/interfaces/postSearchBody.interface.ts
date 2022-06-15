

export interface PostSearchResult {
    hits:{
        total:number;
        hits:Array<{
            _source:PostSearchBody
        }>;
    }
}

export interface PostSearchBody {
    id: string,
    title: string,
    content: string,
    authorId:string
  }