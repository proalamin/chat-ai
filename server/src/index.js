const { response } = require('express');
const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;

// api 
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY ='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';
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// openai.listEngines().then((response) =>{
//     console.log(response);
// });



app.get('/ping', (req, res) => {
    res.json({
        message:"pong",
    })
})


app.post('/chat', (req, res) => {
    const question = req.body.question;

    openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 4000,
        temperature: 0,
    }).then((response) => {
        // console.log("test", {response})
        return response?.data?.choices?.[0]?.text;
    })
    .then((answer)=>{
        // console.log(answer)''
       const array= answer?.split("\n").filter((value)=> value).map((value)=>value.trim());
       return array;
    })
    .then((answer)=>{
        res.json({
            answer: answer,
            prompt: question,
        });
        // console.log({question})
        // console.log({answer})
    });
    
})



app.listen(port, () => {
    console.log(`server is running is ${port}`)
})