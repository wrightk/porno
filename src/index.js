var superagent = require('superagent')

var Porno = module.exports = {}; 

  Porno.apiRequest = (path, options = {}) => {
   let params = "";
   for(let opt in options){
  params += `&${opt}=${options[opt]}`
     };
    return new Promise((resolve, reject) => {
      superagent.get(`http://api.porn.com/${path}${params}`)
      .end((err, res) => {
        if (err) return reject(err);
        return resolve(res.body);
      });
    })
 };
 
 Porno.videoSearch = (options = {}) => {
  return Porno.apiRequest('videos/find.json', options);
};

 Porno.videoIsActive =  (id = 0) => {
  return Porno.apiRequest('videos/is-active.json', {id: id});
};

Porno.fetchDeletedVideos = (options = {}) => {
  return Porno.apiRequest('videos/deleted.json', options);
};

Porno.actorSearch = (options = {}) => {
  return Porno.apiRequest('actors/find.json', options);
};

Porno.channelSearch = (options = {}) => {
  return Porno.apiRequest('channels/find.json', options);
};

Porno.dvdSearch = (options = {}) => {
  return Porno.apiRequest('dvds/find.json', options);
};

Porno.fetchCategories =  () => {
  return Porno.apiRequest('categories/find.json');
};
