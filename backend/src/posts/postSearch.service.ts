import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { PostModel } from "../models/post.model";
import { PostSearchBody, PostSearchResult } from "../models/interfaces/postSearchBody.interface";

@Injectable()
export default class SearchService{
    index = 'posts'
    constructor(
        private readonly elasticsearchService:ElasticsearchService
    ){}
    

    async indexPost(post:PostModel) {
        return this.elasticsearchService.index<PostSearchBody>({
            index:this.index,
            document: {
                id:post.id,
                title:post.title,
                content:post.content,
                authorId:post.author.id
            }
        })
    }

    async search(text:string) {
        const  body  = await this.elasticsearchService.search<PostSearchResult>({
            index:this.index,
                query: {
                    multi_match: {
                        query: text,
                        fields: ['title','content']
                    }
                }
        })
        const hits = body.hits.hits;
        return hits.map((item:any)=>item._source)
    }

    async update(post:PostModel) {
       

        const newBody:PostSearchBody ={
           
            id:post.id,
            title:post.title,
            content:post.content,
            authorId:post.authorId
        }
        //here is error with author.id typing
          
        const script = Object.entries(newBody).reduce((result, [key, value]) => {
            return `${result} ctx._source.${key}='${value}';`;
          }, '');

          
     
        
        return this.elasticsearchService.updateByQuery({
            index:this.index,
            body:{
                query:{
                    match:{
                        id:post.id,
                    }
                },
                script:{
                    source:script,
                    lang:"painless"            
                }
            }
        })
    }

    async remove(id:string){
        this.elasticsearchService.deleteByQuery({
            index:this.index,
            body: {
                query: {
                    match: {
                        id:id
                    }
                }
            }
        })
    }
}