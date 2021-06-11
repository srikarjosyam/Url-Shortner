import { useCallback, useState } from "react";
import { IAppContext,URL} from "./app.context.interface";

export function useUrlContextValue(): IAppContext {
    const [urlData, setUrlData] = useState<URL[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(false);
   
    const fetchUrlData = useCallback(() => {
      setIsDataLoading(true);
      fetch('/v1/url')
        .then(response => response.json())
        .then((value) => {          
          setUrlData(value.messages);
        })
        .finally(() => {
          setIsDataLoading(false);
        })
    }, [setUrlData]);
   
    const createUrlData = useCallback((data: URL) => {
      setIsDataLoading(true);
      fetch(`/v1/url/add`, {
        method: 'POST',
        body:JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(() => {
          urlData.push(data);
          setUrlData(urlData);
        })
        .finally(() => {
          setIsDataLoading(false);
        })
    }, [setUrlData, urlData]);


    const updateUrlData = useCallback((data: URL) => {
      setIsDataLoading(true);
      fetch(`/v1/url/update`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(() => {
          const result = urlData.map(value =>{
            if(value.short_url === data.short_url){
                value.click_count = data.click_count;
                return value;
            }
            else{
                return value
                }
          });
          setUrlData(result);
        })
        .finally(() => {
          setIsDataLoading(false);
        })
    }, [setUrlData, urlData]);
   
    return {
      urlData,
      isDataLoading,
      fetchUrlData,
      createUrlData,
      updateUrlData
    }
  }