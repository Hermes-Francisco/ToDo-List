class Pages{
    Index(req, res){
        return res.status(200).sendFile(__dirname + "/view/index.html");
    }
    Components(req, res){
        const { file } = req.params;
        return res.status(200).sendFile(__dirname + "/view/"+file);
    }
}

module.exports = new Pages();