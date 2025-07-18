const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Listing = require("./models/listing.js")
const path = require("path")
const methodOverride=require("method-override")
const ejsMate=require("ejs-mate")
const wrapAsync=require("./utils/wrapAsync.js")
const ExpressError=require("./utils/expressError.js")

const MONGO_URL="mongodb+srv://omgunturkar:om%40gunturkar1092@om.8klyy.mongodb.net/wanderlust";

main()
.then(()=>{
    console.log("Connected to db");
})
.catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"/public")))

app.get("/",(req,res)=>{
    res.send("Hii, I am root")
})
//Index Route
app.get("/listings",wrapAsync(async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index",{allListings})
}))

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

//Show Route
app.get("/listings/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing})
}))

//Create Route
app.post("/listings", wrapAsync(async (req,res,next)=>{
    
    const newlisting = new Listing(req.body.listing);
    await newlisting.save()
    res.redirect("/listings");
    

}))

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
}))

//Update Route
app.put("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
}))

//DELETE Route
app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let deletedListing=await Listing.findByIdAndDelete(id)
    console.log(deletedListing);
    res.redirect(`/listings`)
}))

app.all("",(req,res,next)=>{
    next(new ExpressError(404,"Page not Found"))
})


app.use((err,req,res,next)=>{

    let {statusCode=500,message="Something Went wrong"}=err;
    res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
})

 // without this then we would have got Validation Error
app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
    
})