import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import './EDI.css'
import { keyInd1_data, keyInd2_data, keyInd3_data, keyInd4_data, keyInd5_data } from './CDI-keyInd-Data';
import axios from 'axios';
import {URL} from '../../App'
import SidebarCdi from '../../components/Sidebar-CDI';
import arrow from '../../assets/right_arrow.png'
import { useNavigate } from 'react-router-dom';
import SkeletonLoader from '../../components/SkeletonLoader';

const CDI = () => {

    const dataset = { keyInd1: keyInd1_data, keyInd2: keyInd2_data, keyInd3: keyInd3_data, keyInd4: keyInd4_data, keyInd5: keyInd5_data,}

    const location = useLocation()
    const [data,setData] = useState({})
    const [searchParams, setSearchParams] = useSearchParams();
    const [inputValues, setInputValues] = useState([])
    const [indicatorScore,setIndicatorScore] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [keyIndScore,setKeyIndScore] = useState([]) //State to map all keyInd Scores
    const [keyScore,setKeyScore] = useState('') // State for keyScore change we get from response

    const currentTab = searchParams.get('current_tab');

    useEffect(() => {
      fetchData()
      keyIndScoreFetch()
    }, [currentTab, setSearchParams, location.pathname]);

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
      const response = await axios.get(`${URL}/api/keyIndScore/CDI`)
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
      const datas = dataset[splitPath[1]].find(item => item.tab === currentTab);
      setData(datas)
      
      const category = "CDI"
      const key = splitPath[1]
      const ind = currentTab
      // console.log(category,key,ind)
  
      try{
        const response = await axios.post(`${URL}/CDI/getData`,{category,key,ind})
        const fetchedData = response.data

        if (fetchedData && fetchedData.values) {
          const initialValues = fetchedData.values.map(value => ({
            subInd: value.subInd,
            subInd_name: value.subInd_name,
            best: value.best,
            worst: value.worst,
            current: value.current,
            normalized_value: value.normalized_value,
          }));
  
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
            normalized_value:""
          }))
          setInputValues(intialValues)
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
    const KeyIndicatorValue = splitPath[1].slice(-1)
    const indicatorValue = currentTab?.slice(-1)

    //Update current Tab Value
    const updateTab = (newTab) => {
      if(newTab !== currentTab){
        setSearchParams({ current_tab:newTab });
        setInputValues([])
        setIndicatorScore('')
        const datas = dataset[splitPath[1]].find(item => item.tab === newTab);
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

    const handleSubmit = async() =>{

      const calculation = () =>{

        let normalizedArray = []
        let normXweightArray = []

        //Normalized Value Calculation

        inputValues.forEach((value) =>{
          const hasCurrent = value.current !== null && value.current !== ''
          const hasBest = value.best !== null && value.best !== ''
          const hasWorst = value.worst !== null && value.worst !== ''
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
        
        //Update the Normalized values in the inputValues 

          const newValues = inputValues.map((item,index) =>({
            ...item,
            normalized_value:normalizedArray[index]
          }));
          payload.values = newValues
       
        // Normalized Value * Weights and Indicator score calculation
        normalizedArray.forEach((value) =>{
          const values = value * data.subInd_weight/ 100 
          normXweightArray.push(values) 
        })

        const reducedArray = normXweightArray.reduce((total, num) => total + num, 0)
        payload.ind_score = reducedArray
        setIndicatorScore(reducedArray)
      }

      const payload = {
        category:splitPath[0],
        keyInd:KeyIndicatorValue,
        keyInd_name:data.keyInd_name,
        ind_score:"",
        ind:indicatorValue,
        ind_name:data.indName,
        status:true,
        values:[],
      }
      console.log(payload)

      calculation()

      try{
        const response = await axios.post(`${URL}/CDI/postData`,payload)
        setKeyScore(response.data.keyScore)
        console.log(response)
      }catch(err){
        console.log(err)
      }
    }

  return (
    <>
      <SidebarCdi keyIndScore={keyIndScore} handleNavigation={handleNavigation} keyScore={keyScore}/>
      <div className='key-ind1'>
          <div className="container">
            <div className="page-inner">
              <div className="page-header">
              <ul className='breadcrumbs'>
                  <li onClick={() => handleNavigation("/category")} style={{cursor:"pointer"}}> Categories </li>
                  <li style={{marginLeft:"10px"}}>  <img src={arrow} alt="icon" style={{height:'20px', width:'15px'}} className="nav-logo"/> </li>
                  <li style={{marginLeft:"10px"}}> CDI </li>
                </ul>
              </div>

              <div className='row-card'> 
                <div className="card">
                  <ul className='card-header'> 
                  {dataset[splitPath[1]].map((data,index) =>{
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
                          <th className='head-pad'>Sub indicators</th>
                          <th>Current Value</th>
                          <th>Worst Value</th>
                          <th>Best Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        { !isLoading ?inputValues.map((data,index) =>{
                          return(
                            <tr key={index}>
                          <td>{data.subInd_name}</td>
                          <td><input type='text'value={data.current || ''} onChange={(e)=> handleInputChange(index,"current",e.target.value)}/></td>
                          <td><input type='text'value={data.worst || ''} onChange={(e)=> handleInputChange(index,"worst",e.target.value)}/></td>
                          <td><input type='text'value={data.best || ''} onChange={(e)=> handleInputChange(index,"best",e.target.value)} /></td>
                        </tr>
                          ) 
                        }):(  
                          <SkeletonLoader/>
                          )}
                      </tbody>
                  </table>
                  </div>
                  {indicatorScore !== '' &&  <div className='indicator_score'>Indicator Score ({data.indName}):  {indicatorScore}</div>}
                  <div className='button-container'>
                    <button className='submit-button' onClick={handleSubmit} >Calculate</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      </>
  )
}

export default CDI