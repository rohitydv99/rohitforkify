const express= require('express');
const app= express();
const path=require('path');
app.use(express.static(path.join(__dirname,"../build")));
const server= require('http').createServer(app);
let bodyParser=require('body-parser');
let crypto = require('crypto-js');
let mongoClient= require('mongodb').MongoClient;
//  const socketIo= require('socket.io');
// var io= socketIo(server); 
//let users = ['rohit']
//let passs = ['12345']
const myKey = 'forkify';
app.get("/",(req,res,next)=>{
  res.sendFile(path.join(__dirname,"../build","index.html"));
})




//mongodb connectivity
var mongoUrl2="mongodb://localhost:27017/"

var mongoUrl = "mongodb+srv://rohit2:password2@cluster0-7jtcf.mongodb.net/test?retryWrites=true&w=majority"


// let recipe={
//   'Jalapeno Popper Grilled Cheese Sandwich':{
//       'ingredients':`
//       4 oz. cream cheese, softened
//   1 jalapeño, finely chopped (seeded if desired)
//   1 tsp. garlic powder
//   kosher salt
//   finely ground black pepper
//   4 slices french bread
//   2 c. shredded Cheddar
//   4 slices cooked bacon, halved`,
//   'preparation':`
//   Preheat oven to 375 degrees.
//   Stuff each jalapeno half with approximately 1 ounce of cream cheese. Bake stuffed jalapenos on cookie sheet for 25-30 minutes. ...
//   Place 1 slice each cheddar cheese on 2 bread slices. Place 1 slice each Monterey Jack on 2 bread slices. ...
//   Top each sandwich with several pats of butter.`
//   },
//   'Perfect Iced Coffee':{
//       'ingredients':`1 pound Ground Coffee (good, Rich Roast)
//       8 quarts Cold Water
//       Half-and-half (healthy Splash Per Serving)
//       Sweetened Condensed Milk (2-3 Tablespoons Per Serving)
//       Note: Can Use Skim Milk, 2%% Milk, Whole Milk, Sugar, Artificial Sweeteners, Syrups...adapt To Your Liking!`
//       ,
//       'preparation':`In a large container, mix ground coffee with water. Cover and allow to sit at room temperature twelve hours or overnight. 

//       Line a fine mesh strainer with cheesecloth and set over a pitcher or other container. Pour coffee/water mixture through the strainer, allowing all liquid to run through. Discard grounds. 
      
//       Place coffee liquid in the fridge and allow to cool. Use as needed. 
      
