//GET /quizes/question
exports.question = function(req, res)
{
	res.render('quizes/question',{pregunta: 'Capital de Italia'});
};

//GET /quizes/question
exports.answer = function(req, res)
{
	if(req.query.respuesta == 'Roma')
	{
		res.render('quizes/answer',{respuesta: 'Correcto'});
	}else
	{
		res.render('quizes/answer',{respuesta: 'Incorrecto'});
	}
	
};

//GET /quizes/autor
exports.autor = function(req, res)
{
	res.render('quizes/autor',{autor: 'Ricardo Orlando Castillo Olivera'});
};