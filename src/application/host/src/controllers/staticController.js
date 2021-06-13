import Model from '../models/model';

export const RedirectUrl = async(req, res) => {
    try{
    const urlData = new Model('UrlTrackingData');
    let short_url = req._parsedOriginalUrl.pathname.split('/st')[1]
    const data = await urlData.select('short_url, long_url,click_count',"WHERE short_url='"+short_url+"'");
    let url
    if(data.rowCount > 0){
        url = data.rows[0].long_url
        let updatedUrlData  = {short_url:data.rows[0].short_url,long_url:url,click_count:data.rows[0].click_count+1}
        await UrlUpdate(updatedUrlData);
        res.status(301).redirect(url)  
    }
    res.status(200).json({messages:'redirection failed'})
  } catch (err) {

    res.status(200).json({ messages: err.stack });
  }
};

export const UrlUpdate = async(data) => {
  try{
  const urlData = new Model('UrlTrackingData');
  const fields = {
    click_count: data.click_count
  };
  const conditions = { short_url: data.short_url };
  const result = await urlData.update(data,conditions);
  return result;
} catch (err) {
  throw err;
}
};