//       To make iced coffee, pack a glass full of ice cubes. Fill glass 2/3 full with coffee liquid. Add healthy splash of half-and-half. Add 2-3 tablespoons sweetened condensed milk (can use plain sugar instead) and stir to combine. Taste and adjust half-and-half and/or sweetened condensed milk as needed.`
//     },
//     'Crash Hot Potatoes':{
//         'ingredients':`
//         1. 12 whole New Potatoes (or Other Small Round Potatoes)
//         2. 3 Tablespoons Olive Oil.
//         3. Kosher Salt To Taste.
//         4. Black Pepper To Taste.
//         5. Rosemary (or Other Herbs Of Choice) To Taste.
//         6. Parmesan, Finely Grated.`,
//         'preparation':`
//         1. In a medium saucepan over medium heat, boil the potatoes in lightly salted water until fork-tender, about 12 minutes.
//         2. Preheat the oven to 475 degrees F.
//         3. Place the potatoes on a baking sheet. Using a potato masher, gently press down to mash each one. The tops of the potatoes should be really textured.`
//     },
//     'Stovetop Avocado Mac and Cheese':{
//         'ingredients':`
//         10 ounces dry elbow macaroni.
//         2 cloves garlic minced.
//         2 avocados peeled and pitted.
//         2 tablespoons fresh lime juice.
//         1/3 cup chopped fresh cilantro.
//         Salt and pepper to taste.
//         2 tablespoons butter.
//         2 tablespoons all-purpose flour.`,
//         'preparation':`
//         1.Place avocados in a medium bowl and add lemon juice to prevent browning. Mash until smooth.
//         2.In a large pot or saucepan, melt butter. Sprinkle in flour and cook until slightly golden, 2 to 3 minutes. Pour in milk and whisk until combined. ...
//         3.Turn off heat and add mashed avocado and cheeses to pot. Whisk until smooth.`
//     },
//     'Buffalo Chicken Grilled Cheese Sandwich':{
//         'ingredients':`
//         2 cups shredded chicken (rotisserie chicken works well)
//         1/3 cup hot sauce (I recommend Frank's Red Hot)
//         6 oz. light cream cheese.
//         1/3 cup crumbled blue cheese.
//         1/4 cup chopped celery.
//         1 1/2 Tbsp unsalted butter.
//         4 slices good crusty bread.
//         6 slices sharp cheddar cheese.`,
//         'preparation':`
//         In a bowl, combine shredded chicken with buffalo sauce.
//         Spread butter on one side of each slice of bread.
//         On unbuttered side of four slices, place 1/4 of the chicken.
//         Top chicken with 2 slices of cheese, then remaining slices of bread, buttered side up.
//         Heat a large skillet over medium heat.`
//     },
//     'Cinnamon Rolls':{
//         'ingredients':`
//           1 cup warm milk.
//           2 1/4 teaspoons 1 packet yeast.
//           1/2 cup granulated sugar.
//           1/2 cup melted butter.
//           2 teaspoons Kosher salt.
//           2 large eggs.
//           4 1/2 cups all-purpose flour + a little for handling.`,
//           'preparation':`
//           Step 1: Mix the homemade cinnamon roll dough. ...
//           Step 2: Knead the homemade cinnamon roll dough. ...
//           Step 3: Let the Best Cinnamon Roll Dough Rise for the first time. ...
//           Step 4: Make the Cinnamon Sugar Filling. ...
//           Step 5: Form the best cinnamon rolls dough into a rectangle.`
//     },
//     'Best Pizza Dough Ever':{
//         'ingredients':`
//           4 1/2 cups (20.25 ounces) unbleached high-gluten, bread, or all-purpose flour, chilled.
//           1 3/4 (.44 ounce) teaspoons salt.
//           1 teaspoon (.11 ounce) instant yeast.
//           1/4 cup (2 ounces) olive oil (optional)
//           1 3/4 cups (14 ounces) water, ice cold (40°F)`,
//           'preparation':`
//           Start by combining warm water with your yeast and some sugar. ...
//           Combine the salt and the flour, and start adding the flour to the mixer, 1/2 cup at a time.
//           Once you have added the flour, the dough will still look pretty wet and sticky.`
//     },
//     'Magic Sauce':{
//         'ingredients':`
//          Soy Sauce (Water, Wheat, Soybeans, Salt, Sodium Benzoate as a Preservative),
//          Sugar, Malt Extract, Water, Modified Food Starch, Mirin (Water, Dextrose,
//          Rice, Corn Syrup, Salt), Ginger.`,
//          'preparation':`
//           Purchase a seed tray. I use a 6x12 flat with 72 cells.
//           Fill the cells with a high quality seed starting soil.
//           Use a pointed pencil and make shallow holes about .5 inches deep. (I stop when I reach the yellow paint on the pencil.
//           Keep an accurate record of which cells have which variety of hot pepper.
//           Water the soil so that it's moist like a sponge.
//           Add a little heat to the bottom of the tray to speed up the germination process.`
//     },
//     'Spicy Dr Pepper Shredded Pork':{
//         'ingredients':`
//           1 whole Large Onion.
//           1 whole Pork Shoulder ("pork Butt") - 5 To 7 Pounds.
//           Salt And Freshly Ground Black Pepper.
//           1 can (11 Ounce) Chipotle Peppers In Adobo Sauce.
//           2 cans Dr. Pepper.
//           2 Tablespoons Brown Sugar.`,
//           'preparation':`
//           Preheat oven to 300F.
//           Place sliced onions in bottom of a 5.5-quart Dutch Oven.
//           Place roast on onions and sprinkle liberally with Kosher salt and pepper.
//           Pour chipotle peppers and the adobo sauce on top of the roast.
//           Pour both cans of Dr. Pepper over the roast.`
//     },
//     'Parmesan Roasted Potatoes':{
//         'ingredients':`
//           1.8kg floury potatoes
//           , cut in half, or quarters if large
//           5 tbsp olive oil
//           2 tsp plain flour
//           100g parmesan
//           (or vegetarian alternative), finely grated
//           handful parsley
//           , finely chopped
//           4 rosemary
//           sprigs, leaves finely chopped
//           pinch of grated nutmeg`,
//           'preparation':`
//             Place potatoes in a bowl and drizzle with 1 tablespoon vegetable oil;
//             toss until potatoes are lightly coated. Sprinkle potatoes with Parmesan
//             cheese mixture; toss to coat. Arrange potatoes, cut-side down, onto the 
//             prepared baking pan. Bake in the preheated oven for 15 to 20 minutes.`
//     },
//     'Bacon Wrapped Jalapeno Popper Stuffed Chicken':{
//         'ingredients':`
//           4 (6 ounce) chicken breasts, butterflied or pounded thin.
//           2 tablespoons roasted jalapenos (or fresh, or pickled), diced.
//           1/4 cup cream cheese.
//           1/4 cup monterey jack or cheddar cheese, shredded.
//           8 slices bacon.`,
//           'preparation':`
//             Lay the chicken flat, season both sides with salt and pepper,
//             place 1/4 of the mixture of the jalapeños, cream cheese, and 
//             cheddar on the chicken and roll them up. Wrap each chicken breast
//             up to 2 slices of bacon and place them in a baking dish. Bake in 
//             a pre-heated 400°F oven until cooked, about 25 to 35 minutes.`
//     },
//     'The Best Chocolate Cake':{
//         'ingredients':`
//           1 ½ cups flour (185 g)
//           1 cup dutch processed cocoa powder (120 g)
//           1 ½ teaspoons baking soda.
//           ½ teaspoon baking powder.
//           1 ½ cups stout (360 mL)
//           1 tablespoon vanilla extract.`,
//           'preparation':`
//           Pre-heat oven to 350 degrees.
//           Grease and flour three 6" X 1 1/2" round cake pans.
//           Mix together flour, cocoa powder, baking powder and baking soda. Set aside.
//           In a large bowl, beat butter, eggs and vanilla.
//           Gradually add sugar.
//           Beat on medium to high speed for about 3-4 minutes until well mixed
//           Alternately combine in flour mixture and milk to batter while beating.
//           Continue to beat until batter is smooth.`
//     },
//     'Hot Spinach and Artichoke Dip':{
//         'ingredients':`
//           1 (14-ounce) jar artichoke hearts, drained and chopped.
//           2 cups chopped fresh baby spinach or 1 (10-ounce) package frozen chopped spinach, thawed and drained.
//           1 (8-ounce) package cream cheese, softened.
//           ½ cup sour cream, mayonnaise, or whole milk Greek yogurt.
//           2 cups grated Parmesan cheese, divided.`,
//           'preparation':`
//             To make her spinach artichoke dip, I started with artichoke
//             hearts that I drained and then roughly chopped, along with
//             softened cream cheese. ... You'll hold back about 1/2 cup of 
//             the Parmesan cheese to top the Spinach Artichoke Dip for baking.
//             Then, just stir together all of the ingredients until they are well combined.`
//     },
//     'Smashed Chickpea & Avocado Salad Sandwich':{
//         'ingredients':`
//           1 (15 ounce) can chickpeas, rinsed and drained.
//           1 large ripe avocado.
//           1/4 cup fresh cilantro, chopped.
//           2 tablespoons chopped green onion.
//           Juice from 1 lime.
//           1/2 teaspoon kosher salt.
//           1/4 teaspoon freshly cracked black pepper.
//           Sandwich bread (use your favorite)`,
//           'preparation':`
//             In a medium bowl, using a fork or potato masher smash the chickpeas
//             and avocado together. Add in cilantro, green onion, and lime juice.
//             Season with salt and pepper, to taste. Spread salad on bread and top
//             with your favorite sandwich toppings.`
//     },
//     'Restaurant Style Salsa':{
//         'ingredients':`
//           1 pound plum (Roma) tomatoes.
//           1 half medium white onion.
//           2 serrano chiles.
//           8 sprigs of cilantro.
//           2 tablespoons cooking oil.
//           1 teaspoon salt.`,
//           'preparation':`
//              Combine the diced tomatoes, whole tomatoes, cilantro, onions, garlic, jalapeno,
//              cumin, salt, sugar and lime juice in a blender or food processor.
//              (This is a very large batch. ...
//               Pulse until you get the salsa to the consistency you'd like. ...
//               Refrigerate the salsa for at least an hour before serving.  `
//     },
//     'The Best Lasagna Ever':{
//         'ingredients':`
//           1 pound sweet Italian sausage.
//           1 pound lean ground beef.
//           1 large white onion minced.
//           5 cloves garlic crushed.
//           1 28 ounce can crushed tomatoes.
//           2 6 ounce can tomato paste.
//           1 15 oz can tomato sauce.
//           1/2 cup chicken broth.`,
//           'preparation':`
//             In a large pot over medium heat, add in ground sausage and ground beef.
//             Use a spoon to break up the meat into small pieces. Add in onion and garlic 
//             and cook until meat is well browned, stirring constantly. Stir in sugar, fresh basil,
//             fennel, oregano, 1/2 teaspoon salt, pepper, and 1/4 cup chopped parsley. Pour in crushed
//             tomatoes, tomato paste, tomato sauce, and chicken broth. Stir well and bring to a simmer.
//             Reduce heat to low and simmer 1-4 hours, stirring occasionally.`
//     },
//     'Mac and Cheese with Roasted Chicken, Goat Cheese, and Rosemary':{
//         'ingredients':`
//           1 pound rigatoni, cooked al dente.
//           4 cups heavy cream.
//           2 tablespoons rosemary, chopped.
//           1 clove garlic, minced.
//           2 chicken breasts, roasted and shredded.
//           8 ounces goat cheese.
//           Salt & pepper.`,
//           'preparation':`
//           Bring cream, rosemary, and garlic to a boil in a saucepan over medium heat.
//           Allow cream to reduce by about half, stirring frequently.
//           Add goat cheese and chicken to cream mixture.
//           Continue to stir until cheese is melted. Strain noodles and toss with sauce.
//           Season with salt & pepper.`
//     },
//     'Guinness Chocolate Cheesecake':{
//         'ingredients':`
//           1 cup graham cracker crumbs (gluten-free for gluten-free)
//           2 tablespoons cocoa powder
//           1 tablespoon sugar
//           2 tablespoons butter, melted
//           12 ounces dark chocolate, chopped
//           2 tablespoons heavy cream`,
//           'preparation':`
//           Mix the graham cracker crumbs, cocoa powder, sugar, and butter and press into the bottom of a 9 inch spring form pan.
//           Melt the chocolate in the cream in a double boiler.
//           Cream the cream cheese.
//           Mix in the sugar, chocolate, sour cream, eggs, vanilla, and Guinness.
//           Pour the mixture into the spring form pan.`
//     },
//     'Banana Bread':{
//         'ingredients':`
//           2 to 3 very ripe bananas, peeled (about 1 1/4 to 1 1/2 cups mashed)
//           1/3 cup melted butter, unsalted or salted.
//           1 teaspoon baking soda.
//           Pinch of salt.`,
//           'preparation':`
//           1.Preheat the oven to 350°F (175°C), and butter a 4x8-inch loaf pan.
//           2 In a mixing bowl, mash the ripe bananas with a fork until completely smooth. Stir the melted butter into the mashed bananas.
//           3 Mix in the baking soda and salt. Stir in the sugar, beaten egg, and vanilla extract. Mix in the flour.
//           4 Pour the batter into your prepared loaf pan. Bake for 50 minutes to 1 hour at 350°F (175°C), or until a tester inserted into the center comes out clean.`

