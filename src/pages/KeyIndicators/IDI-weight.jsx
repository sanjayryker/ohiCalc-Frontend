import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import './EDI-weight.css'
import { keyInd1_data, keyInd2_data, keyInd3_data } from './IDI-keyInd-Data';
import axios from 'axios';
import { URL } from '../../App'
import Sidebar from '../../components/Sidebar';
import arrow from '../../assets/right_arrow.png'
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonLoaderWeight from '../../components/SkeletonLoaderWeight';
import { toast } from 'react-toastify'
import PieChart from '../../components/PieChart'
import { SlGraph } from "react-icons/sl";
import { useAuthContext } from '../../hooks/useAuthContext'

const IDI_weight = () => {

  const dataset = { keyInd1: keyInd1_data, keyInd2: keyInd2_data, keyInd3: keyInd3_data}

    const location = useLocation()
    const [data,setData] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const [inputValues, setInputValues] = useState([])
    const [indicatorWeight, setIndicatorWeight] = useState('')
    const [indicatorScore,setIndicatorScore] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [keyIndScore,setKeyIndScore] = useState([]) //State to map all keyInd Scores
    const [keyScore,setKeyScore] = useState(null) // State for keyScore change we get from response
    const [keyIndLength, setKeyIndLength]=useState(false) // state to display keyInd Weight button
    const [showModal, setShowModal] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    //Error States
    const [decimalError, setDecimalError]= useState(false)
    const [totalError,setTotalError] = useState(false)
    const [allWeightError, setAllWeightError] = useState(false)

    const [indicatorDecimalError, setIndicatorDecimalError] = useState(false);
    const [indicatorTotalError, setIndicatorTotalError] = useState(false);
    const [indicatorEmptyError, setIndicatorEmptyError] = useState(false);
    const [weightErrorArray, setWeightErrorArray] = useState([])

    const currentTab = searchParams.get('current_tab') || "Ind1"

    const {user}  = useAuthContext()

    const localUser = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
      if(user){
        keyIndScoreFetch()
        fetchData()
      }
    }, [currentTab,setSearchParams, location.pathname, user])

  //Navigate between keyInds
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    const splitpath = path.split('?')
    //To prevent tab updation when clicking on same tab
    if(splitpath[0] != location.pathname){
      setInputValues([]);
      setIndicatorScore('');
      setData({});
      navigate(path);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

    //fetch Key Ind Score
    const keyIndScoreFetch = async() =>{

      setDecimalError(false)
      setTotalError(false)
      setAllWeightError(false)
      setIndicatorDecimalError(false);
      setIndicatorEmptyError(false);

      const response = await axios.get(`${URL}/weight/api/keyIndScore/IDI`,{
        headers:{
          'Authorization' : `Bearer ${user.token}`
        }
      })
      setKeyScore(null)
      setKeyIndLength(false)
      const sortedArray = response.data.sort((a,b) =>Number(a.keyInd)-Number(b.keyInd))
      const keyScores = sortedArray.map((value) => value.keyInd_Score)
      if(keyScores.length === 3) setKeyIndLength(true)
      setKeyIndScore(keyScores)
    }

    //Data fetch functions 
    const fetchData = async() =>{
      setIsLoading(true)
      if (!currentTab) {
        setSearchParams({ current_tab: 'Ind1' });
      }
      const datas = dataset[splitPath[2]].find(item => item.tab === currentTab);
      setData(datas)
      
      const category = "IDI"
      const key = splitPath[2]
      const ind = currentTab
      // console.log(category,key,ind)
  
      try{
        const response = await axios.post(`${URL}/weight/IDI/getData`,{category,key,ind},{
          headers:{
            'Authorization' : `Bearer ${user.token}`
          }
        })
        const fetchedData = response.data

        const equalSubWeight = (Math.floor((100 / datas.subInd.length) * 100) / 100).toFixed(2)
        // const equalIndWeight = (Math.floor((100 / dataset[splitPath[2]].length ) * 100) / 100).toFixed(2)
        
        if (fetchedData && fetchedData.values) {
          const initialValues = fetchedData.values.map(value => ({
            subInd: value.subInd,
            subInd_name: value.subInd_name,
            best: value.best === 0 ? "0" : value.best,
            worst: value.worst === 0 ? "0" : value.worst,
            current:  value.current === 0 ? "0" : value.current,
            normalized_value: value.normalized_value,
            weight:value.weight ? value.weight : equalSubWeight,
          }));
          setIndicatorWeight(fetchedData.ind_weight)
          setInputValues(initialValues);
          setIndicatorScore(fetchedData.ind_score);
          setIsLoading(false)
        }else{
          const intialValues = datas.subInd.map((value,index) =>({
            subInd : index+1,
            subInd_name : value,
            best:"",
            worst:"",
            current:"",
            normalized_value:"",
            weight:equalSubWeight,
          }))
          setInputValues(intialValues)
          setIndicatorWeight('')
          setIndicatorScore('')
          setIsLoading(false)
        }
        // console.log(response.data)
      }catch(err){
        console.error(err)
      }
    }

    //Splitting the URL
    const splitPath = location.pathname.split('/').filter(Boolean)
    const KeyIndicatorValue = splitPath[2].slice(-1)
    const indicatorValue = currentTab?.slice(-1)

    //Update current Tab Value
    const updateTab = (newTab) => {
      //To prevent tab updation when clicking on same tab
      if(newTab !== currentTab){
        setSearchParams({ current_tab:newTab });
        setInputValues([])
        setIndicatorScore('')
        const datas = dataset[splitPath[2]].find(item => item.tab === newTab);
        setData(datas)
      }
      
    };  

    //Handle Input box Changes
    const handleInputChange = (index,field,value) =>{
      setInputValues(preValues=>{
        const newValues = [...preValues]
        newValues[index][field]=value 
        return newValues
      })
    }

    // Indicator Weight Checker
    const validateIndicatorWeight = () => {
      setIndicatorDecimalError(false);
      setIndicatorEmptyError(false);
      setIndicatorTotalError(false);
    
      if (indicatorWeight == '' || indicatorWeight == null || indicatorWeight == 0) {
        setIndicatorEmptyError(true);
        toast.error("Indicator Weight should not be empty or zero")
        return false;
      }
      const weightStr = indicatorWeight.toString();
      const decimalIndex = weightStr.indexOf('.');
    
      if (decimalIndex !== -1) {
        const decimalPart = weightStr.split('.')[1];
        if (decimalPart && decimalPart.length !== 2) {
          setIndicatorDecimalError(true);
          toast.error("Indicator Weight must contain only two decimal points")
          return false;
        }
      }

      // if(indicatorWeight > 100){
      //   setIndicatorTotalError(true);
      //   return false
      // }
      return true;
    };
    

    // ---------------------------------Submit Function  ----------------------------------------

    const handleSubmit = async() =>{

      let weightArray = []
      setDecimalError(false)
      setTotalError(false)
      setAllWeightError(false)
      setIsSubmitting(true)
      
      let hasAllWeightError = false;
      let hasDecimalError = false;
      let hasTotalError = false;

       // Validate Indicator Weight
      if (!validateIndicatorWeight()) {
        return;
      }

      const calculation = async() =>{

        let normalizedArray = []
        let normXweightArray = []

        //Normalized Value Calculation

        inputValues.forEach((value) =>{
          const hasCurrent = value.current !== null && value.current !== ''
          const hasBest = value.best !== null && value.best !== ''
          const hasWorst = value.worst !== null && value.worst !== ''
          const hasWeight = value.weight !== null && value.weight !== ''

          // weights are checked for 2 decimal values after . and  pushed to an array accordingly 
          if (hasWeight) {
            const weight = value.weight;
            const weightStr = weight.toString();
            const decimalIndex = weightStr.indexOf('.');
            
            if (decimalIndex === -1) {
              // If it is not a decimal, push it
              weightArray.push(Number(weight));
            }else {
              const decimalPart = weightStr.split('.')[1];
              weightArray.push(decimalPart && decimalPart.length === 2 ? Number(weight) : 1);  // Push one if not two decimal
            }

          } else if(!hasWeight || value.weight === 0) {
            weightArray.push(0); // push 0 if no weights or 0
          }

          // Check if all values are present & calculate accordingly
          if(hasCurrent && hasWorst && hasBest){
            const normalized = (value.current - value.worst) / (value.best - value.worst)
            if (isNaN(normalized) || !isFinite(normalized)) {
              normalizedArray.push(0.5)
            } else { normalizedArray.push(normalized) }
          }else{
            normalizedArray.push(0)
          }
        })

        // Check the weighted array for 0 or 1 and throw err (0 means no value,  1 means not two values after '.' )

        if (weightArray.includes(0)) {
          hasAllWeightError = true;
          setAllWeightError(hasAllWeightError);
          toast.error("Weights should not be empty or zero")
        } else if (weightArray.includes(1)) {
          hasDecimalError = true;
          setDecimalError(hasDecimalError);
          toast.error("Weights must have two or no decimal points")

        } else {
          // Check if weights add up to 100 and impose error
          const weightTotal = weightArray.reduce((a, b) => a + b, 0);
          hasTotalError = Math.round(weightTotal) !== 100;
          setTotalError(Math.round(weightTotal) !== 100);
          if(Math.round(weightTotal) !== 100) {toast.error("Weights must add up to a total of 100")}        } 

        //Update the Normalized values in the inputValues 
        const newValues = inputValues.map((item,index) =>({
          ...item,
          normalized_value:normalizedArray[index]
        }));
        payload.values = newValues

        
        if(!hasAllWeightError && !hasDecimalError && !hasTotalError)
        {
          // Normalized Value * Weights and Indicator score calculation
          normalizedArray.forEach((value,index) =>{
          const values = value * weightArray[index]/ 100 
          normXweightArray.push(values) 
        })

        const reducedArray = normXweightArray.reduce((total, num) => total + num, 0)
        payload.ind_score = reducedArray
        setIndicatorScore(reducedArray)

        try{
          const response = await toast.promise(
            axios.post(`${URL}/weight/IDI/postData`,payload,{
              headers:{
                'Authorization' : `Bearer ${user.token}`
              }
            }),{
              pending: 'Submitting data'
            }
          )
          toast.success(response.data.message)
          setKeyScore(response.data.keyScore)
          setKeyIndLength(response.data.keyLength)
          console.log(response)
        }catch (err) {
          if (err.response && err.response.data && err.response.data.msg === "Weights must add up to 100.") {
            toast.error("Indicator weights must add up to a total of 100")
            setIndicatorTotalError(true);
          }else {
             console.log(err)
             toast.error("Failed to submit data")
            }
          }finally {
            setIsSubmitting(false)
          }

        console.log(payload)
        }
        setWeightErrorArray(weightArray)
      }

      const payload = {
        category:splitPath[0],
        keyInd:KeyIndicatorValue,
        keyInd_name:data.keyInd_name,
        ind_score:"",
        ind:indicatorValue,
        ind_name:data.indName,
        ind_weight:indicatorWeight,
        status:true,
        values:[],
        user_id: localUser.userId
      }
      
      calculation()
      
    }

  return (
    <>
      <div className='key-ind1'>
      <Sidebar keyIndScore={keyIndScore} handleNavigation={handleNavigation} keyScore={keyScore} path={splitPath[0]} keyIndLength={keyIndLength} user={user} />
          <div className="container">
            <div className="page-inner">
              <div className="page-header">
                <ul className='breadcrumbs'>
                  <li onClick={() => handleNavigation("/category")} style={{cursor:"pointer"}}> Categories </li>
                  <li style={{marginLeft:"10px"}}>  <img src={arrow} alt="icon" style={{height:'20px', width:'15px'}} className="nav-logo"/> </li>
                  <li style={{marginLeft:"10px"}}> IDI </li>
                </ul>
              </div>

              <div className='row-card'> 
                <div className="card">
                  <ul className='card-header'> 
                  {dataset[splitPath[2]].map((data,index) =>{
                    return(
                      <li key={index} onClick={() => updateTab(data.tab)}>
                      <button className={currentTab == `${data.tab}` ? 'active' : ''} >{data.indName}</button>
                    </li>
                    )
                  })}
                  </ul>
                  <div className='card-line'> </div>
                  <div className="card-body">

                  <table>
                      <thead>
                        <tr>
                          <th className='head-pad'>Sub Indicators</th>
                          <th>Current Value</th>
                          <th>Worst Value</th>
                          <th>Best Value</th>
                          <th> Weight (%) </th>
                        </tr>
                      </thead>
                      <tbody>
                        {!isLoading ?  inputValues.map((data,index) =>{
                          const weightErrorClass = (
                            (decimalError && weightErrorArray[index] === 1) || 
                            (allWeightError && weightErrorArray[index] === 0) || 
                            totalError
                          ) ? 'indicator_error' : '';
                          return(
                          <tr key={index}>
                            <td>{data.subInd_name}</td>
                            <td><input type='number'value={data.current || ''} onChange={(e)=> handleInputChange(index,"current",e.target.value)}/></td>
                            <td><input type='number'value={data.worst || ''} onChange={(e)=> handleInputChange(index,"worst",e.target.value)}/></td>
                            <td><input type='number'value={data.best || ''} onChange={(e)=> handleInputChange(index,"best",e.target.value)} /></td>
                            <td><input type='number'value={data.weight || ''} onChange={(e)=> handleInputChange(index,"weight",e.target.value)} /></td>
                        </tr>
                          ) 
                        }):(  
                        <SkeletonLoaderWeight/>
                        )}
                      </tbody>
                  </table>
                  </div>
                  <div className='card-line'> </div>
                  {!isLoading ?<div className='indicator_weight'>Weightage of the indicator - {data.indName} (%) <input className={indicatorDecimalError || indicatorEmptyError || indicatorTotalError ? "weight_input indicator_error" : 'weight_input'}  value={indicatorWeight || ''} onChange={(e) => setIndicatorWeight(e.target.value)} type='number' /> </div>
                   : <div className='indicator_weight'><Skeleton style={{width:"100px", height:"27.6px"}}/> </div>}
                  {/* {indicatorTotalError ? <div className = "errors">Ind Weight must add up to a total of 100</div> : null}
                  {indicatorDecimalError ? <div className = "errors">Ind Weight must contain only two decimal points</div> : null}
                  {indicatorEmptyError ? <div className = "errors">Ind Weight should not be empty or zero</div>:null } */}

                  <div className='button-container'>
                    <button className='submit-button' onClick={handleSubmit} disabled={isSubmitting}>Calculate</button>
                    <button className="graph-button" onClick={() => setShowModal(true)} disabled={isSubmitting}>Visualize <SlGraph  className='graph-icon' /></button>
                  </div>
                  {indicatorScore !== '' &&  <div className='indicator_score'>Indicator Score ({data.indName}):{Number(indicatorScore).toFixed(6)}</div>}
                  {/* {totalError ? <div className = "errors" > Weights must add up to a total of 100 </div> : null}
                  {decimalError ? <div className = "errors" > Weights must contain only two decimal points </div> : null}
                  {allWeightError ? <div className = "errors" > Weights should not be empty or zero </div> : null } */}
                </div>
              </div>
            </div>
          </div>
          <PieChart show={showModal} handleClose={handleModalClose} inputValues={inputValues} />
      </div>
      </>
  )
}

export default IDI_weight