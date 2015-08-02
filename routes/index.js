var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});


// Autoload de comandos con :quizId
//Solo se ejecuta en caso de que en los parametros de la ruta exista el parametro 'quizId'
router.param('quizId',quizController.load);

router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);

router.get('/quizes/autor', quizController.autor);




module.exports = router;
