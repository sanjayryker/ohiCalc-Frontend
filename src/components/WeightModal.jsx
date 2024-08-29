import React, { useEffect, useState } from "react";
import './weightModal.css'
import axios from "axios"
import {URL} from '../App'
import { toast } from 'react-toastify'


const WeightModal = ({ show, handleClose, selectedDataset,path, user }) => {

    const [fetchedWeights, setFetchedWeights] = useState([])
    const [weights, setWeights] = useState({})

    //Error States
    const [decimalError, setDecimalError]= useState(false)
    const [totalError,setTotalError] = useState(false)
    const [allWeightError, setAllWeightError] = useState(false)

    useEffect(() =>{
      if(user){
        fetchData()
      }
    },[path,user])

    const fetchData = async()=>{
        const splitPath = (location.pathname.split('/').filter(Boolean))
        const category = {path : splitPath[0]}
        try {
          const response = await axios.post(`${URL}/weight/api/keyIndWeight/get`,category,{
            headers:{
              'Authorization' : `Bearer ${user.token}`
            }
          } );
          const fetchedData = response.data;
          setFetchedWeights(fetchedData);

          // Initialize weights with fetched values
          const initialWeights = {};
          fetchedData.forEach((item, index) => {
            initialWeights[index] = item.keyInd_weight || '';
          });
          setWeights(initialWeights);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWeights(prevWeights => ({
          ...prevWeights,
          [name]: value
        }));
      }

  
    const onSubmit = async(e) => {

      e.preventDefault();
      const payload = {weights,path}
      console.log('Weights submitted:', weights);

      let weightArray = []
      let totalArray = []

      setDecimalError(false)
      setTotalError(false)
      setAllWeightError(false)
      
      let hasAllWeightError = false;
      let hasDecimalError = false;
      let hasTotalError = false;

      weightArray = Object.values(weights)

      weightArray.forEach((value) =>{

        const hasWeight = value !== null || value !== ''
        // weights are checked for 2 decimal values after . and  pushed to an array accordingly 
        if (hasWeight) {
          const weight = value;
          const weightStr = weight.toString();
          const decimalIndex = weightStr.indexOf('.');
          
          if (decimalIndex === -1) {
            // If it is not a decimal, push it
            totalArray.push(Number(weight));
          }else {
            const decimalPart = weightStr.split('.')[1];
            totalArray.push(decimalPart && decimalPart.length === 2 ? Number(weight) : 1);  // Push one if not two decimal
          }

        } else if(!hasWeight || value.weight === 0) {
          totalArray.push(0); // push 0 if no weights or 0
        }

      })

      // Check the weighted array for 0 or 1 and throw err (0 means no value,  1 means not two values after '.' )

      if (totalArray.includes(0)) {
        hasAllWeightError = true;
        setAllWeightError(hasAllWeightError);
      } else if (totalArray.includes(1)) {
        hasDecimalError = true;
        setDecimalError(hasDecimalError);

      } else {
        // Check if weights add up to 100 and impose error
        const weightTotal = totalArray.reduce((a, b) => a + b, 0);
        hasTotalError = Math.round(weightTotal) !== 100;
        setTotalError(Math.round(weightTotal) !== 100);
      } 

      if(!hasAllWeightError && !hasDecimalError && !hasTotalError){

        try {
          const response = await toast.promise(
            axios.post(`${URL}/weight/api/keyIndWeight/post`, payload,{
              headers:{
                'Authorization' : `Bearer ${user.token}`
              }
            }),{
              pending: 'Submitting weights',
              success: 'Weights submitted successfully!',
            }
          )
          console.log(response.data);
          handleClose();
        } catch (error) {
      // console.error('Error submitting weights:', error);
      toast.error("Failed to submit weights, Check your network connection")
    }
      
      }
      
    };
  
    if (!show) {
      return null;
    }
  
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleClose}>&times;</span>
          <div style={{display:"flex", justifyContent:"center", marginBottom:"5px"}}>Key Indicator Weightages</div>
          <form onSubmit={onSubmit}>
            {selectedDataset.map((val,index) =>(
                <div key={index} className="form-group">
                    <label>{val.title}</label>
                    <input type="text" name={index} value={ weights[index] || ''} onChange={handleChange} /> 
                </div>
            ))}
            
            <button type="submit">Calculate</button>
            {totalError ? <div className = "errors" > Weights must add up to a total of 100 </div> : null}
            {decimalError ? <div className = "errors" > Weights must contain only two decimal points </div> : null}
            {allWeightError ? <div className = "errors" > Weights should not be empty or zero </div> : null }
          </form>
        </div>
      </div>
    );
  };

  export default WeightModal