import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import './EDI-weight.css'
import { keyInd1_data, keyInd2_data, keyInd3_data, keyInd4_data, keyInd5_data } from './EDI-keyInd-Data';
import axios from 'axios';
import { URL } from '../../App'
import Sidebar from '../../components/Sidebar';
import arrow from '../../assets/right_arrow.png'
import { useNavigate } from 'react-router-dom';
import SkeletonLoaderWeight from '../../components/SkeletonLoaderWeight';

const EDI_weight = () => {

  const dataset = { keyInd1: keyInd1_data, keyInd2: keyInd2_data, keyInd3: keyInd3_data, keyInd4: keyInd4_data, keyInd5: keyInd5_data}

    const location = useLocation()
    const [data,setData] = useState({})
    const [searchParams, setSearchParams] = useSearchParams()
    const [inputValues, setInputValues] = useState([])
    const [indicatorWeight, setIndicatorWeight] = useState('')
    const [indicatorScore,setIndicatorScore] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [keyIndScore,setKeyIndScore] = useState([]) //State to map all keyInd Scores
    const [keyScore,setKeyScore] = useState('') // State for keyScore change we get from response

    //Error States
    const [decimalError, setDecimalError]= useState(false)
    const [totalError,setTotalError] = useState(false)
    const [allWeightError, setAllWeightError] = useState(false)

    const [indicatorDecimalError, setIndicatorDecimalError] = useState(false);
    const [indicatorTotalError, setIndicatorTotalError] = useState(false);
    const [indicatorEmptyError, setIndicatorEmptyError] = useState(false);

    const currentTab = searchParams.get('current_tab');

    useEffect(() => {
      fetchData()
      keyIndScoreFetch()
    }, [currentTab, setSearchParams, location.pathname]);

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

    //fetch Key Ind Score
    const keyIndScoreFetch = async() =>{

      setDecimalError(false)
      setTotalError(false)
      setAllWeightError(false)
      setIndicatorDecimalError(false);
      setIndicatorEmptyError(false);

      const response = await axios.get(`${URL}/weight/api/keyIndScore/EDI`)
      setKeyScore('')
      const sortedArray = response.data.sort((a,b) =>Number(a.keyInd)-Number(b.keyInd))
      const keyScores = sortedArray.map((value) => value.keyInd_Score)
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
      
      const category = "EDI"
      const key = splitPath[2]
      const ind = currentTab
      // console.log(category,key,ind)
  
      try{
        const response = await axios.post(`${URL}/weight/EDI/getData`,{category,key,ind})
        const fetchedData = response.data

        const equalWeight = (Math.floor((100 / datas.subInd.length) * 100) / 100).toFixed(2)
        
        if (fetchedData && fetchedData.values) {
          const initialValues = fetchedData.values.map(value => ({
            subInd: value.subInd,
            subInd_name: value.subInd_name,
            best: value.best,
            worst: value.worst,
            current: value.current,
            normalized_value: value.normalized_value,
            weight:value.weight ? value.weight : equalWeight,
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
            weight:equalWeight,
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
        return false;
      }
      const weightStr = indicatorWeight.toString();
      const decimalIndex = weightStr.indexOf('.');
    
      if (decimalIndex !== -1) {
        const decimalPart = weightStr.split('.')[1];
        if (decimalPart && decimalPart.length !== 2) {
          setIndicatorDecimalError(true);
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

        // // Check the weighted array for 0 or 1 and throw err (0 means no value,  1 means not two values after '.' )

        if (weightArray.includes(0)) {
          hasAllWeightError = true;
          setAllWeightError(hasAllWeightError);
        } else if (weightArray.includes(1)) {
          hasDecimalError = true;
          setDecimalError(hasDecimalError);

        } else {
          // Check if weights add up to 100 and impose error
          const weightTotal = weightArray.reduce((a, b) => a + b, 0);
          hasTotalError = Math.round(weightTotal) !== 100;
          setTotalError(Math.round(weightTotal) !== 100);
        } 

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
          const response = await axios.post(`${URL}/weight/EDI/postData`,payload)
          setKeyScore(response.data.keyScore)
          console.log(response)
        }catch (err) {
          if (err.response && err.response.data && err.response.data.msg === "Weights must add up to 100.") {
            setIndicatorTotalError(true);
          }else {
             console.log(err)
            }
          }

        console.log(payload)
        }
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
      }
      
      calculation()
      
    }

  return (
    <>
      <Sidebar keyIndScore={keyIndScore} handleNavigation={handleNavigation} keyScore={keyScore} path={splitPath[0]}/>
      <div className='key-ind1'>
          <div className="container">
            <div className="page-inner">
              <div className="page-header">
                <ul className='breadcrumbs'>
                  <li onClick={() => handleNavigation("/category")} style={{cursor:"pointer"}}> Categories </li>
                  <li style={{marginLeft:"10px"}}>  <img src={arrow} alt="icon" style={{height:'20px', width:'15px'}} className="nav-logo"/> </li>
                  <li style={{marginLeft:"10px"}}> EDI </li>
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
                          return(
                          <tr key={index}>
                            <td>{data.subInd_name}</td>
                            <td><input type='text'value={data.current || ''} onChange={(e)=> handleInputChange(index,"current",e.target.value)}/></td>
                            <td><input type='text'value={data.worst || ''} onChange={(e)=> handleInputChange(index,"worst",e.target.value)}/></td>
                            <td><input type='text'value={data.best || ''} onChange={(e)=> handleInputChange(index,"best",e.target.value)} /></td>
                            <td><input type='text'value={data.weight || ''} onChange={(e)=> handleInputChange(index,"weight",e.target.value)} /></td>
                        </tr>
                          ) 
                        }):(  
                        <SkeletonLoaderWeight/>
                        )}
                      </tbody>
                  </table>
                  </div>
                  <div className='card-line'> </div>
                  <div className='indicator_weight'>Weightage of the indicator - {data.indName} (%) <input value={indicatorWeight || ''} onChange={(e) => setIndicatorWeight(e.target.value)} type='text' /> </div>
                  {indicatorTotalError ? <div className = "errors">Ind Weight must add up to a total of 100</div> : null}
                  {indicatorDecimalError ? <div className = "errors">Ind Weight must contain only two decimal points</div> : null}
                  {indicatorEmptyError ? <div className = "errors">Ind Weight should not be empty or zero</div>:null }

                  <div className='button-container'>
                    <button className='submit-button' onClick={handleSubmit} >Calculate</button>
                  </div>
                  {indicatorScore !== '' &&  <div className='indicator_score'>Indicator Score ({data.indName}):  {indicatorScore}</div>}
                  {totalError ? <div className = "errors" > Weights must add up to a total of 100 </div> : null}
                  {decimalError ? <div className = "errors" > Weights must contain only two decimal points </div> : null}
                  {allWeightError ? <div className = "errors" > Weights should not be empty or zero </div> : null }
                </div>
              </div>
            </div>
          </div>
      </div>
      </>
  )
}

export default EDI_weight