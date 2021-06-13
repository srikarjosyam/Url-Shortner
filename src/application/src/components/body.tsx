import { useContext, useEffect } from "react";
import {UrlDataContext } from "../store/app.context.interface";
import { DataGrid} from '@material-ui/data-grid';
import { Button, CircularProgress, makeStyles,TextField} from "@material-ui/core";
import {URL} from '../store/app.context.interface';
import SaveIcon from '@material-ui/icons/Save';
import { useState } from "react";
import { generateString, isValidHttpUrl } from "../utils/stringUtils";
import Alert, { Color } from '@material-ui/lab/Alert';
import { FileCopy } from "@material-ui/icons";

const useStyles = makeStyles((theme:any) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


export const Body =()=>{
    
    const classes = useStyles();
    const {urlData,fetchUrlData,isDataLoading,createUrlData} = useContext(UrlDataContext)
    const [url,setURL] = useState('Add URL')
    const [link,setLink] = useState({short_url:''})
    const [status, setStatus] = useState({severity:'',message:''});

  useEffect(() => {
    setTimeout(() => {
      setStatus({severity:'',message:''});
    },5000);
  }, [status]);

    const columns = [
        { field: 'short_url', headerName: 'Url',width: 300 },
        { field: 'long_url', headerName: 'CompleteUrl', width: 600 },
        { field: 'click_count', headerName: 'No.of Views', type: 'number',width: 200 }
      ];

    useEffect(()=>{
        fetchUrlData();
    },[fetchUrlData]);
    
    const getRowData =()=>{
        let result = urlData.map((data,index)=>{
              let value = window.location.origin +"/st"+ data.short_url
              return {id:index,short_url:value,long_url:data.long_url,click_count:data.click_count}  
        })
        return result
    }

    const createURL=()=>{
      let currenturl = window.location.origin;
      let validUrl = isValidHttpUrl(url) && !url.includes(currenturl);
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
       setLink({short_url:`${currenturl}/st${short_url}`});
       setURL(`${currenturl}/st${short_url}`);
       setStatus({severity:"success",message:`The Url is successfully created - ${data.short_url}`})
      }
      else{
        setLink({short_url:''});
        setStatus({severity:"error",message:`The Url entered already has a shortened version - ${existingUrl.short_url}`})
      }
    }
    else{
      if(url.includes(currenturl)){
        setLink({short_url:''});
        setStatus({severity:"error",message:`The Url entered is urlShortner Url`})
      }
      else{
        setLink({short_url:''});
        setStatus({severity:"error",message:`The Url entered is invalid`})
      }
    }
    }

    const setURLValue =(value:any)=>{
      setLink({short_url:''});
      setURL(value.target.value);
    }

    const CopyUrl =()=>{
      navigator.clipboard.writeText(link.short_url)
      setStatus({severity:"success",message:`The Url is successfully Copied`})
    }

    const ButtonComponent =()=>{
      if(link.short_url ===''){
      return <Button style={{top:'-9px',height:55,width:135}} variant="contained" color="primary" size="large" 
        className={classes.button} onClick={()=>createURL()} startIcon={<SaveIcon />}>Save</Button>
      }
      else{
        return  <Button style={{top:'-9px',height:55,width:135}} variant="contained" color="primary" size="large" 
        className={classes.button} onClick={()=>CopyUrl()} startIcon={<FileCopy />}>copy</Button> 
      }
    }
    return(
    <div>
        <div style={{margin:21}}>
        <TextField style={{marginRight:10,width:'80%',height:30}} id="outlined-basic" label="Add URL" value={url} variant="outlined" onChange={(e)=>setURLValue(e)}/>
        {ButtonComponent()}
        </div>
        <div style={{ height: 300, width: '89%',marginLeft:20 }}>
      {isDataLoading?<CircularProgress disableShrink /> :<DataGrid loading={isDataLoading} rows={getRowData()} columns={columns} pageSize={5} />}
    </div>
    {status.severity!==''?<Alert style={{width:'15%',marginLeft:'80%'}} onClose={() => setStatus({severity:'',message:''})} severity={status.severity as Color}>{status.message}</Alert>:undefined}
    </div>
    )
}

