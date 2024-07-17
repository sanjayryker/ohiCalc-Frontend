import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar'
import './KeyInd1.css'
import { Key1data } from './keyInd1-Data';

const KeyInd1 = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const[data,setData] = useState({})
  const [inputValues, setInputValues] = useState([])
  const currentTab = searchParams.get('current_tab');

  useEffect(() => {
    if (!currentTab) {
      setSearchParams({ current_tab: 'Ind1' });
    }
    const datas = Key1data.find(item => item.tab === currentTab);
    if(datas){
      const intialValues = datas.values.map((value) =>({
        subIndicator:value,
        best:"",
        worst:"",
        current:""
      }))
      setInputValues(intialValues)
    }
    setData(datas)
  }, []);

  const updateTab = (newTab) => {
    setSearchParams({ current_tab:newTab });
    const datas = Key1data.find(item => item.tab === newTab);
    setData(datas)
  };  

  console.log(inputValues)

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
                  <li onClick={() => updateTab('Ind1')}><button>Indicator 1</button></li>
                  <li onClick={() => updateTab('Ind2')}><button>Indicator 2</button></li>
                  <li onClick={() => updateTab('Ind3')}><button>Indicator 3</button></li>
                  <li onClick={() => updateTab('Ind4')}><button>Indicator 4</button></li>
                  <li onClick={() => updateTab('Ind5')}><button>Indicator 5</button></li>
                </ul>
                <div className='card-line'> </div>
                <div className="card-body">
                <table>
                    <thead>
                      <tr>
                        <th className='head-pad'>Sub indicators</th>
                        <th>current Value</th>
                        <th>Best Value</th>
                        <th>Worst Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inputValues?.map((data,index) =>{
                        return(
                          <tr key={index}>
                        <td>{data.subIndicator}</td>
                        <td><input type='text'/></td>
                        <td><input type='text'/></td>
                        <td><input type='text'/></td>
                      </tr>
                        ) 
                      })}
                      
                    </tbody>
                </table>
                </div>
                <div className='button-container'>
                  <button className='submit-button'>Calculate</button>
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