//       },
//       'The Best Rolled Sugar Cookies':{
//           'ingredients':`
//           1 1⁄2 cup butter, softened
//           2 cup white sugar
//           4 egg
//           1 tsp vanilla extract
//           5 cup all-purpose flour
//           2 tsp baking powder
//           1 tsp salt`,
//           'preparation':`
//           In a large bowl, cream together butter and sugar until smooth. Beat in eggs and vanilla. Stir in the flour, baking powder, and salt. ...
//           Preheat oven to 400 degrees F (200 degrees C). Roll out dough on floured surface 1/4 to 1/2 inch thick. ...
//           Bake 6 to 8 minutes in preheated oven. Cool completely.`
//       },
//       'Guacamole Grilled Cheese Sandwich':{
//           'ingredients':`
//           2 ripe avocados
//           1/2 small onion minced
//           1 clove garlic minced
//           1 small jalapeño stems and seeds removed, minced
//           2 tablespoons cilantro leaves finely chopped`,
//           'preparation':`
//            Spread desired amount of guacamole on both slices of bread then top with cheese.
//            Butter outer slices of bread and grill on one side for about 2 minutes or until
//            golden and crispy. Flip the sandwich and grill until golden brown.`
//       },
//       'Two-Ingredient Banana Peanut Butter Ice Cream':{
//           'ingredients':`
//           4 large very ripe bananas
//           2 tablespoons peanut butter`,
//           'preparation':`
//            Peel bananas and slice into 1/2 inch discs. Arrange banana slices in a single layer on a
//            large plate or baking sheet.
//            Freeze for 1-2 hours.`
//       },
//       'Buffalo Chicken Chowder':{
//           'ingredients':`
//           1 (32 oz.) low-sodium chicken broth.
//           3 cups cooked chicken, shredded.
//           1 cup heavy cream.
//           1 ( 8 oz.) package cream cheese, softened.
//           3 ribs celery, finely chopped, divided.
//           2 potatoes, peeled and diced.
//           1/2 yellow onion, finely chopped.
//           1/3 cup buffalo-style hot sauce (we used Frank's Red Hot)`,
//           'preparation':`
//             Mix in the flour and let it cook for 2-3 minutes. Add the chicken broth,
//             chicken, hot sauce and potatoes, bring to a boil, reduce the heat and simmer
//             until the potatoes are tender, about 10-15 minutes. Season with salt and pepper,
//              mix in the cream and blue cheese and remove from heat when the cheese has melted.`
//       },
//       'Best Brownies':{
//           'ingredients':`
//           1/2 cup butter.
//           1 cup white sugar.
//           2 eggs.
//           1 teaspoon vanilla extract.
//           1/3 cup unsweetened cocoa powder.
//           1/2 cup all-purpose flour.
//           1/4 teaspoon salt.`,
//           'preparation':`
//            Preheat oven to 350 degrees F (175 degrees C). Grease and flour an 8-inch square pan.
//            In a large saucepan, melt 1/2 cup butter. Remove from heat, and stir in sugar, eggs, and
//            1 teaspoon vanilla. Beat in 1/3 cup cocoa, 1/2 cup flour, salt, and baking powder.
//             Spread batter into prepared pan.`
//       },
//       'Slow Cooker Chicken Tortilla Soup':{
//           'ingredients':`
//           1/2 cup white onion diced
//           1/2 cup red bell pepper diced
//           1 cup frozen corn
//           1 15 ounce can black beans rinsed and drained
//           1 1/4 lbs boneless skinless chicken breasts`,
//           'preparation':`
//           Place the onion, bell pepper, corn, black beans, chicken, chilies, tomato sauce,
//            tomatoes, chili powder, cumin, garlic powder, chicken broth and salt into a slow cooker.
//            Stir to combine.
//           Cover and cook on LOW for 6-8 hours or HIGH for 3-4 hours.`
//       },
//       'Banana Crumb Muffins':{
//           'ingredients':`
//           1 1/2 cups all-purpose flour.
//           1 teaspoon baking soda.
//           1 teaspoon baking powder.
//           1/2 teaspoon salt.
//           3 bananas, mashed (about 12 oz. bananas)
//           3/4 cup white sugar.`,
//           'preparation':`
//           Preheat oven to 375 degrees F (190 degrees C). Lightly grease 10 muffin cups, or line with muffin papers.
//           In a large bowl, mix together 1 1/2 cups flour, baking soda, baking powder and salt. In another bowl, beat together bananas,
//            sugar, egg and melted butter. Stir the banana mixture into the flour mixture just until moistened. Spoon batter into prepared muffin cups.`
//       },
//       'Banana Banana Bread':{
//           'ingredients':`
//           2 to 3 very ripe bananas, peeled (about 1 1/4 to 1 1/2 cups mashed)
//           1/3 cup melted butter, unsalted or salted.
//           1 teaspoon baking soda.
//           Pinch of salt.`,
//           'preparation':`
//           1 Preheat the oven to 350°F (175°C), and butter a 4x8-inch loaf pan.
//           2 In a mixing bowl, mash the ripe bananas with a fork until completely smooth. 
//           Stir the melted butter into the mashed bananas.
//           3 Mix in the baking soda and salt. Stir in the sugar, beaten egg, and vanilla extract. Mix in the flour.`
//       },
//       'Nikki':{
//           'ingredients':`
//            2-1/2 cups uncooked penne pasta; 2 tablespoons butter, melted;
//            1 cup grated Parmesan cheese; 1-1/2 pounds ground sirloin; 1 medium onion, ...`,
//            'preparation':`
//            Cook pasta according to package directions; drain. Toss with butter; add grated Parmesan cheese.
//             Transfer to a greased 13x9-in. baking dish.
//           Preheat oven to 350°. In a large skillet, cook beef and onion over medium heat 8-10 minutes or 
//           until beef is no longer pink, breaking beef into crumbles; drain. Add garlic; cook 2 minutes longer.
//            Stir in tomato sauce, salt and cinnamon; heat through. Spoon over pasta. Sprinkle with 1/2 cup
//             shredded Parmesan cheese.`
//       },
//       'Zesty Slow Cooker Chicken Barbeque':{
//           'ingredients':`
//           4 to 6 boneless skinless chicken breasts.
//           1 (12-oz) bottle BBQ sauce.
//           3/4 cup Italian dressing.
//           1/4 cup brown sugar.
//           2 Tbsp Worcestershire sauce.`,
//           'preparation':`
//           Place all ingredients in a 6-qt slow cooker. Cover and cook on LOW for 6 to 8 hours.
//            Shred chicken with two forks and stir around in sauce.
//           Serve on top of buns, nachos, a baked potato or a salad.`
//       }
          
