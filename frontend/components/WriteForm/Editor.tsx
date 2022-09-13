import React,{useEffect} from "react";
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header'
import { Api } from "../../utils/api";
const  ImageTool = require('@editorjs/image')
const LinkTool = require('@editorjs/link');
const List = require('@editorjs/list')
const RawTool = require('@editorjs/raw');
const Quote = require('@editorjs/quote');
const Delimiter = require('@editorjs/delimiter');
const Personality = require('@editorjs/personality');
const AttachesTool = require('@editorjs/attaches');
const Paragraph = require('@editorjs/paragraph');

import * as sharp from 'sharp'

interface EditorProps {
  onChange:(blocks:OutputData['blocks']) => void;
}


export const Editor:React.FC<EditorProps> = ({onChange}) => {
      useEffect(()=>{
          const editor = new EditorJS({
              holder:'editor',
              placeholder:'Press Tab to open Toolkit',
              autofocus: true,
            tools:{
              header:Header,
              image:{
                class:ImageTool,
                config:{
                  types:'*/*',
                  uploader:{
                    /**
           * Upload file to the server and return an uploaded image data
           
           */
                async uploadByFile(file:any){
             
               
         
                 
            // your own uploading logic here
           return await Api().minio.uploadFile(file).then(({image_url,message})=>{



              return {
                success: 1,
                file: {
                  url:`http://${image_url}`,
                  
                  // any other image data you want to store, such as width, height, color, extension, etc
                }
              };
            })
              
          
            
        
          }

          
                  }
                }
              },
              LinkTool:LinkTool,
              List:List,
              raw:RawTool,
              quite:Quote,
              delimiter:Delimiter,
              personality:Personality,
              attaches:AttachesTool,
              paragraph:{
                class:Paragraph,
                inlineToolbar:true
              }
            },
             async onChange() {
                const {blocks} = await editor.save()
              
                  onChange(blocks)
                
              
              }
          });

          return () => {
            editor.isReady.then(() => {
              editor.destroy();
              
            })
            .catch(e => console.error('ERROR editor cleanup', e));
          }
      },[onChange])

    return(
        <div id='editor' />
    )
}