import Model from '../models/model';

export const fetchUrls = async(req, res) => {
    try{
    const urlData = new Model('UrlTrackingData');
    
    const data = await urlData.select('short_url, long_url,click_count');

    res.status(200).json({ messages: data.rows });
  } catch (err) {

    res.status(200).json({ messages: err.stack });
  }
};

export const UrlAddition = async(req, res) => {
    try{
    const urlData = new Model('UrlTrackingData');
    let data = req.body;
    const result = await urlData.insert('short_url, long_url,click_count',data);

    res.status(200).json({ messages: result });
  } catch (err) {

    res.status(200).json({ messages: err.stack });
  }
};

