import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../ViewItem/viewitem.scss'
import {Link} from 'react-router-dom'

const ViewItem = () => {

  const [data, setData] = useState<any>();
const [totalmarks,setTotalMarks]=useState<any>();
  const id = useParams();

  const getStudentData = async (item: any) => {
    try {
      const url = `http://localhost:5000/data/${item.id}`
      const result: any = await axios.get(url);
      
      setData(result.data)
 
      
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudentData(id);
  }, [id])

  return (
    <>
    <div className="view_navigation">
    {/* <Link  to="view">View</Link> */}
 <Link className="view_navigation_add" to="/view"><label className="view_add">View</label></Link>
 </div>
    <div className="viewdetail">
      {data &&
        <ul className="viewdetail_row">
          <li className="viewdetail_column">
       <label>Name:{data.name}</label> 
       
       </li>
       <li className="viewdetail_column">
       <label>RollNumber:{data.RollNumber}</label> 
       
       </li>
       <li className="viewdetail_column">
       <label>English:{data.English}</label> 
      
       </li>
       <li className="viewdetail_column">
       <label>Telugu:{data.Telugu}</label> 
       
       </li>
       <li className="viewdetail_column">
       <label>Hindi:{data.Hindi}</label> 
     
       </li>
       <li className="viewdetail_column">
       <label>Science:{data.Science}</label> 
       
       </li>
       <li className="viewdetail_column">
       <label>SocialStudies:{data.SocialStudies}</label> 
       
       </li>
       <li className="viewdetail_column">
       <label>ExtraActivities:{data.extraactivities}</label> 
      
       </li>
       <li className="viewdetail_column">
       TotalMarks:<h3>{data.totalMarks} </h3>
       
       </li>
       
       
        </ul>
      }

    </div>
    </>
  )
}

export default ViewItem