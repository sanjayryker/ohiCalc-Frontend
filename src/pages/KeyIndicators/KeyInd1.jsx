  import React, { useEffect, useState } from 'react';
  import { useSearchParams, useLocation } from 'react-router-dom';
  import Sidebar from '../../components/Sidebar'
  import './KeyInd1.css'
  import { keyInd1_data, keyInd2_data, keyInd3_data, keyInd4_data, keyInd5_data } from './EDI-keyInd-Data';

  const KeyInd1 = () => {

    const dataset = {
      keyInd1: keyInd1_data,
      keyInd2: keyInd2_data,
      keyInd3: keyInd3_data,
      keyInd4: keyInd4_data,
      keyInd5: keyInd5_data,
    }

    const location = useLocation()
    const [data,setData] = useState({})
    const [searchParams, setSearchParams] = useSearchParams();
    const [inputValues, setInputValues] = useState([])
    const [indicatorScore,setIndicatorScore] = useState('')

    const currentTab = searchParams.get('current_tab');

    useEffect(() => {
      if (!currentTab) {
        setSearchParams({ current_tab: 'Ind1' });
      }

      const datas = dataset[splitPath[1]].find(item => item.tab === currentTab);
      setData(datas)
      if(datas){
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
      }
    }, [currentTab, setSearchParams, location.pathname]);

    //Splitting the URL

    const splitPath = location.pathname.split('/').filter(Boolean)
    const KeyIndicatorValue = splitPath[1].slice(-1)
    const indicatorValue = currentTab?.slice(-1)

    //Update current Tab Value

    const updateTab = (newTab) => {
      setSearchParams({ current_tab:newTab });
      const datas = dataset[splitPath[1]].find(item => item.tab === newTab);
      setData(datas)
    };  

    //Handle Input box Changes

    const handleInputChange = (index,field,value) =>{
      setInputValues(preValues=>{
        const newValues = [...preValues]
        newValues[index][field]=value 
        return newValues
      })
      // console.log(inputValues)
    }

    const handleSubmit = () =>{

      const calculation = () =>{

        let normalizedArray = []
        let normXweightArray = []

        //Normalized Value Calculation

        inputValues.forEach((value) =>{
          const hasCurrent = value.current !== undefined && value.current !== ''
          const hasBest = value.best !== undefined && value.best !== ''
          const hasWorst = value.worst !== undefined && value.worst !== ''
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
        console.log(normalizedArray)
        
        //Update the Normalized values in the inputValues 

          const newValues = inputValues.map((item,index) =>({
            ...item,
            normalized_value:normalizedArray[index]
          }));
       
        // Normalized Value * Weights and Indicator score calculation
        normalizedArray.forEach((value) =>{
          const values = value * data.subInd_weight / 100 
          normXweightArray.push(values)
        })
        console.log("weighted Array",normXweightArray)

        const reducedArray = normXweightArray.reduce((total, num) => total + num, 0)
        setIndicatorScore(reducedArray)
      }
      calculation() 

      const payload = {
        category:splitPath[0],
        keyInd:KeyIndicatorValue,
        ind_score:"",
        ind:indicatorValue,
        ind_name:data.indName,
        status:false,
        values:inputValues,
      }
      //  console.log(payload)
      // console.log(inputValues) 
    }

    return (
      <>
      <Sidebar/>
      <div className='key-ind1'>
          <div className="container">
            <div className="page-inner">
              <div className="page-header">
                <ul className='breadcrumbs'>
                  <li> Category 1 </li>
                  <li style={{marginLeft:"10px"}}> --+ </li>
                  <li style={{marginLeft:"10px"}}> {currentTab} </li>
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
                          <th>current Value</th>
                          <th>Worst Value</th>
                          <th>Best Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {inputValues?.map((data,index) =>{
                          return(
                            <tr key={index}>
                          <td>{data.subInd_name}</td>
                          <td><input type='text'value={data.current} onChange={(e)=> handleInputChange(index,"current",e.target.value)}/></td>
                          <td><input type='text'value={data.worst} onChange={(e)=> handleInputChange(index,"worst",e.target.value)}/></td>
                          <td><input type='text'value={data.best} onChange={(e)=> handleInputChange(index,"best",e.target.value)} /></td>
                        </tr>
                          ) 
                        })}
                      </tbody>
                  </table>
                  </div>
                  {indicatorScore !== '' &&  <div>Indicator Score is :{indicatorScore}</div>}
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

  export default KeyInd1