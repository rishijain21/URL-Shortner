const express = require("express")
const {connectToMongoDB} = require('./connect')
const urlRoute = require("./routes/url");
const path = require('path');


const staticRouter = require('./routes/staticRouter')







const app = express();
const URL = require("./models/url")
const PORT = 5000;



app.set('view engine', 'ejs');
//setting up the path
app.set('views',path.resolve("./views"));

connectToMongoDB('mongodb+srv://rishi987654321jain:GJpCFnTBAIXHF44O@cluster0.dxchryp.mongodb.net/?retryWrites=true&w=majority')
.then (() => console.log('mongoDB connected'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// app.get("/test",async(req,res)=>{
//   const allURLs = await URL.find({});
//   return res.render('home' , {
//     //we can pass variables
//     urls : allURLs,
//   });
// })

//agar koi chiz '/' se suru hoti hai toh static Router p jana hai
app.use("/",staticRouter);
app.use("/url",urlRoute);

app.get('/:shortId', async (req,res)=>{
       const shortId = req.params.shortId;
      const entry =  await URL.findOneAndUpdate({
        shortId
       },
       {
       $push: {
        visitHistory:{timestamp: Date.now()},
       }
       });
       if (entry && entry.redirectURL) {
        // Redirect to the original URL if entry exists and has a redirectURL property
        res.redirect(entry.redirectURL);
    } else {
        // If entry is null or entry.redirectURL is undefined, handle accordingly
        res.status(404).send("URL not found");
    }

})


app.listen(PORT,()=>console.log(`Server started at port ${PORT}`))