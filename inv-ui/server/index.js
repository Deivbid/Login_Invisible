let blockspring = require('blockspring');
//import Blockspring from 'blockspring';

blockspring.runParsed("personal-assistant-jeannie", {
  message: "What's the weather like in Antarctica today?"
}, function(res) { console.log(res.params["answer"]); })