// }


//mongodb functions
//insertOne
//findOne
//updateOne
//deleteOne


app.use(bodyParser.urlencoded({extended:true,limit:'50mb'})) //server routes will not accept url more than 50mb size
app.use(bodyParser.json({limit:'50mb',extended:true}))


    // mongoClient.connect(mongoUrl,(err,db)=>{
    //   if(err) throw err;
    //   var dbo=db.db("forkify")
    //   dbo.collection("content").insertOne({'recipe':recipe},(err,res)=>{
    //     if(err) throw err;
    //   })
    // })





app.post('/login',(req,res)=>{
    mongoClient.connect(mongoUrl,(err,db)=>{
      if(err) throw err;
      var dbo=db.db("forkify")
      dbo.collection("users").findOne({Name:req.body.userName,Password:req.body.userPass},(err,r)=>{
        if(err) throw err;
        //console.log(r.Name);
        if(r==null){
          res.send({'token':'invalid'})
        }
        else{
          var token=new Date().getDate() + myKey;
           var token2=crypto.SHA256(token).toString();
          res.send({'token':token2})   
        }



        // if(req.body.userName==r.Name && req.body.userPass==r.Password){
        //   var token=new Date().getDate() + myKey;
        //   var token2=crypto.SHA256(token).toString();
        //   res.send({'token':token2})        
        // }
        // else{
        //   res.send({'token':'invalid'})
        // }

      })
      
    })
    
    
  



  //  if(req.body.userName==users[0]&& req.body.userPass==passs[0]){
  //   var token = new Date().getDate() + myKey;
  //   var token2 = crypto.SHA256(token).toString();
  //   res.send({'token':token2});
  // }
  // else{
  //   res.send({'token':'invalid'})
  // }
})



