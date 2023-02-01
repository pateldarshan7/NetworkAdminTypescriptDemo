/*
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Commands for any project of typescript
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
https://www.youtube.com/watch?v=phaARbflXx8
installation
        
    -npm i -g typescript

        1.npm init

        2.Init TypeScript
            tsc --init
            npm install typescript --save

            npm i ts-node
            npm i ts-node-dev

            Create "src" folder to the root of your project
            and then create a new file app.ts after that add below code to the tsconfig file.
            //add this code to yout tsconfig file:

                "include": ["src/.ts"],
                "exclude": ["node_modules"]

        3.run typescript
            -tsc filename.ts

        4.Init Express
            npm i @types/express
            
        5.Init Nodemailer for mail
            npm i @types/nodemailer

        6.checking like nodemon
            tsc --watch

        7.Init lodash & pino-pretty & jsonwebtoken
            npm i @types/lodash
            npm i pino-pretty
            npm i @types/jsonwebtoken -D

            npm i @types/cookie-parser
             npm i cookie-parser

         8.Byscrypt
         npm install bcrypt
         npm i @types/bcrypt  

         9.jsonwebtoken
         npm install jsonwebtoken
         npm install --save-dev @types/jsonwebtoken
         npm i passport
         npm install --save @types/passport

         npm install passport-jwt
         npm install --save @types/passport-jwt
        
    

// ----------------------------------------------------------------
// ----------------------------------------------------------------
    TypeScript Default Configuration
// ----------------------------------------------------------------
    tsconfig(configuration setttings) 
        Enable the rootDir and  add give it folder name src like this:
        
        -"rootDir": "./src",
        The rootDir is for saving the typescript file
        
        Enable the outDir and  add give it folder name dist like this:
            -"outDir": "./dist",
            The outDir is for saving the javascript file
// ---------------------------------------------------------------
// ----------------------------------------------------------------
    Debuging TypeScript Application
// ----------------------------------------------------------------
    Enable the sourceMap and  add give it folder name src like this:
    
        "sourceMap": true,
// ----------------------------------------------------------------
















https://www.geeksforgeeks.org/how-to-get-data-from-2-different-collections-of-mongodb-using-node-js/
*/
