import express from "express"
import { scrape } from "./utils/scrape.js"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cors())


app.post("/getProducts", async (req,res) => {
    try{
        const {url} = req.body;
    const data = await scrape(url)
    return res.json(data)
    } catch (err){
        return err
    }
    
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})