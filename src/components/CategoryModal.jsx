import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {URL} from '../App'
import { toast } from 'react-toastify'
import './CategoryModal.css' // Create a CSS file for styling

const CategoryModal = ({ show, handleClose }) => {
    const [cdiWeight, setCdiWeight] = useState('')
    const [idiWeight, setIdiWeight] = useState('')
    const [ediWeight, setEdiWeight] = useState('')

    const [decimalError, setDecimalError]= useState(false)
    const [totalError,setTotalError] = useState(false)
    const [allWeightError, setAllWeightError] = useState(false)

  useEffect(() => {
    if (show) {
      fetchWeights()
    }
  }, [show])

  const fetchWeights = async () => {
    try {
      const response = await axios.get(`${URL}/weight/api/categoryWeight/get`)
      if(response){
        const weights = response.data
        setCdiWeight(weights.cdi_weight ? weights.cdi_weight : 33.33)
        setIdiWeight(weights.idi_weight ? weights.idi_weight : 33.33)
        setEdiWeight(weights.edi_weight ? weights.edi_weight : 33.33)
      }
      
    } catch (error) {
      console.error('Error fetching weights', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let weightArray = []
    let totalArray = []
    try {
        setDecimalError(false)
        setTotalError(false)
        setAllWeightError(false)
        
        let hasAllWeightError = false
        let hasDecimalError = false
        let hasTotalError = false

        const payload = {
            edi_weight: ediWeight,
            idi_weight: idiWeight,
            cdi_weight: cdiWeight
        }

        weightArray = Object.values(payload)

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
            const response = await toast.promise(
                axios.post(`${URL}/weight/api/categoryWeight/post`, payload),{
                    pending: 'Submitting weights',
                    success: 'Weights submitted successfully!',
                }
            )
            console.log(response)
            handleClose()
        }
        
        } catch (error) {
            toast.error("Failed to submit weights, Check your network connection")
        }
  }

  if (!show) return null

  return (
    <div className="modals-overlay">
      <div className="modals-content">
        <button className="close-button" onClick={handleClose}>x</button>
        <div style={{display:"flex", justifyContent:"center", marginBottom:"16px", fontSize:"18px"}}>Category Weightages</div>
        <form onSubmit={handleSubmit}>

            <div className="form-groups">
                <label>EDI Weight:</label>
                <input
                type="number"
                value={ediWeight}
                onChange={(e) => setEdiWeight(e.target.value)}
                />
            </div>
            <div className="form-groups">
                <label>IDI Weight:</label>
                <input
                type="number"
                value={idiWeight}
                onChange={(e) => setIdiWeight(e.target.value)}
                />
            </div>
            <div className="form-groups">
                <label>CDI Weight:</label>
                <input
                type="number"
                value={cdiWeight}
                onChange={(e) => setCdiWeight(e.target.value)}
                />
            </div>
            <button type="submit">Submit</button>
            {totalError ? <div className = "errors" > Weights must add up to a total of 100 </div> : null}
            {decimalError ? <div className = "errors" > Weights must contain only two decimal points </div> : null}
            {allWeightError ? <div className = "errors" > Weights should not be empty or zero </div> : null }
        </form>
      </div>
    </div>
  )
}

export default CategoryModal;
