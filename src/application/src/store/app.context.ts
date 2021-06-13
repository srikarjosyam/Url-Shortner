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
 
    return {
      urlData,
      isDataLoading,
      fetchUrlData,
      createUrlData
    }
  }