import {createContext } from "react";
export interface URL{
    short_url:string,
    long_url:string,
    click_count:number
}
export interface IAppContext{
    urlData: URL[],
    isDataLoading:boolean,
    fetchUrlData:Function,
    createUrlData:Function,
    updateUrlData:Function
}
export const defaultData:IAppContext = {
    urlData:[
        {short_url:'hello',click_count:0,long_url:'hellooooooo'}
    ],
    isDataLoading:false,
    fetchUrlData:()=> null,
    createUrlData:()=> null,
    updateUrlData:()=> null
  };
  
export const UrlDataContext = createContext<IAppContext>(defaultData);
