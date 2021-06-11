import Model from '../models/model';

export const RedirectUrl = async(req, res) => {
    try{
    const urlData = new Model('UrlTrackingData');
    let short_url = req._parsedOriginalUrl.pathname.split('/st')[1]
    const data = await urlData.select('short_url, long_url,click_count',"WHERE short_url='"+short_url+"'");
    let url
    if(data.rowCount > 0){
        url = data.rows[0].long_url
        res.status(301).redirect(url)  
    }
    res.status(200).json({messages:'redirection failed'})
  } catch (err) {

    res.status(200).json({ messages: err.stack });
  }
};
