import React ,{useState,useEffect}from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import DynamicFieldNavigate from '../SharedComponents/DynamicFieldNavigate';
import { PrimaryButton } from "@fluentui/react";

import { STUDENT_INFO_ELEMENTS } from './helper';
import './form.scss';

import { useParams } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Form = () => {
    //Typedeclaration to fields
 interface IstudentData{
   name:string,
   Rollnumber?:number,
   Telugu?:number,
   English?:number,
   Hindi?:number,
   Science?:number,
   SocialStudies?:number,
   extraactivities?:number,
   totalmarks?:number
}

//Yupvallidation to studentformelements
const studentschema:yup.SchemaOf<IstudentData> = yup.object().shape({
  name: yup.string().required().min(5).max(10),
  Rollnumber:yup.number(),
  Telugu:yup.number().required().positive().integer().max(100),
  English:yup.number().required().positive().integer().max(100),
  Hindi:yup.number().required().positive().integer().max(100),
  Science:yup.number().required().positive().integer().max(100),
  SocialStudies:yup.number().required().positive().integer().max(100),
  extraactivities:yup.number().required().positive().integer().max(100),
  totalmarks:yup.number()
});


const StudentFormDetails = useForm<any>({
  mode: "all",
  resolver: async (data, context, options) => {
      return yupResolver(studentschema)(data, context, options);
  },
});
const [submitteddata,setSubmittedData]=useState();

const navigation = useNavigate();
const id=useParams();

//submithandlerfunction which navigates to create or edit function
    const StudentFormSubmit: SubmitHandler<any> = async (
        data: any,
    ) => {
        
        setSubmittedData(data); 
        console.log("in",data)
        if (id.id) {
            console.log("hello",data)
            editForm(data);
        } else {
            console.log("create",data)
            createForm(data);
            console.log("hi",data)
        }
        StudentFormDetails.reset({});
     navigation('/view')
    };

    //function toassign additional controls to components
    const getAdditionalProps = (item: any) => {
      item.control =  StudentFormDetails.control;
      item.setValue =  StudentFormDetails.setValue;
      item.register =  StudentFormDetails.register;
      return item;
  };

 
  const [data, setData] = useState<any>();
  const getStudentData = async () => {
      try {
          const result = await axios.get(`http://localhost:5000/data/${id.id}`);
          setData(result.data);
      } catch (error) {
          console.log(error)
      }
  }

  const editForm = async (updatedData: any) => {
      try {
        console.log(updatedData.English+updatedData.Telugu+updatedData.Hindi +updatedData.Science+updatedData.SocialStudies)
        const markstotal:number=updatedData.English+updatedData.Telugu+updatedData.Hindi+updatedData.Science+updatedData.SocialStudies+updatedData.extraactivities;
        const newData = { ...updatedData, 'totalMarks':markstotal}
        const result = await axios.put(`http://localhost:5000/data/${id.id}`, newData);
          setData(result.data);
      } catch (error) {
          console.log(error)
      }
  }
  //To Insert Data into JSON
const [sumtotal,setSumTotal]=useState<any>();
  const createForm = async (updatedData: any) => {
      const generateNumber: any = Math.random();
     
      
      const markstotal:number=updatedData.English+updatedData.Telugu+updatedData.Hindi+updatedData.Science+updatedData.SocialStudies+updatedData.extraactivities;
      setSumTotal(markstotal)
      console.log(sumtotal)
      const newData = { ...updatedData, 'id': generateNumber ,'totalMarks':markstotal}
      try {
          const result = await axios.post(`http://localhost:5000/data`, newData);
          setData(result.data);
          console.log(result.data);
      } catch (error) {
          console.log(error)
      }
  }
  useEffect(() => {
    getStudentData();
}, [id]);

useEffect(() => {
    data &&
        Object.entries(data).forEach(([key, value]: any) => {
          StudentFormDetails.setValue(key, value, { shouldValidate: true });
        });
}, [data]);


console.log(StudentFormDetails.watch(), StudentFormDetails.formState.errors)

   
  return (

    <div className="form">
        
    <div className="form_header">
        <h1>Student Marks</h1>
        
    </div>
   
    <FormProvider {...StudentFormDetails}>
        <form onSubmit={StudentFormDetails.handleSubmit(StudentFormSubmit)}>
            
            <div className="form_container">

                {STUDENT_INFO_ELEMENTS?.map((rows: any) => {
                    return (
                        <div className={`rowone ${rows.className}`}>
                            {rows.elements?.map((item: any) => {
                                
                                const updatedItem = getAdditionalProps(item);
                                return DynamicFieldNavigate(item.type, updatedItem);
                            
                            })}
                        </div>
                    );
                })}
                </div>
                {/* <div>
                    <label>TotalMarks:{sumtotal}</label>
                </div> */}
               
                    <div className="form_footer">
                    
                        <PrimaryButton type="submit" 
                            onClick={StudentFormDetails.handleSubmit(StudentFormSubmit)}

                        >Submit</PrimaryButton>
                    </div>
                </form>
            </FormProvider>
            </div>
        
  )
}

export default Form