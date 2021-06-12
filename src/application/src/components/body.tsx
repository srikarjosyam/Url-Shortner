import { useContext, useEffect } from "react";
import {UrlDataContext } from "../store/app.context.interface";
import { DataGrid, GridCellParams } from '@material-ui/data-grid';
import { Button, CircularProgress, makeStyles, TextareaAutosize} from "@material-ui/core";
import {URL} from '../store/app.context.interface';
import SaveIcon from '@material-ui/icons/Save';
import { useState } from "react";
import { generateString, isValidHttpUrl } from "../utils/stringUtils";
import Alert, { Color } from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme:any) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


export const Body =()=>{
    
    const classes = useStyles();
    const {urlData,fetchUrlData,isDataLoading,updateUrlData,createUrlData} = useContext(UrlDataContext)
    const [url,setURL] = useState('')
    const [status, setStatus] = useState({severity:'',message:''});

    const columns = [
        { field: 'short_url', headerName: 'Url',width: 300,renderCell:(params:GridCellParams)=>{
            let value = window.location.origin +"/st"+ params.getValue(params.id,"short_url")
            const onClick = () => {
              let data: URL  = {short_url:params.row.short_url,long_url:params.row.long_url,
                click_count:params.row.click_count+1}
                updateUrlData(data)
              };
    
            return <a onClick={(e)=>onClick()}>{value}</a>
        } },
        { field: 'long_url', headerName: 'CompleteUrl', width: 600 },
        { field: 'click_count', headerName: 'No.of Views', type: 'number',width: 200 }
      ];

    useEffect(()=>{
        fetchUrlData();
    },[fetchUrlData]);
    
    const getRowData =()=>{
        let result = urlData.map((data,index)=>{
              return {id:index,short_url:data.short_url,long_url:data.long_url,click_count:data.click_count}  
        })
        return result
    }

    const createURL=()=>{
      let validUrl = isValidHttpUrl(url);
      if(validUrl){
      let existingUrl =  urlData.find(val=> val.long_url === url);
      if(!existingUrl){
        let num= Math.floor(Math.random() * (10 - 5 + 1) + 5)
        let runagain = true
       let short_url:string =''
        while(runagain){
          let generatedUrl = '/'+generateString(num)
          let result =  urlData.find(val=>val.short_url === generatedUrl)
          if(!result){
              runagain = false;
              short_url = generatedUrl;
          }
        }
        let data:URL = {long_url:url,click_count:0,short_url:short_url}
        createUrlData(data);
       setStatus({severity:"success",message:`The Url is successfully created - ${data.short_url}`})
      }
      else{
        setStatus({severity:"error",message:`The Url entered already has a shortened version - ${existingUrl.short_url}`})
      }
    }
    else{
      setStatus({severity:"error",message:`The Url entered is invalid`})
    }
    }

    const setURLValue =(value:any)=>{
      setURL(value.target.value);
    }

    return(
    <div>
        <div>
        <TextareaAutosize style={{margin:21,width:'80%',height:50}}
          rowsMax={2}
          aria-label="maximum height"
          placeholder="Add URL"
          defaultValue="Add URL"
          onChange={(e)=>setURLValue(e)}/>
        <Button style={{top:'-33px'}} variant="contained" color="primary" size="small" 
        className={classes.button} onClick={()=>createURL()} startIcon={<SaveIcon />}>Save</Button>
        </div>
        <div style={{ height: 300, width: '89%',marginLeft:20 }}>
      {isDataLoading?<CircularProgress disableShrink /> :<DataGrid loading={isDataLoading} rows={getRowData()} columns={columns} pageSize={5} />}
    </div>
    {status.severity!==''?<Alert style={{width:'15%',marginLeft:'80%'}} onClose={() => setStatus({severity:'',message:''})} severity={status.severity as Color}>{status.message}</Alert>:undefined}
    </div>
    )
}

