

interface ParagraphPostProps {
  data:{
      text:string
  }
}


const ParagraphPost = ({data}:ParagraphPostProps) => {


    
 


   
    return(
        <p>
            {data.text}
        </p>
    )
}


export default ParagraphPost