app.post('/signup',(req,res)=>{
  
  mongoClient.connect(mongoUrl,(err,db)=>{
    if(err) throw err
    var dbo =db.db("forkify");
    dbo.collection('users').findOne({'Name':req.body.name},(err,r)=>{
      if(err) throw err;
      else if(r==null){
        dbo.collection("users").insertOne({'Name':req.body.name,Email:req.body.email,Password:req.body.password,PhoneNo:req.body.phone},(err,result)=>{
          if(err) throw err;
          res.send({'status':'ok'})
        })
      }
      else /*if(r.Name==req.body.name)*/{
        res.send({'status':'notOk'})
      }
      // else{
      //   dbo.collection("users").insertOne({'Name':req.body.name,Email:req.body.email,Password:req.body.password,PhoneNo:req.body.phone},(err,result)=>{
      //     if(err) throw err;
      //     res.send({'status':'ok'})
      //   })
      // }
    })

    // dbo.collection("users").insertOne({Name:req.body.name,Email:req.body.email,Password:req.body.password,PhoneNo:req.body.phone},(err,result)=>{
    //   if(err) throw err;
    //   res.send({'status':'ok'})
    // })

  })
})


app.post('/verifyToken',(req,res)=>{
  var todaysToken= crypto.SHA256(new Date().getDate()+myKey);
  if(req.body.token==todaysToken){
    res.send({'status':'valid'})
  }
  else{
    res.send({'status':'invalid'})
  }
})

app.post('/sendData',(req,res)=>{
    console.log("running");
   mongoClient.connect(mongoUrl,(err,db)=>{
    if(err) throw err;
    var dbo=db.db("forkify");
    dbo.collection("content").findOne({},(err,result)=>{
      //console.log(result);
      res.send(result.recipe[req.body.dishName])
      
    })
  })
    //res.send(recipe[req.body.dishName])
})

app.use((req,res)=>{
  res.send("404,not found");
})



// io.on('connection',(socket)=>{
// console.log("new user connected");

// socket.emit('test',"hello");

// socket.on('abc',(data)=>{
//   console.log(data);
// })

// })
// //broadcasting
// Io.emit('newCustomer')

server.listen(process.env.PORT||4000,(req,res)=>{
  console.log("Server is Listening ");
})
