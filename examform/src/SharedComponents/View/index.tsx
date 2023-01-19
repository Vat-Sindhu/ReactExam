import React,{useState,useEffect} from 'react'
import { DetailsList,IColumn,DetailsListLayoutMode } from '@fluentui/react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../../Form/form.scss'
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import '../../SharedComponents/HeaderComponent/header.scss'

const View = () => {
const [studentdata,setStudentData]=useState<any>();
//function to getstudentdata from db.json
   const getstudentdata=async()=>{
    const url='http://localhost:5000/data'
    try{
    const result:any=await axios.get(url);
    setStudentData(result.data);
    console.log(result.data);
    }
    catch(err){
      console.log(err)
    }

   }

   const deleteStudent=async(id:any)=>{
    const url=`http://localhost:5000/data/${id}`
    try{
    const result:any=await axios.delete(url);
    console.log(result.data);
    getstudentdata();
    
    }
    catch(err){
      console.log(err)
    }

   }
//column array to bind to detailslist

const columns:IColumn[]=[
    {
        key: 'column1',
        name: 'Name',
        fieldName:'name',
        minWidth: 40,
        maxWidth: 100, 
        isResizable:true  
    },
    {
        key: 'column2',
        name: 'RollNumber',
        fieldName: 'RollNumber',
        minWidth: 40,
        maxWidth:100,
        isResizable:true   
    },
    {
        key: 'column3',
        name: 'English',
        fieldName: 'English',
        minWidth: 40,
        maxWidth: 100, 
        isResizable:true  
    },
    {
      key: 'column4',
      name: 'Telugu',
      fieldName: 'Telugu',
      minWidth: 40,
      maxWidth: 100, 
      isResizable:true  
  },
  {
    key: 'column5',
    name: 'Hindi',
    fieldName: 'Hindi',
    minWidth: 40,
    maxWidth: 100, 
    isResizable:true  
},
{
  key: 'column6',
  name: 'Science',
  fieldName: 'Science',
  minWidth: 40,
  maxWidth: 100, 
  isResizable:true  
},
{
  key: 'column7',
  name: 'SocialStudies',
  fieldName: 'SocialStudies',
  minWidth: 40,
  maxWidth: 100, 
  isResizable:true  
},
{
  key: 'column8',
  name: 'ExtraActivities',
  fieldName: 'extraactivities',
  minWidth: 40,
  maxWidth: 100, 
  isResizable:true  
},
 {
        key: 'column9',
        name: 'TotalMarks',
        fieldName: 'totalMarks',
        minWidth: 40,
        maxWidth: 150, 
        isResizable:true  
    },
    {
        key: 'column10',
        name: '',
        fieldName:'id',
        minWidth: 100,
        maxWidth: 200,
        isResizable:true , 
        onRender: (item: any) => (
          item.id &&
          <>
              <Link className='btn' to={`/view/${item.id}`}><FiEye color={"#5a5a5b"}/></Link>
              <Link className='btn' to={`/update/${item.id}`}><FiEdit2 color={" #5a5a5b"}/></Link>
              <Link className='btn' onClick={() => deleteStudent(item.id)} to=''><FaTrashAlt color={" #5a5a5b"}/></Link>
          </>
      )
        }
    

]



useEffect(()=>{
    getstudentdata();
},[])
  return (
    <>
    <div className="view_navigation">
   {/* <Link  to="view">View</Link> */}
<Link className="view_navigation_add" to="/create"><label className="view_add">ADD</label></Link>
</div>
    <div className="view_grid">
      {/* <h1>View</h1> */}
      {studentdata &&
    <DetailsList
         items={studentdata}
         columns={columns}
         setKey="set"
         layoutMode={DetailsListLayoutMode.justified}
         />
      }
         </div>
         </>
         
  )
}

export default View
