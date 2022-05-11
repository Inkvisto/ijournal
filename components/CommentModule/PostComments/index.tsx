import React,{useState} from 'react'
import AddCommentForm from '../AddCommentForm'
import data from '../../../pages/api/data';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';




const PostComments:React.FC = () => {
    const[activeTab,setActiveTab] = useState(0)
    const comments = data.comments[!activeTab ? 'popular' : 'In_order']

    return(
        <div><Tabs onChange={(_,newValue)=>{setActiveTab(newValue)}} value={activeTab} indicatorColor='primary' textColor='primary' >
        <Tab label="Popular" />
        <Tab label="In order" />
      </Tabs>
            <AddCommentForm />
          </div>
    )
}

export default PostComments