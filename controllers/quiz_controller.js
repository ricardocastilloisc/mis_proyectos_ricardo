var models = require('../models/models.js');

//3
exports.load = function(req,res,next,quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if(quiz) {
				req.quiz = quiz;
				next();
			}else { next(new Error('No existe quizId=' + quizId)); }
		}
	).catch(function(error) { next(error); });
};

//GET /quizes/:id
exports.show = function(req,res) {
	res.render('quizes/show', { quiz: req.quiz });
};

//GET /quizes/:id/answer
exports.answer = function(req,res) {
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado});
};

//GET /quizes
exports.index = function(req,res) {
	//console.log(req.query.search);
	if(req.query.search){
		var searchString = '%' + req.query.search.replace(' ', '%') + '%';
		models.Quiz.findAll({ where: ["pregunta like ?", searchString] }).then(function(quizes) {
			res.render('quizes/index', {quizes: quizes});
		}).catch(function(error) { next(error);})
	}else{
		models.Quiz.findAll().then(function(quizes) {
			res.render('quizes/index', { quizes: quizes});
		}).catch(function(error) { next(error);})
	}
};

//GET /quizes/new
exports.new = function(req,res) {
	var quiz = models.Quiz.build( //crea un objeto Quiz
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);
	
	res.render('quizes/new', {quiz: quiz});
};

//POST /quizes/create
exports.create = function(req,res) {
	var quiz = models.Quiz.build( req.body.quiz );
	
	//Guarda en BD los campos pregunta y respuesta de quiz
	quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
		res.redirect('/quizes');
	}) //Redireccion HTTP (URL nativo) lista de preguntas
};



/**
//GET /quizes/question
exports.question = function(req,res) {
	models.Quiz.findAll().success(function(quiz) {
		res.render('quizes/question', {pregunta: quiz[0].pregunta});
	})
};
*/
/*
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
*/
//GET /quizes/autor
exports.autor = function(req, res)
{
	res.render('quizes/autor',{autor: 'Ricardo Orlando Castillo Olivera'});
};
